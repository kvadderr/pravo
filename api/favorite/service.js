const pool = require("../../config/database");

module.exports = {

    getFavorite: (id_user, callback) => {
        pool.query("SELECT * FROM favorite WHERE id_user = ?",
        [
            id_user
        ],
        (error, results, fields) => {
            if (error){
                callback(error);
            }
            return callback(null, results);
        })
    },

    setFavorite: (data, callback) => {
        pool.query("INSERT INTO favorite (id_user, EoNumber, Name, PublishDateShort) VALUES (?,?,?,?)",
        [
            data.id_user,
            data.number,
            data.name,
            data.dateShort
        ],
        (error, results, fields) => {
            if (error){    
                callback(error)
            }
            return callback(null, results);
        }
        )
    },

    deleteFavorite: (id_favorite, callback) => {
        pool.query("DELETE FROM favorite WHERE id_favorite = ?",
        [
            id_favorite
        ],
        (error, results, fields) => {
            if (error){
                callback(error);
            }
            return callback(null, results);
        })
    },


}