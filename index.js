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

const countRes = await fetch('https://api.tzkt.io/v1/accounts/count');
let count = await countRes.json();
console.log(count);

let limit = 10000;
let offset = 0;


async function getInfos(offset) {
    const res = await fetch(`https://api.tzkt.io/v1/accounts?type=user&offset=${offset}&select=type,address,publicKey,revealed,balance,counter,numContracts,activeTokensCount,tokenBalancesCount,tokenTransfersCount,numActivations,numDelegations,numOriginations,numTransactions,numReveals,numRegisterConstants,numSetDepositsLimits,numMigrations,firstActivity,firstActivityTime,lastActivity,lastActivityTime`);
    let info = await res.json();
    //console.log(Object.values(info))
    let propertyValues = [];

    for (let i = 0; i < limit; i++) {
        propertyValues.push(Object.values(info[i]));
    }

    return propertyValues;
}


for (let i = 0; i < count / limit; i += limit) {
    const sql = "INSERT INTO addressWallets (type,address,publicKey,revealed,balance,counter,numContracts,activeTokensCount,tokenBalancesCount,tokenTransfersCount,numActivations,numDelegations,numOriginations,numTransactions,numReveals,numRegisterConstants,numSetDepositsLimits,numMigrations,firstActivity,firstActivityTime,lastActivity,lastActivityTime) VALUES ?"
    console.log(await getInfos(i))
    let values = await getInfos(i);
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("100 record inserted");
        console.log(values)
    });
}
