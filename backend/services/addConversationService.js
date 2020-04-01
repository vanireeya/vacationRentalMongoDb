var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')
const multer = require('multer');
const path = require('path');
const fs = require('fs');





router.post('/addConversation', function (req, res) {
    console.log("\nInside add conversation Request Handler");

    // console.log(req.body)
    let data = req.body;
    console.log(data)

    kafka.make_request('addConversation', req.body,  function (err, result) {
        if (err) {
            res.code = "400";
            res.value = "Something went wrong!";
            console.log("ksfhfgklkaskflkhfjklhseruff");
            res.sendStatus(400).end();
        } else {
            console.log(result)
            console.log("conversation added Successfully ")
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            let data = {
                status: 1,
                msg: "Successfully added",
            }
            res.end(JSON.stringify(data));


        }
    })


});















module.exports = router;