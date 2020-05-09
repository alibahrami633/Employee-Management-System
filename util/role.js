let connection = require("./util/connection.js");
const inquirer = require("inquirer");

const selectRolesQuery = "SELECT * FROM role";

const role = {

    viewRoles() {
        connection.query(
            "SELECT id as Role_Id,role_title as Role_Title,salary as Salary,department_id as Department_ID FROM role",
            function (err, res) {
                if (err) throw err;
                console.table(`\n`, res);
            }
        );
    },

    addRole() {
        connection.query("SELECT * FROM department", (err, departments) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "title",
                        type: "input",
                        message: "Role Name:",
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "Salary:",
                    },
                    {
                        name: "department",
                        type: "rawlist",
                        choices: () => {
                            return (departmentList = departments.filter(
                                (department) => department.name
                            ));
                        },
                        message: "Select the department for the new role:",
                    },
                ])
                .then((response) => {
                    let depID;
                    departments.forEach((department) => (department.name === response.department) ? (depID = department.id) : null);
                    connection.query("INSERT INTO role SET ?",
                        {
                            role_title: response.title,
                            salary: response.salary,
                            department_id: depID,
                        },
                        (err) => {
                            if (err) throw err;
                            console.log("\nThe new role was created successfully.\n");
                        }
                    );
                });
        });
    },

    removeRole() {
        connection.query(selectRolesQuery, function (err, role) {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "getRole",
                        type: "rawlist",
                        choices: () => {
                            var roleList = [];
                            role.forEach((role) => roleList.push(role.role_title));
                            return roleList;
                        },
                        message: "Select a role to remove:",
                    },
                ])
                .then((response) => {
                    let roleId;
                    role.forEach(
                        (role) => (role.role_title === response.getRole) ? (roleId = role.id) : null
                    );
                    connection.query(
                        "Delete from role WHERE ?",
                        [
                            {
                                id: roleId,
                            },
                        ],
                        function (err) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("\nThe selected role was removed.\n");
                            }
                        }
                    );
                });
        });
    }
};

module.exports = role;