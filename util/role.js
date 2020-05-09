let connection = require("./util/connection.js");

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
    }
};

module.exports = role;