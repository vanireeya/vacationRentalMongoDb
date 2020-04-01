var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')


router.post('/listing', function (req, res) {

    console.log("\nInside posting of the property")
    imageProcess.upload(req, res, function (err, result) {
        let location = JSON.parse(req.body.location);
        let details = JSON.parse(req.body.details);
        let pricing = JSON.parse(req.body.pricing);
        let email = JSON.parse(req.body.email);

        let data = {
            location: location,
            details: details,
            pricing: pricing,
            email: email
        }


        console.log(`email: ${JSON.parse(req.body.email)}`);


        if (err) {
            console.log(err)
            return res.end("Error uploading file.");
        } else {

            let filenames = [];
            for (let i = 0; i < req.files.length; i++) {
                filenames.push(req.files[i].filename)
            }
            filenames = JSON.stringify(filenames)
            data.filenames = filenames;
            kafka.make_request('listing', data, async function (err, result) {
                if (err) {
                    res.code = "400";
                    res.value = "Something went wrong!";
                    console.log(res.value);
                    res.sendStatus(400).end();
                } else {
                    console.log("Property successfully listed")
                    console.log(result)
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    let data = {
                        status: 1,
                        msg: "Successfully listed",
                    }
                    res.end(JSON.stringify(data));
                }
            })
        }
    });
})



module.exports = router;