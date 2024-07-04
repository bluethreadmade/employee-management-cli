// DEPENDENCIES
// inquirer
const inquirer = require('inquirer');
// pg

// DATA
// FUNCTIONS
// USER INTERACTIONS

// ARRAY OF QUESTIONS FOR USER INPUT
const input = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Roles',
                    'View All Roles',
                    'Add Roles',
                    'View All Departments',
                    'Add Departments',
                    'Quit'
                ]
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