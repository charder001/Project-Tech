require("dotenv").config()
var express = require("express")
var session = require("express-session")
var bodyParser = require("body-parser")
var slug = require("slug")
var path = require("path")
var find = require("array-find")
var mongojs = require("mongojs")
var mongoose = require('mongoose')
var db = mongojs("MotoMatch", ["users"])
var ObjectId = mongojs.ObjectID
mongoose.connect('mongodb://' + "localhost" + '/' + "MotoMatch",
 { useNewUrlParser: true })


var Schema = mongoose.Schema
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String
})

var User = mongoose.model("users", userSchema)

express()
.use(express.static("static"))
.use(bodyParser.urlencoded({extended: true}))
.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "Testcookie"/*process.env.SESSION_SECRET*/,
    maxAge: 1000 * 60 * 60
}))

.set("view engine", "ejs")
.set("views", "view")
.get("home", home)
.get("/users", users)
//.get("/:id", user)
.get("/login", login)
.get("/register", register)
.post("/login", postlogin)
.post("/users/add", submit)
.post("/register", postregister)
.post("out", out)
.delete("/users/delete/:id", removeuser)
.listen(3001, function(){
    console.log("Server listening on port 3001")
})



function home(req, res){
    console.log("nice")
}

function submit(req, res){
    
    var id = slug(req.body.firstName).toLowerCase()
    var newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }
    db.users.insert(newUser, function(err, result){
        res.redirect("/users")
    })
}

function user(req, res){
    db.users.find(function (err, docs) {
    res.render("user.ejs", {users: docs})
    })
}

function users(req, res){
    db.users.find(function (err, docs) {
    res.render("users.ejs", {users: docs})
    })
}

function removeuser(req, res){
    db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
      if (err){
          console.log(err)
      }  
      res.redirect("/users")
    })
}

function login(req, res) {
    res.render('login.ejs' )

}


function register(req, res){
    
}

function postregister(req, res){
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var password = req.body.password

    var newuser = new User()
    newuser.firstName = firstName
    newuser.lastName = lastName
    newuser.password = password
    newuser.save(function(err, savedUser){
      if(err){
        console.log(err)
        return res.status(500).send()
      }

      return res.status(200).send()
      
    })
    res.redirect("/users")
}

function out(req, res){

}

function postlogin(req, res){
  var firstName = req.body.firstName
  var password = req.body.password

  user.findOne({firstName: firstName, password: password}, function(err, user){
    if (err){
      console.log(err)
    } if(!user){
      console.log("login unsuccesful")
      return res.status(404).send()
    }
    console.log("login succesful")
    return res.status(200).send()
  })
}
