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

// User prompts begin
function userPrompt() {
    inquirer
      .prompt([
        {
          type: "list",
          message: "What would you like to do?",
          name: "choice",
          choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "List Employees",
            "List Roles",
            "List Departments",
            "Update An Employee's Role",
          ],
        },
      ])
      .then(function (fillTable) {
        if (fillTable.choice === "Add Department") {
          deptNew();
        } else if (fillTable.choice === "Add Role") {
          roleCreate();
        } else if (fillTable.choice === "Add Employee") {
          newAddEmp();
        } else if (fillTable.choice === "List Employees") {
          empList();
        } else if (fillTable.choice === "List Roles") {
          roleList();
        } else if (fillTable.choice === "List departments") {
          deptListShow();
        } else {
          empRoleChange();
        }
      });
  }