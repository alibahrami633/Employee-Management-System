let connection = require("./util/connection.js");

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
                    }
                );
            });
    }

};

module.exports = department;