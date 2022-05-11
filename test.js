import fetch from 'node-fetch';

const countRes = await fetch('https://api.tzkt.io/v1/accounts/count');
let count = await countRes.json();
console.log(count);

let limit = 100;
let offset = 0;

async function getInfos(offset) {
    const res = await fetch(`https://api.tzkt.io/v1/accounts?type=user&offset=${offset}&select=type,address,balance`);
    let info = await res.json();
    console.log(Object.values(info))
    let propertyValues = [];

    for (let i = 0; i < 100; i++) {
        propertyValues.push(Object.values(info[i]));
    }

    return propertyValues;
}


for (let i = 0; i < count / limit; i += limit) {
    console.log(await getInfos(i));
    console.log();
}

console.log();


