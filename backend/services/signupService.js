var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')



router.post('/signup', (req, res) => {
    console.log("\nIn signup request");
    let information = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        type: req.body.type,
        email: req.body.email,
        profileImage: "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.3/bce/brand/misc/default-profile-pic.png",
    }
    console.log(`request payload: ${information}`)
    kafka.make_request('signup', req.body, async function (err, result) {
        if (err) {
            res.code = "400";
            res.value = "Something went wrong!";
            console.log(res.value);
            res.sendStatus(400).end();
        } else {

            // console.log("Login successful. User authenticated!")
            if (result.status == "1") {
                // res.cookie('cookie', "admin", { maxAge: 60 * 60 * 1000, httpOnly: false, path: '/' });
                var token = jwt.sign({ email: req.body.email }, config.secret, {
                    expiresIn: 60 * 60 * 1000 // in seconds
                });
                let test = {
                    uid: result.info.uid,
                    email: result.info.email,
                    firstname: result.info.firstname,
                    lastname: result.info.lastname,
                    profileImage: information.profileImage,
                    type: result.info.type,
                    token: 'JWT ' + token,

                }
                let data={
                    status:1,
                    info:test,
                    msg:"Successful"
                }

                // result.info.token =
                // result.profileImage = information.profileImage
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })

                res.end(JSON.stringify(data));
            } else {

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                console.log(result.msg)
                res.end(JSON.stringify(result));
            }

        }
    })


})

module.exports = router;