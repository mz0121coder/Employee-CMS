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

  // Add departments, roles & employees
function deptNew() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter name of department",
          name: "deptAdd",
        },
      ])
      .then(function (depRecent) {
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: depRecent.deptAdd,
          },
          function (err, res) {
            if (err) throw err;
            createCmsData();
          }
        );
      });
  }
  
  function roleCreate() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter title of role",
          name: "plusRoleName",
        },
        {
          type: "input",
          message: "Enter salary of role",
          name: "plusSalary",
        },
        {
          type: "input",
          message: "Enter ID of role",
          name: "plusId",
        },
      ])
      .then(function (newRole) {
        connection.query("INSERT INTO role SET ?", {
          title: newRole.plusRoleName,
          salary: newRole.plusSalary,
          department_id: newRole.plusId,
        });
        createCmsData();
      });
  }
  
  function newAddEmp() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter first name of employee",
          name: "firstNameEmp",
        },
        {
          type: "input",
          message: "Enter last name of employee",
          name: "lastNameEmp",
        },
        {
          type: "input",
          message: "Enter role ID of employee",
          name: "IdRole",
        },
        {
          type: "input",
          message: "Enter role manager ID of employee",
          name: "IdManagerEmp",
        },
      ])
      .then(function (recentAdd) {
        connection.query("INSERT INTO employee SET ?", {
          first_name: recentAdd.firstNameEmp,
          last_name: recentAdd.lastNameEmp,
          role_id: recentAdd.IdRole,
          manager_id: recentAdd.IdManagerEmp,
        });
        createCmsData();
      });
  }

  // Show lists
function deptListShow() {
    console.log(" ");
    connection.query(
      "SELECT id, name AS department FROM department",
      function (err, res) {
        if (err) throw err;
        console.table(res);
        createCmsData();
      }
    );
  }
  
  function roleList() {
    console.log(" ");
    connection.query(
      "SELECT id, title, salary, department_id AS role FROM role",
      function (err, res) {
        if (err) throw err;
        console.table(res);
        createCmsData();
      }
    );
  }
  function empList() {
    console.log(" ");
    connection.query(
      "SELECT id, first_name, last_name, role_id, manager_id AS employee FROM employee",
      function (err, res) {
        if (err) throw err;
        console.table(res);
        createCmsData();
      }
    );
  }

  // Update entries
function empRoleChange() {
    inquirer
      .prompt([
        {
          message:
            "Enter first name of employee whose role has changed",
          type: "input",
          name: "name",
        },
        {
          message: "enter ID of new role",
          type: "number",
          name: "role_id",
        },
      ])
      .then(function (response) {
        connection.query(
          "UPDATE employee SET role_id = role_id WHERE first_name = name",
          [response.role_id, response.name],
          function (err, data) {
            console.table(response);
          }
        );
        createCmsData();
      });
  }
  
  // Continue + finalise CMS tracker
function createCmsData() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "Continue creating CMS?",
          name: "promptResume",
          choices: ["YES", "NO"],
        },
      ])
      .then(function (recentResponse) {
        if (recentResponse.promptResume === "YES") {
          userPrompt();
        } else {
          console.log("CMS completed");
          connection.end();
        }
      });
  }
  
  userPrompt();
  connection.connect(function (err) {
    if (err) console.log("not connected", err);
    else console.log("connection succesful");
  
    connection.query("SELECT * FROM department", function (err, result) {
      if (err) console.log("error", err);
      else console.log("successful");
    });
  });
  