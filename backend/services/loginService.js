var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')



router.post('/login', (req, res) => {
    console.log("\nIn login request");
    console.log(`email: ${req.body.email}, password: ${req.body.password} `)
    kafka.make_request('login', req.body, async function (err, result) {
        if (err) {
            res.code = "400";
            res.value = "Something went wrong!";
            console.log(res.value);
            res.sendStatus(400).end();
        } else {

            // console.log("Login successful. User authenticated!")
            if (result.status == "1") {
                res.cookie('cookie', "admin", { maxAge: 60 * 60 * 1000, httpOnly: false, path: '/' });
                var token = jwt.sign({ email: req.body.email }, config.secret, {
                    expiresIn: 60 * 60 * 1000 // in seconds
                });
                result.info.token = 'JWT ' + token
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                if (result.info.images) {
                    try {
                        let newFileFormat = await imageProcess.changeFormat(result.info.images)
                        result.info.profileImage = newFileFormat
                        data = {
                            status: 1,
                            msg: "Successful login",
                            info: result.info
                        }
                        res.end(JSON.stringify(data));
                    } catch (error) {
                        let data = {
                            status: -1,
                            msg: "Error in file conversion"
                        }
                        res.end(JSON.stringify(data));
                    }

                    res.end(JSON.stringify(result));

                } else {
                    console.log("no result found!")
                    console.log(result)
                    res.end(JSON.stringify(result));

                }
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