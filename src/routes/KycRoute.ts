import express from "express";
import KycController from "../controllers/KycController";
const router = express.Router();

router.get("/", KycController.listKyc);

export default router;
