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
      displayRoles();
      break;
    case "Display Employees":
      displayEmployees();
      break;
    case "Add a Department":
      //addDepartment();
      break;
    case "Add a Role":
      //addRole();
      break;
    case "Add an Employee":
      //addEmployee();
      break;
    case "Update an Employee Role":
      //updateEmployeeRole();
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

const displayEmployees = async () => {
  const data = await db.promise().query(
    // "SELECT first_name, last_name, job_role.title, job_role.salary FROM employee LEFT JOIN job_role ON role_id = job_role.id LEFT JOIN department ON department_id = department.id GROUP BY "
    // //LEFT JOIN employee ON manager_id = employee.id"

    "SELECT first_name, last_name, job_role.title, job_role.salary FROM employee LEFT JOIN (job_role, department) ON (role_id = job_role.id AND department_id = department.id)"
  );
  console.table(data[0]);
  mainMenu();
};

const addDepartment = async () => {
  const data = await db.promise().query("ALTER TABLE department ADD ");
};

const addDeptQuestion = [
  {
    type: "input",
    message: "What is the name of the department you would like to add?",
    name: "newDept",
  },
];

const addRoleQuestions = [
  {
    type: "input",
    message: "What is the title of the role you would like to add?",
    name: "newRole",
  },
  {
    type: "input",
    message: "What is the salary of the new role?",
    name: "newSalary",
  },
];

mainMenu();
