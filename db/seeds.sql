INSERT INTO departments (name)
VALUES  ('Engineering'),
        ('Finance'),
        ('Human Resources'),
        ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Lead Engineer', 200000, 1),
        ('VP HR', 150000, 2),
        ('Financial Analyst', 80000, 3),
        ('Product Marketing Agent', 120000, 4),
        ('Associate Engineer', 100000, 1),
        ('HR Intern', 25000, 2);

INSERT INTO employees (first_name, last_name, role_id)
VALUES  ('Joe', 'Schmo', 1),
        ('Julia', 'Goolia', 2),
        ('Ringo', 'Starr', 3),
        ('Charles', 'Exavior', 4),
        ('Bingo', 'Heeler', 5),
        ('Orville', 'Redenbacher', 6);