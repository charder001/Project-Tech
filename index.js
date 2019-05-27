
var express = require("express");
var bodyParser = require("body-parser");
var slug = require("slug");
var path = require("path");

var data = [
    {
        name: "Amanda",
        age: 22
    },
    {
        name: "Chloe",
        age: 20
    }
]

express()
.use(express.static("static"))
.set("view engine", "ejs")
.set("views", "view")
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: true}))
.get("/", onhome)
.get("/users", users)
.get("/register", register)
.listen(3000, function(){
    console.log("Server listening on port 3000")
})

function onhome(req, res){

}

function users(req, res){
    res.render("users.ejs", {data: data})
}

function register(req, res) {
    res.render("register.ejs")
}
