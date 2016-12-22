var express = require("express");
var logger = require("morgan");
var http = require("http");

var app = express();
var server = http.createServer(app);

app.use(logger("dev"));
app.get("/", function (req, res) {
    res.send("The homepage.")


})
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
app.get("/:timestamp", function (req, res) {
    if (req.params.timestamp) {
        timestamp = req.params.timestamp.toLowerCase();
        numbertimestamp = +timestamp;
        console.log(timestamp);

        if (isNaN(numbertimestamp)) {
        //if its not a number, check if the string contains a date in the format "Month xx XXXX"
            var validmonth = false;
            //split the string into an array.
            stringarray = timestamp.split(" ");
            console.log(stringarray);
            //check if first entry of array matches a month
            for (i = 0; i < months.length; i++) {
                if (stringarray[0].toLowerCase() == months[i].toLowerCase()) {
                    stringarray[0] = i;
                    validmonth = true;
                    break;
                }

            }
            //if it doesn't match, return invalid.
            if(validmonth == false){
            res.send("Not a number or valid month.");
            }
            else{
            stringarray[1] = +stringarray[1];
            stringarray[2] = +stringarray[2];
            console.log(stringarray);
            date = new Date(stringarray[2], stringarray[0], stringarray[1])
            res.send({date: date.toString(), 
                     unix: date.getTime()});
                
            }
        } 
        
        else {
            //if its numbers, make sure its not a negative number then parse for Date, send back object
            date = new Date(numbertimestamp);
            month = months[date.getMonth()];
            day = date.getDate().toString();
            year = date.getFullYear().toString();
            stringdate = month + " " + day + ", " + year;
            res.send({
                date: date.toString(),
                unix: timestamp
            });
        }

    }


})





server.listen(3000);

server.on("listening", function () {
    console.log("Server up.")
})