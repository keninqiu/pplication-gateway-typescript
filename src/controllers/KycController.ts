import KycService from "../services/KycService";
import ChainCodeService from "../services/ChainCodeService";
import express, { Express, Request, Response } from 'express';
class KycController {

    
    static async listKyc(req: Request, res: Response) {
      try {
        const pageSize = Number(req.params.pageSize);
        const pageNum = Number(req.params.pageNum);

        const kycs = await KycService.getKycs(pageSize, pageNum);
        return res.json({success: true, data: kycs});
      } catch (error) {
        return res.json({success: false, message: 'Internal error', data: error})
      }
  
    } 

    //ValidateKYC
}

export default KycController;