INSERT INTO department (dept_name)
VALUES ("SALES"),
("ECONOMISTS"),
("PUBLIC POLICY");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager of Sales", 300000, 1),
("VP of Sales", 200000, 1),
("Chief Economist", 275000, 2),
("Economist", 225000, 2),
("Policy Manager", 200000, 3),
("Lobbyist", 175000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Michael", "Saylor", 1),
("Samson", "Mow", 2),
("Greg", "Foss", 3),
("Dylan", "LeClair", 4),
("David", "Zell", 5),
("Nic", "Carter", 6)