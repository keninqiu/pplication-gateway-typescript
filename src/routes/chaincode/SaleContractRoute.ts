import express from "express";
import SaleContractController from "../../controllers/chaincode/SaleContractController";
const router = express.Router();

router.post("/", SaleContractController.createPayment);

export default router;