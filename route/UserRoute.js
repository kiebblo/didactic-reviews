const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController");
const auth = require("../middleware/auth")

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.delete("/:id", auth, UserController.deleteUser);

module.exports = router;
