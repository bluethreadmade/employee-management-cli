-- view all departments
-- formatted table showing department names and department ids
SELECT department_name AS "Department Name", id AS "Department ID" FROM departments AS "Departments";

-- view all roles
-- job title, role id, the department that role belongs to, and the salary for that role
SELECT roles.title AS "Title", roles.id AS "Role ID", departments.department_name AS "Department Name", roles.salary AS "Salary" FROM roles INNER JOIN departments ON departments.id = roles.department_id;

-- view all employees
-- formatted table showing employee data, including employee ids, first names, last names, departments, job titles, salaries, and managers that the employees report to
SELECT employees.id AS "Employee ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", departments.department_name AS "Department", roles.title AS "Title", roles.salary AS "Salary", manager_id AS "Manager" FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON departments.id = roles.department_id;

-- add employee (first name, last name, role_id)
INSERT INTO employees (first_name, last_name, role_id) VALUES  ('Blinked', 'Banged', 'Lead Engineer');

-- add department (department name)
INSERT INTO departments (department_name) VALUES ('Testing');

-- list of roles only
SELECT title AS "Title", id AS "ID" FROM roles;

-- view all employees simple
SELECT employees.id AS "Employee ID", employees.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Title" FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON departments.id = roles.department_id;

-- update employee role, use getEmployees to select employees.id from list and getRoles to select role from list, 
UPDATE employees SET role_id = '4' WHERE employees.id = '3';

SELECT * FROM departments;
SELECT * FROM roles;
-- SELECT * FROM employees;

DELETE FROM employees WHERE employees.id = '3';