import express from "express";
import KycContractController from "../../controllers/chaincode/KycContractController";
const router = express.Router();

router.post("/", KycContractController.createKyc);
router.post("/validate", KycContractController.validateKyc);
router.post("/reject", KycContractController.rejectKyc);
router.post("/blacklist", KycContractController.blacklistKyc);

export default router;