import express from "express";
import dashboardController from "../controller/dashboardController";

const router = express.Router();

router.get("/", dashboardController.dashboard);

module.exports = router;
