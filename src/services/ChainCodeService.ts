
import { newGrpcConnection, newIdentity, newSigner } from '../connect';
import { ChaincodeEvent, CloseableAsyncIterable, connect, Contract, GatewayError, Network } from '@hyperledger/fabric-gateway';

const channelName = 'dnbchannel';
const chaincodeName = 'bond';

class ChainCodeService {
    static getChainCodeName() {
        return chaincodeName;
    }
    static async getNetwork(org: string = 'paycool') {
        const client = await newGrpcConnection(org);
        const identity = await newIdentity(org);
        const signer = await newSigner(org);
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
        const network = gateway.getNetwork(channelName);
        return network;
    }

}

export default ChainCodeService;