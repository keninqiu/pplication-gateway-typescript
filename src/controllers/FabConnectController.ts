import FabConnectService from "../services/FabConnectService";
import express, { Express, Request, Response } from 'express';
class FabConnectController {

    static async registerUser(req: Request, res: Response) {
        try {
          const body = req.body;
          const name = body.name;
          const secret = body.secret;
          const org = body.org;

          const ret = await FabConnectService.registerUser(name, secret, org);

          return res.json({success: true, data: ret});
        } catch (error) {
          return res.json({success: false, message: 'Internal error', data: error})
        }
    
    } 
    
    static async enrollUser(req: Request, res: Response) {
        try {
          const body = req.body;
          const name = body.name;
          const secret = body.secret;
          const org = body.org;

          const ret = await FabConnectService.enrollUser(name, secret, org);

          return res.json({success: true, data: ret});
        } catch (error) {
          return res.json({success: false, message: 'Internal error', data: error})
        }
    
    } 
}

export default FabConnectController;