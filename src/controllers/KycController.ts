import KycService from "../services/KycService";
import { Request, Response } from 'express';
class KycController {

    
    static async listKyc(req: Request, res: Response) {
      try {
        console.log('list kyc start');
        const pageSize = Number(req.params.pageSize);
        const pageNum = Number(req.params.pageNum);

        console.log('pageSize=', pageSize);
        console.log('pageNum=', pageNum);
        const kycs = await KycService.getKycs(pageSize, pageNum);
        console.log('kycs=', kycs);
        return res.json({success: true, data: kycs});
      } catch (error) {
        console.log('error=', error);
        return res.json({success: false, message: 'Internal error', data: error})
      }
  
    } 

    //ValidateKYC
}

export default KycController;