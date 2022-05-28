const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var FCM = require('fcm-node');
var serverKey = '<SERVER_KEY>';
var fcm = new FCM(serverKey);
const request = require('request');
const pool = require("./config/database");


const favoriteRouter = require("./api/favorite/router");
const userRouter = require("./api/users/router");

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use("/api/favorite", favoriteRouter);
app.use("/api/users", userRouter);

app.listen(4000);
console.log("Сервер на порту 4000 запущен");

setInterval(ReadData, 10000 * 60 * 60);

function ReadData(){
    
    var data = []; 

    SQLq = "SELECT * from favorite"; 
    pool.query(SQLq, (err, result, field) => {
        
        data.push(result.EoNumber);

        
    })

    function see(){
        console.log(data);
    }

  
  request('http://publication.pravo.gov.ru/api/Document/Get?code=subjects', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }

  for (var i =0; i < 10; i++){
    if (body.Documents[i].Name.indexOf('изменений') +1 ){

        if (body.Documents[i].EoNumber.indexOf(data[i])){

   

           var message = {
            to:'<DEVICE_TOKEN>',
                notification: {
                    title: 'Изменение в законе!',
                    body: body.Documents[i].Name
                },
        
            };
        
            fcm.send(message, function(err, response) {
                if (err) {
                    console.log("Something has gone wrong!"+err);
                    console.log("Respponse:! "+response);
                } else {
                    // showToast("Successfully sent with response");
                    console.log("Successfully sent with response: ", response);
                }
        
            });

        }
    }

  }

  
});

}
