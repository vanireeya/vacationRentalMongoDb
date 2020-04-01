var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')
const multer = require('multer');
const path = require('path');
const fs = require('fs');





router.get('/getTrips/:id', function (req, res) {


    console.log("\n Inside get property list for Owner");
    console.log(`email: ${req.params.id}`)
    let id = req.params.id
    id = JSON.parse(id)

    kafka.make_request('getTrip', id.email, async function (err, response) {
        if (err) {
            res.code = "400";
            res.value = "Something went wrong!";
            console.log(res.value);
            res.sendStatus(400).end();
        } else {

            console.log(response)
            let property = []
            let result = response.info
            console.log("\n\n\n")
            console.log(result)
            console.log("\n\n\n")
            if (response.status == 1) {
                result.forEach(value => {
                    value = value.pastPropertyList;
                    value.block_from = value.booked.block_from;
                    value.block_to = value.booked.block_to;
                    let imagesName = JSON.parse(value.images)
                    // console.log(imagesName)

                    let imageFinal = [];
                    let i = 0;
                    imagesName.forEach(filename => {
                        let file = filename;
                        let fileLocation = path.join(__dirname + '/../uploads', file);
                        let img = fs.readFileSync(fileLocation);
                        let base64img = new Buffer(img).toString('base64');
                        imageFinal.push(base64img)
                    });
                    value.pid = i;
                    i++;
                    value.showImages = imageFinal;
                    property.push(value);
                });

                let j = 0;
                let finalProp = [];
                console.log(property.length)
                console.log(id.skip)
                console.log(id.limit)
                for (let i = 0; i < property.length; i++) {
                    if (i < id.skip) {

                    } else {
                        if (j < id.limit) {
                            finalProp.push(property[i]);
                            j++;
                        }
                    }
                }
                console.log(finalProp.length)
                let no_of_pages = Math.ceil(property.length / id.limit)
                console.log("pages:"+no_of_pages)
                data = {
                    status: 1,
                    msg: "Success",
                    pages: no_of_pages,
                    property: finalProp,
                }
                console.log("Success")
                res.end(JSON.stringify(data));
            } else {
                data = {
                    status: 1,
                    msg: "Success",
                    property: []
                }
                console.log("Success")
                res.end(JSON.stringify(data));
            }



        }
    })







})




module.exports = router;