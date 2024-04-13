// 
// require("dotenv").config()
// const client = createClient({
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//         host: process.env.REDIS_HOST,
//         port: process.env.REDIS_PORT
//     }
// })

// 
const { createClient } = require('redis');

const client = createClient({
    password: 'MdHmvzkrJ7YRkLEB75nlHWKf2zdfQoBc',
    socket: {
        host: 'redis-18160.c274.us-east-1-3.ec2.cloud.redislabs.com',
        port: 18160
    }
});
if(!client.isOpen){
    client.connect()
    console.log('connected to redis');
}
module.exports= {client}