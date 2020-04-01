var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')
const multer = require('multer');
const path = require('path');
const fs = require('fs');





router.post('/book_property', function (req, res) {
    // console.log(req);
    // console.log(req.session)
    // console.log(req.body)
    console.log("\nInside book property Request Handler");

    console.log(req.body.property)


  
    kafka.make_request('book_property', req.body, async function (err, result) {
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

    // userinfos.updateOne(
    //     { email: req.body.email },
    //     {
    //         $push: {
    //             pastPropertyList: req.body.property

    //         }
    //     },
    //     { upsert: true },
    //     function (err, result) {
    //         if (err) {
    //             res.code = "400";
    //             res.value = "Something went wrong!";
    //             console.log(res.value);
    //             console.log(err);
    //             res.sendStatus(400).end();
    //         } else {
    //             // console.log(result)
    //             if (req.body.property && req.body.property.ownderId) {

    //                 userinfos.updateOne(
    //                     {
    //                         $and: [{ _id: req.body.property.ownderId },
    //                         { 'propertyList.street': req.body.property.street }]
    //                     },
    //                     {
    //                         $push: {
    //                             'propertyList.$.booked': req.body.property.booked
    //                         }
    //                     },
    //                     { upsert: true },
    //                     function (err1, result1) {
    //                         if (err1) {
    //                             res.code = "400";
    //                             res.value = "Something went wrong!";
    //                             console.log(res.value);
    //                             console.log(err1);
    //                             res.sendStatus(400).end();
    //                         } else {
    //                             // console.log(result1)
    //                             let data = {
    //                                 status: 1,
    //                                 msg: "Successfully booked",
    //                                 // info: information
    //                             }
    //                             console.log("successfully booked the property")
    //                             res.end(JSON.stringify(data));
    //                         }
    //                     });
    //             }
    //             else {
    //                 res.code = "400";
    //                 res.value = "Something went wrong!";
    //                 console.log(res.value);
    //                 console.log(err);
    //                 res.sendStatus(400).end();
    //             }






    //         }
    //     });









});















module.exports = router;