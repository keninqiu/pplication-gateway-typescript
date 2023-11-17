
import { newGrpcConnection, newIdentity, newSigner } from '../connect';
import { ChaincodeEvent, CloseableAsyncIterable, connect, Contract, GatewayError, Network } from '@hyperledger/fabric-gateway';

const channelName = 'dnbchannel';
const chaincodeName = 'kyc';

class ChainCodeService {
    static getChainCodeName() {
        return chaincodeName;
    }
    static async getNetwork(org: string = 'paycool') {
        const client = await newGrpcConnection(org);
        console.log('client===', client);
        const identity = await newIdentity(org);
        console.log('identity===', identity);
        const signer = await newSigner(org);
        console.log('signer===', signer);
        const gateway = connect({
            client,
            identity,
            signer,
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
        console.log('gateway===', gateway);
        const network = gateway.getNetwork(channelName);
        console.log('network===', network);
        return network;
    }

}

export default ChainCodeService;