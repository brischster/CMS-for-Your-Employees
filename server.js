//const express = require('express');
const mysql = require("mysql2");
const inquirer = require("inquirer");

//const PORT = process.env.PORT || 3001;
// const app = express();

//app.use(express.urlencoded({extended: false})); // do i really need this?
//app.use(express.json()); // pretty sure i don't need this either, since we aren't communicating with the front end/https

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log("Connected to the employee_db database")
);
