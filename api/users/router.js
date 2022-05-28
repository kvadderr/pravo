const router = require("express").Router();

const {
    Auth,
    Register
} = require("./controller");

router.get("/login/:login/password/:password", Auth);
router.post("/", Register);

module.exports = router;