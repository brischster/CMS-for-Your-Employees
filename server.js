const mysql = require("mysql2");
const inquirer = require("inquirer");
// const fs = require("fs");
const util = require("util");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees_db",
  },
  console.log("Connected to the employee_db database")
);
const query = util.promisify(db.query).bind(db);

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
      addDepartment();
      break;
    case "Add a Role":
      addRole();
      break;
    case "Add an Employee":
      addEmployee();
      break;
    case "Update an Employee Role":
      updateEmployeeRole();
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
  const data = await db
    .promise()
    .query(
      "SELECT employee.first_name, employee.last_name,job_role.title, job_role.salary, department.dept_name, employee.manager_id AS manager FROM employee LEFT JOIN job_role ON employee.role_id = job_role.id JOIN department ON job_role.department_id = department.id"
    );
  console.table(data[0]);
  mainMenu();
};

const addDepartment = async () => {
  const newDeptQuestions = await inquirer.prompt(addDeptQuestion);
  try {
    const data = await query(`INSERT INTO department SET ?`, {
      dept_name: newDeptQuestions.newDept,
    });
    console.log(`\n ${newDeptQuestions.newDept} has been added to database.`);
    // console.table(data[0]);
    mainMenu();
  } catch (error) {
    console.error(error);
  }
};

const addRole = async () => {
  try {
    const depts = await query("SELECT * FROM department");
    const listOfDepts = depts.map((department) => ({
      name: department.dept_name,
      value: department.id,
    }));

    const deptChoice = {
      type: "list",
      message: "What is the Department ID for the new role?",
      choices: listOfDepts,
      name: "newDeptNum",
    };

    addRoleQuestions.push(deptChoice);

    const newRoleQ = await inquirer.prompt(addRoleQuestions);
    // try {
    // const depts = await query('SELECT * FROM department');
    // let listOfDepts = depts.map((department) => ({
    //   name: department.dept_name
    // }))
    // const listForRoleQuestions = async () => {
    //   const depts = await query("SELECT * FROM department");
    //   listOfDepts = depts.map((department) => ({
    //     name: department.dept_name,
    //     value: department.id,
    //   }));
    // };
    const data = await query(`INSERT INTO job_role SET ?`, {
      title: newRoleQ.newRole,
      salary: newRoleQ.newSalary,
      id: newRoleQ.dept_name,
    });
    console.log(`${newRoleQ.newRole} has been added to the database.`);
    mainMenu();
  } catch (error) {
    console.error(error);
  }
};

const addEmployee = async () => {
  try {
    const rolesList = await query(
      "SELECT id AS value, title AS name FROM job_role"
    );
    //const roles = await query("SELECT * FROM job_role");
    // const listOfRoles = roles.map((job_role) => ({
    //   name: job_role.title,
    //   value: job_role.id,
    // }));
    const managerList = await query(
      "SELECT id AS value, last_name AS name FROM employee"
    );

    // const mgr = await query("SELECT * FROM employee");

    // let listOfMgr = mgr.map((employee) => ({
    //   name: `${employee.first_name} ${employee.last_name}`,
    //   value: employee.id,
    // }));

    const newEmpQ = await inquirer.prompt([
      {
        type: "input",
        message: "What is the new employee's first name?",
        name: "newFirstName",
      },
      {
        type: "input",
        message: "What is the new employee's last name?",
        name: "newLastName",
      },
      {
        type: "list",
        message: "What is the role ID for the new employee?",
        choices: rolesList,
        name: "newRoleID",
      },
      {
        type: "list",
        message: "What is the new employee's manager's id?",
        choices: managerList,
        name: "newManagerID",
      },
    ]);

    const data = await query(`INSERT INTO employee SET ?`, {
      first_name: newEmpQ.newFirstName,
      last_name: newEmpQ.newLastName,
      role_id: newEmpQ.newRoleID,
    });
    console.log(
      `${newEmpQ.newFirstName} ${newEmpQ.newLastName} has been added to the database.`
    );
    mainMenu();
  } catch (error) {
    console.error(error);
  }
};

const updateEmployeeRole = async () => {
  try {
    const roleList = await query(
      "SELECT id AS value, title AS name FROM job_role"
    );
    const empList = await query(
      "SELECT id AS value, last_name AS name FROM employee"
    );

    const updateRoleQuestions = [
      {
        type: "list",
        message: "Select employee to update",
        name: "id",
        choices: empList,
      },
      {
        type: "list",
        message: "What is the new role?",
        name: "role_id",
        choices: roleList,
      },
    ];

    const { id, role_id } = await inquirer.prompt(updateRoleQuestions);
    const data = await db
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        role_id,
        id,
        // const data = await query("UPDATE employee SET role_id = ? WHERE id = ?", [
        // role_id,
        // id,
      ]);
    console.log(`Updated employee`);
    mainMenu();
  } catch (error) {
    console.log(error);
  }
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

// const addEmployeeQuestions = [
//   {
//     type: "input",
//     message: "What is the new employee's first name?",
//     name: "newFirstName",
//   },
//   {
//     type: "input",
//     message: "What is the new employee's last name?",
//     name: "newLastName",
//   },
//   {
//     type: "input",
//     message: "What is the role ID for the new employee?",
//     name: "newRoleID",
//   },
//   {
//     type: "input",
//     message: "What is the new employee's manager's id?",
//     name: "newManagerID",
//   },
// ];

mainMenu();
