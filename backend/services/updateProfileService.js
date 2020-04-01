var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')
const multer = require('multer');
const path = require('path');
const fs = require('fs');






router.post('/updateProfile', function (req, res) {

    console.log("\nInside updateProfile Request Handler");


    kafka.make_request('updateProfile', req.body, async function (err, result) {
        if (err) {
            res.code = "400";
            res.value = "Something went wrong!";
            console.log(res.value);
            res.sendStatus(400).end();
        } else {
            console.log("Profile Successfully updated")
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            let data = {
                status: 1,
                msg: "Successfully updated",
            }
            res.end(JSON.stringify(data));


        }
    })



















   



});













module.exports = router;