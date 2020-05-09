let connection = require("./util/connection.js");

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
    }
};

module.exports = employee;