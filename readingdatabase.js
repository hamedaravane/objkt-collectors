import mysql from "mysql";

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "tzkt"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM accounts", function (err, result, fields) {
        if (err) throw err;
        console.log(result[0].address);
    });
});