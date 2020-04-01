var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')
const multer = require('multer');
const path = require('path');
const fs = require('fs');





router.post('/addMessage', function (req, res) {
    // console.log(req);
    // console.log(req.session)
    // console.log(req.body)
    console.log("\nInside book property Request Handler");

    console.log(req.body.property)


  
    kafka.make_request('addMessage', req.body, async function (err, result) {
        if (err) {
            res.code = "400";
            res.value = "Something went wrong!";
            console.log(res.value);
            res.sendStatus(400).end();
        } else {
            console.log("Property booked Successfully ")
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            let data = {
                status: 1,
                msg: "Successfully booked",
            }
            res.end(JSON.stringify(data));


        }
    })










});















module.exports = router;