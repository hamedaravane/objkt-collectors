import mysql from "mysql";
import fetch from "node-fetch";

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "tzkt"
});

con.connect();

const res = await fetch('https://data.objkt.com/v2/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: `
            query MyQuery {
              holder(where: {address: {_eq: "tz1XSAPA44Pf5cD4nCmyUGfYnHswCu7o6QgJ"}}) {
                twitter
              }
            }
        `
    }),
})
let data = await res.json();
console.log(data.data.holder[0])
con.end();