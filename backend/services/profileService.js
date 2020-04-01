
var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')



router.get('/profile/:id', function (req, res) {
    console.log("\n Inside get user profile");
    console.log(req.params.id)

    kafka.make_request('profile', req.params.id, async function (err, result) {
        if (err) {
            res.code = "400";
            res.value = "Something went wrong!";
            console.log(res.value);
            res.sendStatus(400).end();
        } else {
            if (result.status == 1) {
                console.log("User found")
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                let user=result.info
                try {
                    if (user.image) {
                        let newFileFormat = await imageProcess.changeFormat(user.image)
                        user.profileImage = newFileFormat
                        data = {
                            status: 1,
                            msg: "Successful login",
                            info: user
                        }
                        res.end(JSON.stringify(data));
                    } else {
                        data = {
                            status: 1,
                            msg: "Successful login",
                            info: user
                        }
                        res.end(JSON.stringify(data));
                    }
                } catch (error) {
                    console.error("Error in file conversion")
                    console.error(error)
                    let data = {
                        status: -1,
                        msg: "Error in file conversion"
                    }
                    res.end(JSON.stringify(data));
                }
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                data = {
                    status: -1,
                    msg: "User not found"
                }
                res.end(JSON.stringify(data));
            }



        }
    })







})








module.exports = router;