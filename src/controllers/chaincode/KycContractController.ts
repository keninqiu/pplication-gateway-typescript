import KycContractService from "../../services/chaincode/KycContractService";
import { Request, Response } from 'express';

class KycContractController {
    static async createKyc(req: Request, res: Response) {
        try {
          const body = req.body;
          const ret = await KycContractService.CreateKYC(body);
          return res.json({success: true, data: ret});
        } catch (error) {
          console.log('error===', error);
          return res.json({success: false, message: 'Internal error', data: error})
        }
    } 


    static async validateKyc (req: Request, res: Response) {
        try {
        const body = req.body;
          const ID = body.ID;
          const kyc = await KycContractService.ValidateKYC(ID);
          return res.json({success: true, data: kyc});
        } catch (error) {
            console.log('error===', error);
          return res.json({success: false, message: 'Internal error', data: error})
        }
    }

    static async rejectKyc (req: Request, res: Response) {
      try {
      const body = req.body;
        const ID = body.ID;
        const kyc = await KycContractService.RejectKYC(ID);
        return res.json({success: true, data: kyc});
      } catch (error) {
          console.log('error===', error);
        return res.json({success: false, message: 'Internal error', data: error})
      }
  }

  static async blacklistKyc (req: Request, res: Response) {
    try {
    const body = req.body;
      const ID = body.ID;
      const kyc = await KycContractService.BlacklistKYC(ID);
      return res.json({success: true, data: kyc});
    } catch (error) {
        console.log('error===', error);
      return res.json({success: false, message: 'Internal error', data: error})
    }
  }
}

export default KycContractController;