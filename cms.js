// Requirements
const mysql = require("mysql");
const inquirer = require("inquirer");
const ct = require("console.table");

// Create mysql connection
const password = process.argv[2];
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password,
  database: "cms_db",
});

