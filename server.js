const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  },
  console.log("Connected to the employee_db database")
);

const mainMenu = async () => {
  const { selection } = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Display Departments",
        "Display Roles",
        "Display Employees",
        "Update an Employee Role",
        "Exit",
      ],
      name: "selection",
    },
  ]);
  switch (selection) {
    case "Display Departments":
      displayDepartments();
      break;
    case "Display Roles":
      //displayRoles()
      break;
    default:
      process.exit(0);
  }
};

const displayDepartments = async () => {
  const data = await db.promise().query("SELECT dept_name FROM department");
  console.table(data[0]);
  mainMenu();
};

const displayRoles = async () => {
  const data = await db
    .promise()
    .query(
      "SELECT title, salary, department.dept_name FROM job_role LEFT JOIN department ON department_id = department.id"
    );
  console.table(data[0]);
  mainMenu();
};

mainMenu();
