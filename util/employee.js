let connection = require("./connection");
const inquirer = require("inquirer");

const selectEmployeeQuery = "SELECT * FROM employee";
const selectRolesQuery = "SELECT * FROM role";

const employee = {
    viewEmployees() {
        connection.query(
            `SELECT e.id as Employee_ID,e.first_name as First_Name,e.last_name as Last_Name,
           role.role_title as Role_Title,
           department.name as Department,
           role.salary as Salary,
           CONCAT(m.first_name," ",m.last_name) as Manager
           FROM employeedb.employee e
           left join employeedb.employee m on m.id = e.manager_id
           join role on role.id=e.role_id
           join department on role.department_id=department.id
           order by e.id asc`,
            function (err, res) {
                if (err) throw err;
                console.table(`\n`, res);
            }
        );
    },

    addEmployee() {
        connection.query(selectRolesQuery, (err, roles) => {
            if (err) throw err;

            let managerList = [];
            connection.query(selectEmployeeQuery, (err, employees) => {
                if (err) throw err;
                employees.forEach((emp) =>
                    managerList.push(emp.first_name + " " + emp.last_name)
                );
            });

            inquirer
                .prompt([
                    {
                        name: "firstName",
                        type: "input",
                        message: "First Name:",
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "Last Name:",
                    },
                    {
                        name: "role",
                        type: "rawlist",
                        choices: () => {
                            let roleList = [];
                            roles.forEach((role) => roleList.push(role.role_title));
                            return roleList;
                        },
                        message: "Select the employee's role:",
                    },
                    {
                        name: "manager",
                        type: "rawlist",
                        choices: managerList,
                        message: "Select the manager:",
                    },
                ])
                .then((response) => {
                    let roleId;
                    roles.forEach((role) =>
                        role.role_title === response.role ? (roleId = role.id) : null);

                    connection.query(selectEmployeeQuery, (err, emp) => {
                        let managerId;
                        if (err) throw err;
                        emp.forEach((emp) =>
                            (emp.first_name + " " + emp.last_name === response.manager) ? (managerId = emp.id) : null);
                        connection.query(
                            "INSERT INTO employee SET ?",
                            {
                                first_name: response.firstName,
                                last_name: response.lastName,
                                role_id: roleId,
                                manager_id: managerId,
                            },
                            function (err) {
                                if (err) throw err;
                            }
                        );
                        console.log("\nThe new employee was added.\n");
                    });
                });
        });
    },

    updateEmployeeRole() {
        connection.query(selectEmployeeQuery, (err, emp) => {
            if (err) throw err;
            let roleList = [];
            connection.query(selectRolesQuery, function (err, role) {
                if (err) throw err;
                role.forEach((role) => roleList.push(role.role_title));
            });

            inquirer
                .prompt([
                    {
                        name: "getEmployee",
                        type: "rawlist",
                        choices: () => {
                            var empList = [];
                            emp.forEach((employee) =>
                                empList.push(employee.first_name + " " + employee.last_name)
                            );
                            return empList;
                        },
                        message: "Which employee's role do you want to change?:",
                    },
                    {
                        name: "role",
                        type: "rawlist",
                        choices: roleList,
                        message: "Please select new role:",
                    },
                ])
                .then((response) => {
                    let empId;
                    emp.forEach((emp) =>
                        emp.first_name + " " + emp.last_name === response.getEmployee
                            ? (empId = emp.id)
                            : null
                    );
                    connection.query(selectRolesQuery, (err, role) => {
                        let roleId;
                        if (err) throw err;
                        role.forEach((role) =>
                            role.role_title === response.role ? (roleId = role.id) : null
                        );
                        connection.query(
                            "UPDATE employee SET ? WHERE ?",
                            [
                                {
                                    role_id: roleId,
                                },
                                {
                                    id: empId,
                                },
                            ],
                            (err) => {
                                if (err) throw err;
                                console.log("\nRole was updated successfully.\n");
                            }
                        );
                    });
                });
        });
    },

    removeEmployee() {
        connection.query(selectEmployeeQuery, (err, emp) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "getEmployee",
                        type: "rawlist",
                        choices: () => {
                            let empList = [];
                            emp.forEach((employee) =>
                                empList.push(employee.first_name + " " + employee.last_name)
                            );
                            return empList;
                        },
                        message: "Select the employee to remove:",
                    },
                ])
                .then((response) => {
                    let empId;
                    emp.forEach((emp) =>
                        emp.first_name + " " + emp.last_name === response.getEmployee ? (empId = emp.id) : null);
                    connection.query(
                        "Delete from employee WHERE ?",
                        [
                            {
                                id: empId,
                            },
                        ],
                        (err) => {
                            if (err) throw err;
                            console.log("\nThe employee was removed.\n");
                        }
                    );
                });
        });
    }

};

module.exports = employee;