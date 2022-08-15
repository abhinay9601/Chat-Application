import express from "express";
import pipelineController from "../controller/pipelineController";

const router = express.Router();

router.post("/", pipelineController.addToPipeline);
router.post("/delete", pipelineController.deletePipeline);
router.get("/", pipelineController.viewPipeline);

module.exports = router;
