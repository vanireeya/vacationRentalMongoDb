var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')
const multer = require('multer');
const path = require('path');
const fs = require('fs');


router.get('/customFilter/:id', function (req, res) {

    console.log("in search for filter")
    let id = req.params.id
    id = JSON.parse(id)
    id.guests = parseInt(id.guests)
    kafka.make_request('search', req.params.id, async function (err, response) {
        if (err) {
            res.code = "400";
            res.value = "Something went wrong!";
            console.log(res.value);
            res.sendStatus(400).end();
        } else {
            console.log("returning search results")
            let result = response.info
            console.log(`result:`)
            // console.log(result)
            // if (result && result.length > 0) {
            let startDate = Date.parse(id.tripStart)
            let endDate = Date.parse(id.tripEnd)
            let finalResult = [];
            for (let i = 0; i < result.length; i++) {
                if (Date.parse(result[i].propertyList.availablefrom) < startDate && Date.parse(result[i].propertyList.availabletill) > endDate) {
                    let property = result[i].propertyList;
                    property.ownderId = result[i]._id;
                    // intermediate_property.push(result[i])
                    // console.log("************************************************")
                    // console.log(result[i].propertyList)
                    if (property.booked.length > 0) {
                        let flag = true
                        for (let j = 0; j < property.booked.length && flag == true; j++) {
                            if (startDate < Date.parse(property.booked[j].block_from) && Date.parse(property.booked[j].block_from) < endDate) {
                                flag = false;
                            }
                            if (startDate < Date.parse(property.booked[j].block_to) && Date.parse(property.booked[j].block_to) < endDate) {
                                flag = false;
                            }
                            if (Date.parse(property.booked[j].block_from) < startDate && startDate < Date.parse(property.booked[j].block_to)) {
                                flag = false;
                            }
                            if (Date.parse(property.booked[j].block_from) < endDate && endDate < Date.parse(property.booked[j].block_to)) {
                                flag = false;
                            }
                        }
                        // console.log(flag)
                        if (flag) {
                            finalResult.push(property)
                        }
                    } else {
                        finalResult.push(property)
                    }
                }
            }

            console.log("HEREEEEEEE")
            console.log(finalResult)
            let property = []
            finalResult.forEach(value => {
                let imagesName = JSON.parse(value.images)
                // console.log(imagesName)
                let imageFinal = [];
                var day = 24 * 60 * 60 * 1000;
                var availableFrom = new Date(id.tripStart);
                var availabletill = new Date(id.tripEnd);
                var no_days = Math.round(Math.abs((availableFrom.getTime() - availabletill.getTime()) / (day)));
                // console.log(no_days + 1)
                value.days = no_days;
                if (value.days == 0) {
                    value.days++;
                }
                value.totalCost = value.days * parseInt(value.rent)
                imagesName.forEach(filename => {
                    let file = filename;
                    let fileLocation = path.join(__dirname + '/../uploads', file);
                    let img = fs.readFileSync(fileLocation);
                    let base64img = new Buffer(img).toString('base64');
                    imageFinal.push(base64img)
                });
                value.showImages = imageFinal;
                property.push(value);
            });



            // console.log(property)
            // console.log("skip" + id.skip)
            // console.log(id.limit)
            // let j = 0;
            let finalProp = [];


            property.forEach(element => {
                if (element.headline == id.pname) {
                    finalProp.push(element)
                }
            });
            console.log(id.bedroom)
            console.log(id.price)


            if (id.bedroom && id.price) {
                let intermediate = []
                // console.log("first")

                property.forEach(element => {
                    if (parseInt(element.bedroom) >= parseInt(id.bedroom)) {
                        intermediate.push(element)
                    }
                });
                intermediate.forEach(element => {

                    if (parseInt(element.rent) <= parseInt(id.price)) {
                        finalProp.push(element)
                    }
                });
            } else if (id.bedroom) {
                // console.log("2")

                property.forEach(element => {
                   

                    if (parseInt(element.bedrooms) >= parseInt(id.bedroom)) {
                        finalProp.push(element)
                    }
                });
            } else {
                // console.log("3")

                property.forEach(element => {
                    
                    if (parseInt(element.rent) <= parseInt(id.price)) {
                        finalProp.push(element)
                    }
                });
            }

            // for (let i = 0; i < property.length; i++) {
            //     if (i < id.skip) {

            //     } else {
            //         if (j < id.limit) {
            //             finalProp.push(property[i]);
            //             j++;
            //         }
            //     }
            // }
            // console.log(finalProp.length)
            // let no_of_pages = Math.ceil(property.length / id.limit)

            data = {
                status: 1,
                msg: "Success",
                property: finalProp,

            }
            console.log("Successfully sent")
            res.end(JSON.stringify(data));


        }
    })







})

















module.exports = router;