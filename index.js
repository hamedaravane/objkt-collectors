import fetch from 'node-fetch';


const countRes = await fetch('https://api.tzkt.io/v1/accounts/count');
let count = await countRes.json();
console.log(count);

let limit = 100;
let offset = 0;

const response = await fetch(`https://api.tzkt.io/v1/accounts?limit=${limit}&offset=${offset}`)
const data = await response.json();

async function getAddress(i) {
    return data[i].address;
}

for (offset; offset < count / limit; offset++) {
    let i = 0;
    while (i < 100) {
        console.log(await getAddress(i));
        i++;
    }
}