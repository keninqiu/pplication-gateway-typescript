/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as grpc from '@grpc/grpc-js';
import { ChaincodeEvent, CloseableAsyncIterable, connect, Contract, GatewayError, Network } from '@hyperledger/fabric-gateway';
import { TextDecoder } from 'util';
import { newGrpcConnection, newIdentity, newSigner } from './connect';
import * as dotevnv from "dotenv"

import Db from './utils/Db';
import KycService from './services/KycService';

dotevnv.config()
const channelName = 'dnbchannel';
const chaincodeName = 'kyc';

const utf8Decoder = new TextDecoder();


async function main(): Promise<void> {
    Db.startconnection(1);
    const client = await newGrpcConnection();
    const gateway = connect({
        client,
        identity: await newIdentity(),
        signer: await newSigner(),
        evaluateOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        endorseOptions: () => {
            return { deadline: Date.now() + 15000 }; // 15 seconds
        },
        submitOptions: () => {
            return { deadline: Date.now() + 5000 }; // 5 seconds
        },
        commitStatusOptions: () => {
            return { deadline: Date.now() + 60000 }; // 1 minute
        },
    });

    let events: CloseableAsyncIterable<ChaincodeEvent> | undefined;

    try {
        const network = gateway.getNetwork(channelName);
        // Listen for events emitted by subsequent transactions
        events = await startEventListening(network);

        //const firstBlockNumber = await createAsset(contract);

        // Replay events from the block containing the first transaction
        await replayChaincodeEvents(network);
    } finally {
        events?.close();
        gateway.close();
        client.close();
    }
}

main().catch(error => {
    console.error('******** FAILED to run the application:', error);
    process.exitCode = 1;
});

async function startEventListening(network: Network): Promise<CloseableAsyncIterable<ChaincodeEvent>> {
    console.log('\n*** Start chaincode event listening');

    const events = await network.getChaincodeEvents(chaincodeName);

    void readEvents(events); // Don't await - run asynchronously
    return events;
}

async function readEvents(events: CloseableAsyncIterable<ChaincodeEvent>): Promise<void> {
    try {
        for await (const event of events) {
            const payload = parseJson(event.payload);
            console.log(`\n<-- Chaincode event received: ${event.eventName} -`, payload);
        }
    } catch (error: any) {
        // Ignore the read error when events.close() is called explicitly
        if (!(error instanceof GatewayError) || error.code !== grpc.status.CANCELLED.valueOf()) {
            throw error;
        }
    }
}

function parseJson(jsonBytes: Uint8Array): unknown {
    const json = utf8Decoder.decode(jsonBytes);
    return JSON.parse(json);
}

async function replayChaincodeEvents(network: Network): Promise<void> {
    console.log('\n*** Start chaincode event replay');
    
    const events = await network.getChaincodeEvents(chaincodeName, {
    });

    try {
        for await (const event of events) {
            const payload: any = parseJson(event.payload);
            const eventName = event.eventName;
            console.log('eventName=', eventName);
            console.log('payload=', payload);
            switch(eventName) {
                case 'KYCCreated':
                    console.log('payload.Name=', payload.Name);
                    await KycService.createKyc(payload);
                    break;
                case 'KYCStatusUpdated':
                    const ID = payload.ID;
                    const status = payload.status;
                    await KycService.updateKycStauts(ID, status);
                    break;      
            }
            console.log(`\n<-- Chaincode event replayed: ${event.eventName} -`, payload);
            
            
        }
    } finally {
        events.close();
    }
}
