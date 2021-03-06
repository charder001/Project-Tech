# MotoMatch readme

## Description

This repository contains my dating app called "MotoMatch", created for a school project called "Project-Tech". 
In this project we are required to make a node.js application using express and a templating engine. This node app also requires a database connection, for which we are using mongoDB. Please feel free to leave any questions or feedback in the Issues section, it's always appreciated!


MotoMatch is a dating app where motorcyclists can chat, meet and ride.
This app uses nodejs, express, ejs templating and MongoDB.
This app is still under development, and since it's a school project will not get updated very frequently. If this concept interests you, please feel free to contact me to see if a possible collaboration could be done.

## Features
For now, you are able to 
* create users
* add a profile image 
* be kept logged in by sessions
* edit your profile 
* delete your profile. 

## Getting started
Everything you need to get your copy of our project up and running on your local machine for testing and providing us with feedback.

### Prerequisites
What do you need to have in order to run this app?
* A command prompt(Terminal, CMD, gitBash)
* have nodejs installed,
* MongoDB  
* compass(optional but recommended)

### How to install

1. First, clone the repository to your local machine using your terminal

`git clone [https://github.com/charder001/Project-Tech]`

After cloning our repository, navigate to the folder

`cd project-tech`

2. Run `npm install` in your terminal to install the required packages

3. start the app using `node index.js` in your terminal

4. Start your mongodb database, create a database called MotoMatch with a collection called users.

![db](https://user-images.githubusercontent.com/43436118/60056598-bb8e8b80-96e1-11e9-929d-bbb6df528b3b.PNG)

Stored data will be structured like this in the MongoDB database.


5. Open your browser and navigate to "localhost:3001/login", this will bring you to the login page.

5. Add a .env file and connect to your own MongoDB Database. Message me if you need any more info regarding this step. Most .env files look kind of like this

```DB_HOST= # Database host (probably localhost)

DB_PORT= # Port of database instance

MONGO_DB= # The database you are using

DB_URL= # URL to connect with your database
```

6. You're done!

## Usage

Going to "localhost:3001/login" will bring you to the login page. Here you have the option to log-in, register an account or going back to the homepage.


![login](https://user-images.githubusercontent.com/43436118/60055830-3013fb00-96df-11e9-9707-c9e2bad39127.PNG)


Creating an account will put store data in your local mongoDB database.  

![register](https://user-images.githubusercontent.com/43436118/60055865-4d48c980-96df-11e9-925d-498bd4dccc23.PNG)

Using this, you can now log in.

Logging in will use express-sessions to keep you signed in. From here you will be redirected to the dashboard. 

![dashboard](https://user-images.githubusercontent.com/43436118/60056120-1d4df600-96e0-11e9-8cd6-56454ade617d.PNG)

On this dashboard you are able to edit view and edit your profile, log out or delete your account.

![update](https://user-images.githubusercontent.com/43436118/60056232-833a7d80-96e0-11e9-9e5d-77e8ff4de877.PNG)

That's it for now!

## Built with

* HTML
* CSS
* ES5
* Node
* Express
* Mongoose
* MongoDB

## Note

This app uses a .env file to declare your database and port info, you could create your own or feel free to contact us and we will gladly supply you with it!

Please feel free to leave any questions, comments or feedback regarding our project in the issues section of this repo.

## Future plans

- More data for profile

- Progressive enhancement

- A lot more html/css

## License

This project is licensed under the   GNU AFFERO GENERAL PUBLIC LICENSE - see the LICENSE.md file for details

## Feedback

Please feel free to leave any suggestions and/or feedback!

## Want to contribute?

Please contact me if you'd like to collaborate on our project and refer to our [Code of Conduct](CONTRIBUTING.md) to see what standards i adhere to.

