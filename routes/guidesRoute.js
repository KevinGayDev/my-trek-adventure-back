const express = require('express');
const router = express.Router();
const guideCtrl = require("../controllers/guideCtrl");
const loginCtrl = require("../controllers/loginCtrl");
const mwToken = require('../middlewares/tokenMw');

router.get("/", guideCtrl.getGuidesList);
router.put("/update", guideCtrl.updateGuide);
router.delete("/delete", guideCtrl.deleteGuide);

router.get("/:slug", guideCtrl.getSingleGuide);
router.get("/userinfos", mwToken, loginCtrl.getCurrentUser);

module.exports = router;