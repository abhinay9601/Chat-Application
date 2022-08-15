import express from "express";
import setupController from "../controller/setupController";

const router = express.Router();

router.post("/", setupController.updateSetup);
router.post("/getsetup", setupController.getExistingConfig);
router.post("/getConfigForChatBox", setupController.getConfigForChatBox);
router.get("/", setupController.viewSetup);

module.exports = router;
