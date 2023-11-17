import express from "express";
import FabConnectController from "../controllers/FabConnectController";
const router = express.Router();

router.post("/identities", FabConnectController.registerUser);
router.post("/identities/enroll", FabConnectController.enrollUser);

export default router;
