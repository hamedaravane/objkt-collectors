import fetch from 'node-fetch';
import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "tzkt"
});

con.connect();
console.log("Connected!");

async function getAddress(id) {
    let address = 'tz1cCrgX1bTCdvffctrUTnPjTmXrhGR1dGSE';

    await con.query("SELECT * FROM accounts", function (err, result, fields) {
        //console.log(result[id].address)
        return address;
    })}

async function getTwitter(address) {
    let twitterLink = '';
    const res = await fetch('https://data.objkt.com/v2/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query MyQuery {
                holder(where: {address: {_eq: ${address}}}) {
                    twitter
                }
            }
        `
        }),
    })

    let data = await res.json();

    if (await data.data.holder[0].twitter !== undefined) {

        twitterLink = await data.data.holder[0].twitter
    }
    return twitterLink;
}

console.log(await getAddress(2))
console.log(await getTwitter('tz2JcHza2vbDmL5RCkddNoppGDBZ8eS8Sr8Y'))
console.log(await getTwitter(`${await getAddress(14)}`))

// for (let i = 1; i < 100; i++) {
//     const sql = await `UPDATE accounts SET twitter = ${getTwitter(getAddress(i))} WHERE id = &{i}`
//
//     await con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("record UPDATE");
//     });
// }
//
