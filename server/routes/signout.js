import express from "express";
import mobileSessionModal from "../models/mobilesessionModal";
const router = express.Router();

router.get("/", (req, res) => {
  mobileSessionModal.remove({token: req.cookies.token}, (err, tkn)=>{});
  res.clearCookie("token");
  res.clearCookie("client_id");
  res.redirect("signin");
});

module.exports = router;
