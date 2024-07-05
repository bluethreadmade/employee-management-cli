-- view all departments
-- formatted table showing department names and department ids
SELECT department_name AS "Department Name", id AS "Department ID" FROM departments AS "Departments";

-- view all roles
-- job title, role id, the department that role belongs to, and the salary for that role
SELECT roles.title AS "Title", roles.id AS "Role ID", departments.department_name AS "Department Name", roles.salary AS "Salary" FROM roles INNER JOIN departments ON departments.id = roles.department_id;

-- view all employees
-- formatted table showing employee data, including employee ids, first names, last names, , departments, job titles, salaries, and managers that the employees report to
SELECT id, first_name AS "First Name", last_name AS "Last Name" FROM employees AS "Employees";

SELECT employees.id, employees.first_name, employees.last_name, departments.department_name, roles.title, roles.salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON departments.id = roles.department_id;

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;