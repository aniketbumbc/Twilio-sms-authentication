const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const config =require('./config');
const client = require('twilio')(config.accountSID,config.authToken);

//login  phonenumber, channel(sms/call)


app.get('/login',(req, res)=>{
   client
   .verify
   .services(config.serviceID)
   .verifications
   .create({
       to: `+${req.query.phoneNumber}`,
       channel: req.query.channel
   })
   .then((data)=>{
       res.status(200).send(data);
   })
})
//verify ( phone number and code)


app.get('/verify',(req, res)=>{
    client
    .verify
    .services(config.serviceID)
    .verificationChecks
    .create({
        to: `+${req.query.phoneNumber}`,
        code: req.query.code
    })
    .then((data)=>{
        res.status(200).send(data);
    })
 })


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
