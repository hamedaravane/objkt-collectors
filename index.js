import fetch from 'node-fetch';
import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "tzkt"
});
/*
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    const sql = "INSERT INTO customers (id, address) VALUES ('Company Inc', 'Highway 37')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});
*/

const countRes = await fetch('https://api.tzkt.io/v1/accounts/count');
let count = await countRes.json();
console.log(count);

let limit = 100;
let offset = 0;


async function getAddress(i) {
    const response = await fetch(`https://api.tzkt.io/v1/accounts?select=address,balance&limit=${limit}&offset=${offset}`)
    const data = await response.json();
    return data[i];
}


for (offset; offset < count; offset += limit) {
    console.log("offset is:" + offset)
    let i = 0;
    while (i < limit) {
        console.log(await getAddress(i));
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "INSERT INTO addresses (id, address) VALUES ?";
            var values = [0,'salam'];
            con.query(sql, [values], function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        });
        i++;
    }
    console.log(offset);
}
