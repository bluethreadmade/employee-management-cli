// DEPENDENCIES
// inquirer
const inquirer = require('inquirer');
// pg
// choices array
const choices = require('./assets/js/choices');

// DATA
// FUNCTIONS
// set variable to use choices array as the choices array
const choices = choices;

// ARRAY OF QUESTIONS FOR USER INPUT
const input = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: choices.map(action => ({name: action.name, value: action})),
    }    
            // What is the employees first name?
            // What is the employees last name?
            // What is the employees role? (choice)
            // Who is the employees manager? (choice, including none)
        
            // Which employee's role would you like to update? (choice)
            // Which role do you want to assign to the selected employee? (choice)


        
            // What is the name of the role?
            // What is the salary of the role?
            // Which department does the role belong to? (choice)
        
            // What is the name of the department?

    
]

function init() {
    // ask the questions
    inquirer
        .prompt(input)
}

// function call to initialize app
init();