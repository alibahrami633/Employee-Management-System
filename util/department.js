let connection = require("./connection.js");
const inquirer = require("inquirer");
const selectDeparmentsQuery = "SELECT * FROM department";

const department = {

    viewDepartments() {
        connection.query(
            "SELECT id as Department_Id, name as Department_Name FROM department",
            function (err, res) {
                if (err) throw err;
                console.table(`\n`, res);
            }
        );
    },

    addDepartment() {
        inquirer
            .prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Department Name:",
                },
            ])
            .then((res) => {
                connection.query(
                    "INSERT INTO department SET ?",
                    {
                        name: res.name,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log("\nDepartment was created successfully!\n");
                        return;
                    }
                );
            });
    },

    removeDepartment() {
        connection.query(selectDeparmentsQuery, (err, dep) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "getDepartment",
                        type: "rawlist",
                        choices: () => {
                            let departmentList = [];
                            dep.forEach((department) => departmentList.push(department.name));
                            return departmentList;
                        },
                        message: "Select the department to remove:",
                    },
                ])
                .then((response) => {
                    let departmentId;
                    dep.forEach(
                        (department) => (department.name === response.getDepartment) ? (departmentId = department.id) : null
                    );
                    connection.query(
                        "Delete from department WHERE ?",
                        [
                            {
                                id: departmentId,
                            },
                        ],
                        (err) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log("\nThe department was removed.\n");
                            }
                        }
                    );
                });
        });
    }

};

module.exports = department;