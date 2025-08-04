import arcjet, {tokenBucket, shield, detectBot}  from "@arcjet/node"
import "dotenv/config";

//initialize arcjet

export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"], //to keep track of request through ip
    rules:[
        //shield protects our app from comon attacks e.g. SQL injection, XSS, CSRF attacks
        shield({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",//block all bots except search engine
            allow:[
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        //RATE LIMITING
        tokenBucket({
            mode:"LIVE",
            refillRate: 30, 
            interval: 5, //in seconds
            capacity: 10,  //tockens
        })
    ]
})