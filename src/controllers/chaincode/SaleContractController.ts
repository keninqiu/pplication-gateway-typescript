import SaleContractService from "../../services/chaincode/SaleContractService";
import { Request, Response } from 'express';
class SaleContractController {
    static async createPayment(req: Request, res: Response) {
        try {
          const body = req.body;
          const ret = await SaleContractService.CreatePayment(body);
          return res.json({success: true, data: ret});
        } catch (error) {
          console.log('error===', error);
          return res.json({success: false, message: 'Internal error', data: error})
        }
    }     
}

export default SaleContractController;