const router = require("express").Router();

const {
    getFav,
    setFav,
    deleteFav
} = require("./controller");

router.get("/id_user/:id_user", getFav);
router.post("/", setFav);
router.delete("/id_favorite/:id_favorite", deleteFav);

module.exports = router;