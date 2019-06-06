# MotoMatch readme

## Description

This repository contains my dating app called "MotoMatch", created for a school project called "Project-Tech". 
In this project we are required to make a node.js application using express and a templating engine. This node app also requires a database connection, for which we are using mongoDB. Please feel free to leave any questions or feedback in the Issues section, it's always appreciated!


MotoMatch is a dating app where motorcyclists can chat, meet and ride.
This app uses nodejs, express, ejs templating and MongoDB.

## How to install

1. Clone this repository

2. Run "npm install" in your terminal

3. start the server using "node index.js" in your terminal

4. Open your browser and navigate to "localhost:3007", this will bring you to the homepage

5. Message me if you'd like the full project to connect your mongoDB database.

## Usage

Going to "localhost:3007/login" will bring you to the login page. Here you have the option to log-in, register an account or going back to the homepage.


![register](https://user-images.githubusercontent.com/43436118/59025956-a4cce580-8855-11e9-867f-131e1c60aeb1.PNG)

Creating an account will put store data in your local mongoDB database. Using this, you can now log in. 


![login](https://user-images.githubusercontent.com/43436118/59025919-8cf56180-8855-11e9-9108-de96b79ae3c5.PNG)

Logging in will use express-sessions to keep you signed in. From here you will be redirected to the dashboard. 


![dashboard](https://user-images.githubusercontent.com/43436118/59025987-b7dfb580-8855-11e9-8465-dd527c60b653.PNG)

On this dashboard you are able to add and remove users and able to log out.

That's it for now!

## Future plans

- Multer support for adding images

- Detail page for current user

- More data for profile

- Progressive enhancement

- A lot more html/css

## License

This project is licensed under the   GNU AFFERO GENERAL PUBLIC LICENSE - see the LICENSE.md file for details

## Feedback

Please feel free to leave any suggestions and/or feedback!
