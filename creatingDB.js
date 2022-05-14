import mysql from "mysql";

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "tzkt"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "CREATE TABLE accounts (id INT NOT NULL AUTO_INCREMENT, type VARCHAR(255),address VARCHAR(255),twitter VARCHAR(255),publicKey VARCHAR(255),revealed TINYINT(1),balance BIGINT(255),counter INT(255),numContracts INT(255),activeTokensCount INT(255),tokenBalancesCount INT(255),tokenTransfersCount INT(255),numActivations INT(255),numDelegations INT(255),numOriginations INT(255),numTransactions INT(255),numReveals INT(255),numRegisterConstants INT(255),numSetDepositsLimits INT(255),numMigrations INT(255),firstActivity VARCHAR(255),firstActivityTime VARCHAR(255),lastActivity VARCHAR(255),lastActivityTime VARCHAR(255),PRIMARY KEY (id))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});
con.end();