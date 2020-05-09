const inquirer = require("inquirer");
const cTable = require("console.table");

const employeeObj = require("./util/employee");
const departmentObj = require("./util/department");
const roleObj = require("./util/role");



init();

function init() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "==============================\n       Your options:\n==============================",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "View All Employees by Department",
                "View All Employees by Manager",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Remove Employee",
                "Remove Role",
                "Remove Department",
                "Update Employee Manager",
                "View Total Utilized Budget of a Department",
                "Exit",
            ],
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "View All Employees":
                    employeeObj.viewEmployees();
                    break;

                case "View All Departments":
                    departmentObj.viewDepartments();
                    break;

                case "View All Roles":
                    roleObj.viewRoles();
                    break;

                case "Add Department":
                    departmentObj.addDepartment();
                    break;

                case "Add Role":
                    roleObj.addRole();
                    break;

                case "Add Employee":
                    employeeObj.addEmployee();
                    break;

                case "Update Employee Role":
                    employeeObj.updateEmployeeRole();
                    break;

                case "Remove Employee":
                    employeeObj.removeEmployee();
                    break;

                case "Remove Role":
                    roleObj.removeRole();
                    break;

                case "Remove Department":
                    departmentObj.removeDepartment();
                    break;

                case "Exit":
                    if (connection) {
                        connection.end();
                        process.exit(0);
                    }
                    break;
            }
        });
}

