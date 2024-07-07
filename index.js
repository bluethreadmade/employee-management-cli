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

function getRoles() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT title AS "name", id AS "value" FROM roles;', (err, res) => {
            if (err) {
                console.error(err);
                reject.err;
            } else {
                console.log(res.rows);
                resolve(res.rows);
            }
            pool.end();
        });
    });
};

async function init() {
    try {
        // get the roles
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
                        choices: rolesArray.map(roles => ({name: roles.name, value: roles}))
                    },
                    // add an employee will be async 
                    // Who is the employees manager? (choice, including none)
                ])
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
        console.error(error);
        pool.end();
    }
};

// function call to initialize app
init();