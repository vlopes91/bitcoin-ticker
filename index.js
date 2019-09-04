const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res) {
    var cripto = req.body.cripto;
    var fiat = req.body.fiat;

    var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var finalURL = baseURL + cripto + fiat ;

    request(finalURL, function(error,response,body) {
        var data = JSON.parse(body);
        var price = data.last;

        res.send("<h1>The price of " +cripto+ " is "+price+" "+ fiat +"</h1>");
    })

    
});

app.listen(3000,function() {
    console.log("Server running on port 3000");
});