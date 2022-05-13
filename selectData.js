import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12341234",
    database: "tzkt"
});

con.connect();

function get_info(data, callback){

    let sql = "SELECT * FROM accounts";

    con.query(sql, function(err, results){
        if (err){
            throw err;
        }
        console.log(results[0].address); // good
        stuff_i_want = results[0].address;  // Scope is larger than function

        return callback(results[0].address);
    })
}


//usage

let stuff_i_want = '';

get_info(1, function(result){
    stuff_i_want = result;

    //rest of your code goes in here
});