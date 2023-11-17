
import ChainCodeService from '../ChainCodeService';

class SaleContractService extends ChainCodeService {


    static async CreatePayment(data: any) {
        const network = await this.getNetwork();
        const contract = network.getContract(this.getChainCodeName());

        const jsonString = JSON.stringify(data);
        const payment = await contract.submitTransaction('CreatePayment', jsonString);

        return payment;
    }
}

export default SaleContractService;