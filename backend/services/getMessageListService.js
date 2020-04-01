var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')
const multer = require('multer');
const path = require('path');
const fs = require('fs');





router.get('/getMessageList/:id', function (req, res) {
    console.log("\nInside get messages Request Handler");

    // console.log(req.body)
    let data = req.params.id;
    console.log(data)

    kafka.make_request('getMessageList', req.params.id, function (err, result) {
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
            let finalArray=[];
            
            result.info.forEach(element => {
                finalArray.push(element.conversation)
            });
            let data = {
                status: 1,
                msg: "Successfully added",
                info: finalArray
            }
            res.end(JSON.stringify(data));


        }
    })


});















module.exports = router;