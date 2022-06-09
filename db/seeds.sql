INSERT INTO department (dept_name)
VALUES ("SALES"),
("ECONOMISTS"),
("PUBLIC POLICY");

INSERT INTO job_role (title, salary, department_id)
VALUES ("Manager of Sales", 300000, 1),
("VP of Sales", 200000, 1),
("Chief Economist", 275000, 2),
("Economist", 225000, 2),
("Policy Manager", 200000, 3),
("Lobbyist", 175000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Saylor", 1, null),
("Samson", "Mow", 2, 1),
("Greg", "Foss", 3, null),
("Dylan", "LeClair", 4, 3),
("David", "Zell", 5, null),
("Nic", "Carter", 6, 5);