DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;

-- DEPARTMENT --
create table department(
    id int not null auto_increment,
	name varchar(20),
    primary key(id)
);

insert into department(name)
values ("Sales"),("Finance"),("Contracts"),("Communication");

-- ROLE --
create table role(
	id int auto_increment not null,
    role_title varchar(20),
    salary decimal(10,2),
    department_id int,
    foreign key(department_id) references department(id) ON DELETE CASCADE,
    primary key(id)
);


insert into role(role_title,salary,department_id)
values("Manager",200000.00,1),("Programmer",100000.00,2),("front-end",70000.00,3),
("back-end",60000.00,4);
 
-- EMPLOYEE -- 
create table employee(
	id int not null auto_increment,
    first_name varchar(20),
    last_name varchar(20),
    role_id int,
    manager_id int default null,
    foreign key(role_id) references role(id) ON DELETE CASCADE,
    foreign key(manager_id) references employee(id) ON DELETE CASCADE,
    primary key(id)
);

insert into employee(first_name,last_name,role_id,manager_id)
values ("John","Smith",1,null),("Jane","Doe",2,1),("Mr","Nobody",3,1),("James","Bond",4,1);