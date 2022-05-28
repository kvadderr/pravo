const {
    getFavorite,
    setFavorite,
    deleteFavorite
} = require("./service");

module.exports = {
    getFav: (req, res) => {
       
        const id_user = req.params.id_user;
        getFavorite(id_user, (err, results) => {
            if (err){
                console.log(err);
            }
            if (!results) {
                return res.status(500).json("Неверный запрос");
            } else {
                return res.json(results);
            }
        });
    },

    setFav: (req, res) => {
        const body = req.body;
        setFavorite (body, (err, results) => {
            if (err){
                console.log(err);
            }
            return res.json(results);
        })
    },

    deleteFav: (req, res) => {
       
        const id = req.params.id_favorite;
        deleteFavorite(id, (err, results) => {
            if (err){
                console.log(err);
            }
            if (!results) {
                return res.status(500).json("Неверный запрос");
            } else {
                return res.json(results);
            }
        });
    },
}