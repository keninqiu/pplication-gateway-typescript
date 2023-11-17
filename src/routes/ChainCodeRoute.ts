import express from "express";
import KycContractRoute from "./chaincode/KycContractRoute";
const router = express.Router();
router.use('/kyc', KycContractRoute);
export default router;
