require("dotenv").config()
//setting package requirements
var express = require("express")
var session = require("express-session")
var bodyParser = require("body-parser")
var slug = require("slug")
var path = require("path")
var find = require("array-find")
var multer = require("multer")
var mongoose = require('mongoose')


//Linking mongoose to MongoDB Database called "MotoMatch"
mongoose.connect('mongodb://' + "localhost" + '/' + "MotoMatch", {
  useNewUrlParser: true
})

//Defining data scheme
var Schema = mongoose.Schema
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  profilePicture: String
})

var User = mongoose.model("users", userSchema)

//declaring multer storage location
const storage = multer.diskStorage({
  destination: './static/images/uploads',
  filename: function (req, file, callback) {
  callback(null, file.fieldname + '-' + Date.now() + 
  path.extname(file.originalname));
}
});

//upload image
const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function (req, file, callback) {
    checkFileExt(file, callback);
  }
}).single('profilePicture');

express()
  .use(express.static("static"))
  .use(express.static(__dirname + '/static'))
  .use('/static', express.static(__dirname + '/static'))
  .use(bodyParser.urlencoded({
    extended: true
  }))

  //Configure sessions
  //https://www.youtube.com/watch?v=zsOGmMuwhT4&t=385s for help with user sessions
  .use(session({
    resave: false,
    saveUninitialized: true,
    secret: "Testcookie" /*process.env.SESSION_SECRET*/ ,
    maxAge: 1000 * 60 * 60
  }))

  //Setting view engine to EJS and assigning the views to the folder "view"
  .set("view engine", "ejs")
  .set("views", "view")

  //Routes
  //https://www.youtube.com/watch?v=gnsO8-xJ8rs For help with routing and the basics of expressJS
  .get("/dashboard", dashboard)
  .get("/login", login)
  .get("/register", register)
  .get("/signout", signout)
  .get("/users/delete", deleteUser)
  .get("/update", getUpdate)
  .post("/update", postUpdate)
  .post("/login", postlogin)
  .post("/register", postregister)

  //Listen on the defined port
  .listen(3001, function () {
    console.log("Server listening on port 3001")
  })

//Get "/dashboard"
function dashboard(req, res) {
  if (!req.session.user) {
    return res.status(401).redirect("login")
  }
  User.find(function (err, docs) {
    return res.status(200).render("dashboard.ejs", {
      users: docs,
      currentUser: req.session.user
    })
  })
}

//Get "/register"
function register(req, res) {
  res.render("register.ejs")
}

function checkFileExt(file, callback) {
  const fileExt = /jpeg|jpg|png|gif/;
  const extName = fileExt.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileExt.test(file.mimetype);
  
  if (mimeType && extName) {
    return callback(null, true);
  } else {
      callback('File is not a image');
  }
}

//Post "/register" 
function postregister(req, res) {
    uploadImage(req, res, (error) => {
        if (error) {
          console.log(error);
        } 
      
        else {
          var firstName = req.body.firstName
          var lastName = req.body.lastName
          var password = req.body.password
          
          if (req.file){
            var profilePicture = `/static/images/uploads/${req.file.filename}`
          }
              var newuser = new User()
              newuser.firstName = firstName
              newuser.lastName = lastName
              newuser.password = password
              newuser.profilePicture = profilePicture
              newuser.save(function (err, savedUser) {
                if (err) {
                  console.log(err)
                  return res.status(500).send()
                }
                console.log(newuser)
                return res.status(200).redirect("/login")
              })
        }
      }) 
}

//Get "/login"
function login(req, res) {
  res.render('login.ejs')
}

//Post "/login"
function postlogin(req, res) {
  var firstName = req.body.firstName
  var password = req.body.password

  User.findOne({
    firstName: firstName,
    password: password
  }, function (err, user) {
    if (err) {
      console.log(err)
      return res.status(500).send()
    }
    if (!user) {
      console.log("login unsuccessful")
      return res.status(404).redirect("/login")
    }
    req.session.user = user;
    console.log("login succesful")
    res.redirect("/dashboard")
    res.status(200).send()
  })
}

//Get "/signout"
function signout(req, res) {
  req.session.destroy()
  console.log("signed out")
  res.redirect("/login")
  return res.status(200).send()
}

//Get "/users/delete"
function deleteUser(req, res) {
  User.remove({
    _id: req.session.user._id
  }, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.redirect("/login")
  })
}

//Get "/update"
function getUpdate(req, res){
  if (!req.session.user) {
    return res.status(401).redirect("login")
  }
  User.find(function (err, docs) {
      return res.status(200).render("update", {
          users: docs,
          currentUser: req.session.user
      })
  })
}

//post "/update"
function postUpdate(req, res) {
  var currentId = req.session.user._id
  var id = currentId
  User.findOne({_id: id}, function (err, user) {
    if (err) {
        console.log(err)
        return res.status(500).send()
    } else {
        if (!user) {
            console.log("edit unsuccessful")
            res.status(404).send()
        } else {
          if (req.body.firstName) {
            user.firstName = req.body.firstName
          }
          if (req.body.lastName) {
            user.lastName = req.body.lastName
          }
          if (req.body.password) {
            user.password = req.body.password
          }
          user.save(function (err, updatedObject) {
            if (err) {
              console.log(err)
              res.status(500).send()
            } else {
              res.redirect("dashboard")
            }
          })
        }
      }
    })
}