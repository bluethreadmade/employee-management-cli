-- view all departments
-- formatted table showing department names and department ids
SELECT name AS "Department Name", id AS "Department ID" FROM departments;

-- view all roles
-- job title, role id, the department that role belongs to, and the salary for that role
SELECT title, id AS "Role ID", department_id FROM roles;

-- view all employees
-- formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
SELECT * FROM employees;



