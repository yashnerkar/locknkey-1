const router = require("express").Router();

const { authorization, protect } = require("../middleware/auth");

const { getTeams, getWinners,postCheck } = require("../controllers/admin.controllers.js");

router.use(protect)
router.use(authorization)

router.get("/teams", getTeams);
router.get("/winners", getWinners);

module.exports = router;
