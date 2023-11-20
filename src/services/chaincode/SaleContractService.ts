
import ChainCodeService from '../ChainCodeService';

class SaleContractService extends ChainCodeService {


    static async CreatePayment(data: any) {
        const network = await this.getNetwork();
        const contract = network.getContract(this.getChainCodeName());

/*
        post http://localhost:7012/api/chaincode/sale
        {
            "ID": "fwer3232",
	        "kycId": "dfawefaw",
            "chain": "KANBAN",
            "txid": "0x334432",
            "quantity": 4,
            "bondType": "XDNB"
        }
*/
        const jsonString = JSON.stringify(data);
        const payment = await contract.submitTransaction('PaymentContract:CreatePayment', jsonString);

        return payment;
    }
}

export default SaleContractService;