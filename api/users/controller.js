const {
    userLogin,
    userRegister
} = require("./service");

module.exports = {
    Auth: (req, res) => {
       
        const login = req.params.login;
        const password = req.params.password;
        console.log("LOGIN");
        console.log(login);
        userLogin(login, password, (err, results) => {
            if (err){
                console.log(err);
            }
            if (!results) {
                return res.status(500).json("Неверный логин или пароль");
            } else {
                return res.json(results);
            }
        });
    },

    Register: (req, res) => {
        const body = req.body;
	    console.log(body);
        userRegister (body, (err, results) => {
            if (err){
                console.log(err);
            }
            return res.json(results);
        })
    }
}