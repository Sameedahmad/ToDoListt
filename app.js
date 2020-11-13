const express = require("express");
const bodyParser = require("body-parser");
const { appendFile } = require("fs");
var items= ["The One Thing", "Atomic Habits"];


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
   
    var today = new Date();
    
    var options = {
        weekday: "long",
        day: "numeric",
        month:"long"
    };

    var day = today.toLocaleDateString("en-GB", options);

    res.render("list", { kindOfDay: day, newItem: items})
     
});

app.post('/', function(req,res){
    var item = req.body.Todo;
    console.log(item);
    items.push(item);
    res.redirect('/');
})

app.listen(3000, function(){
    console.log("Server has started on port 3000");
    console.log(items);
})

module.exports = app;
module.exports.handler = serverless(app);
