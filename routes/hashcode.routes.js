const router = require("express").Router();

const { protect } = require("../middleware/auth");

const {
  register,
  login,
  question,
  postCheck
} = require("../controllers/hashcode.controllers");

router.post("/register", register);
router.post("/login", login);
router.get("/question", protect, question);
router.post("/check", postCheck);


module.exports = router;
