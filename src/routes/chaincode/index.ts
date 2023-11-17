import express from "express";
import KycContractRoute from "./KycContractRoute";
import SaleContractRoute from "./SaleContractRoute";
const router = express.Router();
router.use('/kyc', KycContractRoute);
router.use('/sale', SaleContractRoute);
export default router;
