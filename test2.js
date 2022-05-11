import fetch from 'node-fetch';

const countRes = await fetch('https://api.tzkt.io/v1/accounts/count');
let count = await countRes.json();
//console.log(count);

let limit = 100;
let offset = 0;


const res = await fetch(`https://api.tzkt.io/v1/accounts?type=user&offset=${offset}&select=type,address,balance`);
let info = await res.json();
let propertyValues = [];

for (let i = 0; i < 100; i++) {
    propertyValues.push(Object.values(info[i]));
}
console.log(propertyValues)


/*
for (let i = 0; i < 100; i++) {
    property.push(info[i])
}
*/

