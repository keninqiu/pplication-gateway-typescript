
import ChainCodeService from '../ChainCodeService';

class KycContractService extends ChainCodeService {


    static async CreateKYC(data: any) {
        const network = await this.getNetwork();
        const contract = network.getContract(this.getChainCodeName());

/*
        post http://localhost:7012/api/chaincode/kyc
        {
            "ID": "fwer3232",
            "email": "kenin.qiu@gmail.com",
            "phone": "8888888",
            "citizenship": "China",
            "firstName": "Ken",
            "middleName": "qiu",
            "lastName": "ning",
            "month": "12",
            "day": "12",
            "year": "2010",
            "idType": "driver license",
            "idNumber": "4456543222223",
            "selfieUrl": "https://exchangily.com",
            "videoUrl": "https://pay.cool",
            "residency": "73 song faewfeaw",
            "province": "Guangdong",
            "city": "Guangzhou",
            "homeAddress": "553 songe dddtre",
            "homeAddress2": "dee",
            "postalCode": "M2H2T3",
            "addressProofType": "DDDFE",
            "addressProofUrl": "https://dnb.pay.cool",
            "industry": "Car",
            "occupation": "Software developer",
            "annualIncome": "12222222",
            "sourceOfFunds": "Income",
            "intent": "fawefeawfw",
            "employmentStatus": "Employed",
            "createdAt": "1933455632"
        }
*/

        const jsonString = JSON.stringify(data);
        const kyc = await contract.submitTransaction('CreateKYC', jsonString);
        //const txid = kyc.toString();
        return kyc;
    }

    static async ValidateKYC(ID: string) {
        const network = await this.getNetwork('aab');

        const contract = network.getContract(this.getChainCodeName());

        const kyc = await contract.submitTransaction('ValidateKYC', ID);
        return kyc;
    }

    static async RejectKYC(ID: string) {
        const network = await this.getNetwork('aab');

        const contract = network.getContract(this.getChainCodeName());

        const kyc = await contract.submitTransaction('RejectKYC', ID);
        return kyc;
    }

    static async BlacklistKYC(ID: string) {
        const network = await this.getNetwork('aab');

        const contract = network.getContract(this.getChainCodeName());

        const kyc = await contract.submitTransaction('BlacklistKYC', ID);
        return kyc;
    }
}

export default KycContractService;