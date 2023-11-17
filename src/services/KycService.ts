import KycModel from '../models/KycModel';

class KycService {
    static async updateKycStauts(ID: string, status: number) {
        const newKyc = await KycModel.findOneAndUpdate({ID}, {status});
        return newKyc;
    }

    static async createKyc(kyc: any) {
        const newKyc = await new KycModel(kyc).save();
        return newKyc;
    }

    static async getKycs(pageSize: number, pageNum: number) {
        const kycs = await KycModel.find({}).sort({_id: -1}).limit(pageSize).skip(pageSize * pageNum);
        return kycs;
    }
}

export default KycService;