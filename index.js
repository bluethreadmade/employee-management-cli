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
            // What is the employees first name?
            // What is the employees last name?
            // What is the employees role? (choice - pulling roles list as choices)
            // add an employee will be async 
            // Who is the employees manager? (choice, including none)
        
            // Which employee's role would you like to update? (choice)
            // Which role do you want to assign to the selected employee? (choice)


        
            // What is the name of the role?
            // What is the salary of the role?
            // Which department does the role belong to? (choice)
        
            // What is the name of the department?

    
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

async function init() {
    try {
    const rolesArray = await getRoles();
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
                    console.log(answers);

                        const roleID = answers['new-employee-role'].value;
                        const firstName = answers['first-name'];
                        const lastName = answers['last-name'];
                        // if the first name, last name and role were submitted - add the employee
                        const text = 'INSERT INTO employees (first_name, last_name, role_id) VALUES ($1, $2, $3)'
                        const values = [`${firstName}`, `${lastName}`, `${roleID}`]

                        const res = pool.query(text, values);
                        console.log(res.rows);
                        });

            } else {
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