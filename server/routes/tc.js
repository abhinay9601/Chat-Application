import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    res.render("terms-and-conditions");
});

module.exports = router;
