/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as grpc from '@grpc/grpc-js';
import {  Identity,  Signer, signers } from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';
import { promises as fs } from 'fs';
import * as path from 'path';


function getHostName(org: string) {
    let name = 'paycool.dnb';
    if(org == 'aab') {
        name = 'aab.dnb';
    }
    return name;
}

function getPort(org: string) {
    let port = 7051;
    if(org == 'paycool') {
        port = 9051;
    }
    return port;
}

function getPeerEndpoint(org: string) {
    const peerEndpoint = 'peer1.' + getHostName(org) + ':' + getPort(org);
    return peerEndpoint;
}

function getCryptoPath(org: string) {
    // Path to crypto materials.
    const cryptoPath = path.resolve(__dirname, '..', '..', 'prod-network', 'organizations', 'peerOrganizations', getHostName(org));
    return cryptoPath;
}

function getKeyDirectoryPath(org: string) {
    // Path to user private key directory.
    const keyDirectoryPath = path.resolve(getCryptoPath(org), 'users', 'User1@' + getHostName(org), 'msp', 'keystore');
    return keyDirectoryPath;
}

function getMspId(org: string) {
    let mspId = 'OrgPAYCOOLMSP';
    if(org == 'aab') {
        mspId = 'OrgAABMSP';
    }
    return mspId;
}

function getTlsCertPath(org: string) {
    const tlsCertPath = path.resolve(getCryptoPath(org), 'peers', 'peer1.' + getHostName(org), 'tls', 'ca.crt');
    return tlsCertPath;
}

function getCertPath(org: string) {
    const certPath = path.resolve(getCryptoPath(org), 'users', 'User1@' + getHostName(org), 'msp', 'signcerts', 'cert.pem');
    return certPath;
}

export async function newGrpcConnection(org: string = 'paycool'): Promise<grpc.Client> {
    const tlsRootCert = await fs.readFile(getTlsCertPath(org));
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(getPeerEndpoint(org), tlsCredentials, {
        'grpc.ssl_target_name_override': 'peer1.' + getHostName(org),
    });
}

export async function newIdentity(org: string = 'paycool'): Promise<Identity> {
    const credentials = await fs.readFile(getCertPath(org));
    const mspId = getMspId(org);
    return { mspId, credentials };
}

export async function newSigner(org: string = 'paycool'): Promise<Signer> {
    const files = await fs.readdir(getKeyDirectoryPath(org));
    const keyPath = path.resolve(getKeyDirectoryPath(org), files[0]);
    const privateKeyPem = await fs.readFile(keyPath);
    console.log('privateKeyPem===', privateKeyPem);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    console.log('privateKey===', privateKey);
    const signer = signers.newPrivateKeySigner(privateKey);
    console.log('signer===', signer);
    return signer;
}
