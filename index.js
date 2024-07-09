// DEPENDENCIES
// dotenv
require('dotenv').config();
// inquirer
const inquirer = require('inquirer');
// pg/pool
const { Pool } = require('pg');
// console.table for 'prettier' tables (no index col)
require('console.table');

// choices file
const displayChoicesFile = require('./assets/js/display-choices');
const { get } = require('http');
// Connect to database
const pool = new Pool(
    {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: 'localhost',
      database:   process.env.DB_NAME,
    },
    console.log(`Connected to the management_db database.`)
  )
  
  pool.connect();

// DATA
// FUNCTIONS
// display choices array
const displayChoicesArray = displayChoicesFile;

// ARRAY OF QUESTIONS FOR USER INPUT
const input = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: displayChoicesArray.map(action => ({name: action.name, value: action})),
    }    
            // Which employee's role would you like to update? (choice)
            // Which role do you want to assign to the selected employee? (choice)
 
];

async function getRoles() {
    try {
        const roles = await pool.query('SELECT title AS "name", id AS "value" FROM roles;');
        return roles.rows;
    } catch (error) {
        console.error("Error getting roles:", error);
        throw error;            
    }
};

async function getDepartments() {
    try {
        const departments = await pool.query('SELECT department_name AS "name", id AS "value" FROM departments;');
        return departments.rows;
    } catch (error) {
        console.error("Error getting departments:", error);
        throw error;            
    }
};

async function getEmployees() {
    try {
        const employees = await pool.query('SELECT first_name, last_name, id AS "value" FROM employees;');
        console.log(employees.rows);
        return employees.rows;
    } catch (error) {
        console.error("Error getting employees:", error);
        throw error;            
    }
};

async function init() {
    try {
    const rolesArray = await getRoles();
    const departmentsArray = await getDepartments();
    const employeesSimpleArray = await getEmployees();

    inquirer
        // ask the questions
        .prompt(input)
        .then((answers) => {
            const selectedAction = answers.action;
            if (selectedAction.name.includes("View")) {
                pool.query(selectedAction.query, (err,res) => {
                    if (err){
                        console.error(err);
                    } else {
                        console.table(res.rows);
                    }
                    pool.end();
                });
            } else if (selectedAction.name === "Add Employee") {
                inquirer
                .prompt([
                    {   
                        type: 'input',
                        name: 'first-name',
                        message: 'What is the employees first name?'
                    },
                    {   
                        type: 'input',
                        name: 'last-name',
                        message: 'What is the employees last name?'
                    },
                    {  // What is the employees role? (choice - pulling roles list as choices)
                        type: 'list',
                        name: 'new-employee-role',
                        message: 'What is the employees role?',
                        choices: rolesArray.map(role => ({name: role.name, value: role}))
                    },
                    // Who is the employees manager? (choice, including none)
                ])
                .then((answers) => {

                        const roleID = answers['new-employee-role'].value;
                        const firstName = answers['first-name'];
                        const lastName = answers['last-name'];
                        // if the first name, last name and role were submitted - add the employee
                        const text = 'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)'
                        const values = [`${firstName}`, `${lastName}`, `${roleID}`]

                        const res = pool.query(text, values);
                        console.log("Employee Added");
                });
            } else if (selectedAction.name === "Add Departments") {
                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'department_name',
                        message: 'What is the name of the new department?'
                    }
                ])
                .then((answers) => {
                    const newDepartment = answers['department_name'];

                    const text = 'INSERT INTO departments (department_name) VALUES ($1)'
                    const values = [`${newDepartment}`]
                    
                    const res = pool.query(text, values);
                    console.log("Department Added");
                }

                );
            } else if (selectedAction.name === "Add Role") {
                    inquirer
                    .prompt([
                        {   
                            type: 'input',
                            name: 'title',
                            message: "What is the new role's title?"
                        },
                        {   
                            type: 'input',
                            name: 'salary',
                            message: "What is the new role's salary?"
                        },
                        {  // What is the new role's department? (choice - pulling department list as choices)
                            type: 'list',
                            name: 'new-role-department',
                            message: "What is the new role's department?",
                            choices: departmentsArray.map(departments => ({name: departments.name, value: departments}))
                        },
                    ])
                    .then((answers) => {
    
                        const newTitle = answers['title'];
                        const newSalary = answers['salary'];
                        const departmentId = answers['new-role-department'].value;
                        // if the title salary and department were submitted - add the role
                        const text = 'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)'
                        const values = [`${newTitle}`, `${newSalary}`, `${departmentId}`]

                        const res = pool.query(text, values);
                        console.log("Role Added");
                    });
                } else if (selectedAction.name === "Update Employee Role") {
                    inquirer
                    .prompt([
                        {   
                            type: 'list',
                            name: 'employee_to_update',
                            message: "Which employee's role would you like to update?",
                            choices: employeesSimpleArray.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee}))
                        },
                        {  
                            type: 'list',
                            name: 'updated_role',
                            message: "Which role do you want to assign to the selected employee?",
                            choices: rolesArray.map(role => ({name: role.name, value: role}))
                        },
                    ])
                    .then((answers) => {
    
                        const updatedEmployeeID = answers['employee_to_update'].value;
                        const updatedRole = answers['updated_role'].value;
                        console.log("here" + `${updatedEmployeeID}`+ `${updatedRole}`);
                        // if there is an employee selected and a new role selected upate the employee role id
                        const text = 'UPDATE employees SET role_id = $1 WHERE employees.id = $2;'
                        const values = [updatedRole, updatedEmployeeID];

                        const res = pool.query(text, values);
                        console.log("Employee role updated");
                    });

            } else if (selectedAction.name === "Quit") {
                pool.end();
                process.exit(0);            } 
            else {
                console.log('no query associtated with this action');
                pool.end();
            }
        })
        .catch((err) => {
            console.error(err);
            pool.end();
        });
    } catch (error) {
        console.error("Error initializing app:", error);
        pool.end();
    }
};

// function call to initialize app
init();