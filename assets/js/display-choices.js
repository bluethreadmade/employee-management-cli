const displayChoices = [
    {   
        name: 'View All Employees',
        query: 'SELECT employees.id AS "Employee ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", departments.department_name AS "Department", roles.title AS "Title", roles.salary AS "Salary" FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON departments.id = roles.department_id;',
    },
    {   
        name: 'Add Employee',
        query: '',
    },
    {   
        name: 'Update Employee Roles',
        query: '',
    },
    {   
        name: 'View All Roles',
        query: 'SELECT roles.title AS "Title", roles.id AS "Role ID", departments.department_name AS "Department Name", roles.salary AS "Salary" FROM roles INNER JOIN departments ON departments.id = roles.department_id;',
    },
    {   
        name: 'Add Role',
        query: '',
    },
    {   
        name: 'View All Departments',
        query: 'SELECT department_name AS "Department Name", id AS "Department ID" FROM departments AS "Departments";',
    },
    {   
        name: 'Add Departments',
        query: '',
    },
    {   
        name: 'Quit',
        query: '',
    },
]

module.exports = displayChoices;