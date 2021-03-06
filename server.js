var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ===================================================

 var tables = {
     reservation: [],
     waitList: []
 } 

 //GET ================================================
app.get("/", function(req, res) {
     res.sendFile(path.join(__dirname, "index.html"));
  }); 

app.get("/api/tables", function(req, res) {
    res.send(tables);
  });

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
 }); 

  // POST ================================================
app.post("/reservation", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var reservation = req.body;
  
    if(tables.reservation.length < 5) {
        tables.reservation.push(reservation);
        res.end("true");
    } else {
        tables.waitList.push(reservation);
        res.end("false");
    }
    // console.log(tables);
    
    // newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
  
    // res.json(newcharacter);

  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });