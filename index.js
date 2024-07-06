// DEPENDENCIES
// dotenv
require('dotenv').config();
// inquirer
const inquirer = require('inquirer');
// pg/pool
const { Pool } = require('pg');
// console.table for 'prettier' tables (no index col)
const cTable = require('console.table');

// choices file
const choicesFile = require('./assets/js/choices');
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
// choices array
const choicesArray = choicesFile;

// ARRAY OF QUESTIONS FOR USER INPUT
const input = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: choicesArray.map(action => ({name: action.name, value: action})),
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

    
]

function init() {
    inquirer
        // ask the questions
        .prompt(input)
        .then((answers) => {
            const selectedAction = answers.action;
            if (selectedAction.query) {
                pool.query(selectedAction.query, (err,res) => {
                    if (err){
                        console.error(err);
                    } else {
                        console.table(res.rows);
                    }
                    pool.end();
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
}

// function call to initialize app
init();