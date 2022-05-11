import fetch from 'node-fetch';
import mysql from "mysql";

/*
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "tzkt"
});


con.connect();
console.log("Connected!");
*/

const countRes = await fetch('https://api.tzkt.io/v1/accounts/count');
let count = await countRes.json();
console.log(count);

let limit = 100;
let offset = 0;

async function getInfos(offset) {
    const res = await fetch(`https://api.tzkt.io/v1/accounts?offset=${offset}&select=type,balance`);
    let info = await res.json();

    let properties;

    info.forEach(element => {
        properties = Object.keys(element).map((key) => element[key])
    });

    return properties;
}

console.log(await getInfos(0))


for (let i = 0; i < count / limit; i += limit) {
    console.log(await getInfos(i));
    console.log();
}

console.log();


