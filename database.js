
let pool;
async function main(){
    const mysql = await require('mysql2');
    pool = await mysql.createPool({
        host : process.env.mysql_host,
        user : process.env.mysql_user,
        password : process.env.mysql_password,
        database : process.env.mysql_database
    }).promise();
}

main();

module.exports.count = async()=>{
    const [e_count] = await pool.query(
        `SELECT 
        COUNT(e.emp_no) AS emp_count
    FROM
        employees e
            JOIN
        dept_emp de ON e.emp_no = de.emp_no
            JOIN
        departments d ON d.dept_no = de.dept_no
            JOIN
        salaries s ON s.emp_no = e.emp_no
            AND de.to_date = s.to_date
            JOIN
        titles t ON t.emp_no = e.emp_no
            AND de.to_date = t.to_date
            AND t.to_date > SYSDATE();`
    );

    const [m_count] = await pool.query(
        `select count(emp_no) as man_count from dept_manager`
    );

    const result = {
        eCount : e_count[0].emp_count,
        mCount : m_count[0].man_count
    }
    return result;
}