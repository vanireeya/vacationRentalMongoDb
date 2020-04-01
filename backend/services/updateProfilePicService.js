var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')
const multer = require('multer');
const path = require('path');
const fs = require('fs');





router.post('/updateProfilePic', function (req, res) {
    console.log("\n In update profile pic")
    // console.log(req.body.uid)


    imageProcess.upload(req, res, function (err, result) {


        let filename = req.files[0].filename
        let data = {
            filename: filename,
            uid: req.body.uid
        };


// if(result){}



        kafka.make_request('updateProfilePic', data, async function (err, result) {
            if (err) {
                res.code = "400";
                res.value = "Something went wrong!";
                console.log(res.value);
                res.sendStatus(400).end();
            } else {
                console.log("Profile Pic Successfully updated")
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                try {
                    let newFileFormat = await imageProcess.changeFormat(filename)
                    data = {
                        status: 1,
                        msg: "Successfully updated",
                        info: {
                            fileName: newFileFormat
                        }
                    }
                    res.end(JSON.stringify(data));
                } catch (error) {
                    let data = {
                        status: -1,
                        msg: "Error in file conversion"
                    }
                    res.end(JSON.stringify(data));
                }

            }
        })






       





    });
});





















module.exports = router;