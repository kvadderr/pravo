const pool = require("../../config/database");

module.exports = {

    userLogin: (login, pass, callback) => {
        pool.query("SELECT * FROM users WHERE login = ? AND password = ?",
        [
            login,
            pass
        ],
        (error, results, fields) => {
            if (error){
                callback(error);
            }
            return callback(null, results);
        })
    },

    userRegister: (data, callback) => {
        pool.query("INSERT INTO users (login, password) VALUES (?,?)",
        [
            data.login,
            data.password
        ],
        (error, results, fields) => {
            if (error){    
                callback(error)
            }
            return callback(null, results);
        }
        )
    }


}