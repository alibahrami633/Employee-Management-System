const inquirer = require("inquirer");

const employeeObj = require("./util/employee");
const departmentObj = require("./util/department");
const roleObj = require("./util/role");
const clear = require("clear");

require("console.table");

// clear();
init();

function init() {
    inquirer
        .prompt({
            name: "menu",
            type: "rawlist",
            message: "\n\nYour options:\n\n",
            choices: [
                "View All Employees",
                "View All Departments",
                "View All Roles",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "Remove Employee",
                "Remove Role",
                "Remove Department",
                "Exit",
            ],
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "View All Employees":
                    employeeObj.viewEmployees();
                    init();
                    break;

                case "View All Departments":
                    departmentObj.viewDepartments();
                    init();
                    break;

                case "View All Roles":
                    roleObj.viewRoles();
                    init();
                    break;

                case "Add Department":
                    departmentObj.addDepartment();
                    init();
                    break;

                case "Add Role":
                    roleObj.addRole();
                    init();
                    break;

                case "Add Employee":
                    employeeObj.addEmployee();
                    init();
                    break;

                case "Update Employee Role":
                    employeeObj.updateEmployeeRole();
                    init();
                    break;

                case "Remove Employee":
                    employeeObj.removeEmployee();
                    init();
                    break;

                case "Remove Role":
                    roleObj.removeRole();
                    init();
                    break;

                case "Remove Department":
                    departmentObj.removeDepartment();
                    init();
                    break;

                case "Exit":
                    process.exit(0);
                    break;
            }
        });
}

