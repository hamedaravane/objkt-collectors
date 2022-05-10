import fetch from 'node-fetch';
import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12341234",
    database: "tzkt"
});

con.connect();
console.log("Connected!");

const countRes = await fetch('https://api.tzkt.io/v1/accounts/count');
let count = await countRes.json();
console.log(count);

let limit = 100;
let offset = 0;


async function getAddress(i, offset) {
    const response = await fetch(`https://api.tzkt.io/v1/accounts?select=address&offset=${offset}`)
    const data = await response.json();
    return data[i];
}


for (offset; offset < count; offset += limit) {
    console.log("offset is:" + offset)
    let i = 0;
    while (i < limit) {
        const sql = "INSERT INTO addressWallets (address) VALUES?";
        let values = [[await getAddress(i, offset)]];
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
        console.log(await getAddress(i, offset));
        i++;
        console.log("offset is:" + offset);
    }
}
