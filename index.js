const inquirer = require("inquirer");
const cTable = require("console.table");

let connection = require("./util/connection.js");

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
                    viewEmployees();
                    break;

                case "View All Departments":
                    viewDepartments();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployeeRole();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Manager":
                    updateEmployeeManager();
                    break;

                case "View All Employees by Department":
                    viewEmployeesByDepartment();
                    break;

                case "View All Employees by Manager":
                    viewEmployeesByManager();
                    break;

                case "View Total Utilized Budget of a Department":
                    viewTotalUtilizedBudget();
                    break;

                case "Remove Role":
                    removeRole();
                    break;

                case "Remove Department":
                    removeDepartment();
                    break;

                case "Exit":
                    connection.end();
                    process.exit(0);
                    break;
            }
        });
}

