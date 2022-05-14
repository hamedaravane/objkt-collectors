import fetch from 'node-fetch';
import mysql, {raw} from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
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
            resolve(results[0]);
        });
    });
}

function getAddress(id) {
    return new Promise((resolve, reject) => {
        let sql = 'SELECT address FROM accounts';
        return con.query(sql, (err, results) => {
            if (err) {
                return reject(err);
            }
            //console.log(results[id].address)
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
        return 'NULL'
    } else {
        return await data.data.holder[0].twitter;
    }
}

console.log()

for (let i = 681587; i >= 0; i--) {
    const sql = await `UPDATE accounts SET twitter = ${JSON.stringify(await getTwitter(await getAddress(i)))} WHERE address = ?`
    let address = await getAddress(i)
    await con.query(sql, [address], function (err, result) {
        if (err) throw err;
        console.log(`record ${i} UPDATED, address: ${address}`);
    });
}


con.end()