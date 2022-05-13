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

function countRecords() {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT COUNT(*) FROM accounts';
        return con.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

let records = await countRecords();
console.log(records);

function getAddress(id) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT address FROM accounts';
        return con.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[id].address);
        });
    });
}


async function getTwitter(address) {
    const res = await fetch('https://data.objkt.com/v2/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query MyQuery {
              holder(where: {address: {_eq: "${address}"}}) {
                twitter
              }
            }
        `
        }),
    })
    let data = await res.json();
    if (data.data.holder[0] === undefined) {
        return '-'
    }
    return await data.data.holder[0].twitter;
}

// console.log(await getAddress(87))
//console.log(typeof await getAddress(1))
// console.log(await getTwitter('tz1SG2YfQcMERXZC35A46r4d5tFiKFZFFWCr'))
// let data = await getAddress(23);
// console.log(await getTwitter(await data))

for (let i = 0; i < 1000; i++) {
    console.log(await getAddress(i))
    console.log(await getTwitter(await getAddress(i)))
}


// for (let i = 1; i < 100; i++) {
//     const sql = await `UPDATE accounts SET twitter = ${getTwitter(getAddress(i))} WHERE id = &{i}`
//
//     await con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("record UPDATE");
//     });
// }
//

con.end()