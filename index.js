const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get("/",function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res) {
    var cripto = req.body.cripto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";
    

    var options = {
        url:baseURL,
        method:"GET",
        qs: {
            from:cripto,
            to:fiat,
            amount:amount,
        }
    }

    request(options, function(error,response,body) {
        var data = JSON.parse(body);
        var price = data.price;
        var currentDate = data.time;

        console.log(price);

        res.write("<p>Date "+currentDate+"</p>");
        res.write("<h1>The price of "+ amount+ " "+cripto+ " is "+price+" "+ fiat +"</h1>")

        res.send();
    })

    
});

app.listen(3000,function() {
    console.log("Server running on port 3000");
});