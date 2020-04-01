var express = require('express');
var router = express.Router();
var kafka = require('../kafka/client')
var jwt = require('jsonwebtoken');
var config = require('../config/settings');
var imageProcess = require('./imageProcess')
const multer = require('multer');
const path = require('path');
const fs = require('fs');





router.get('/getList/:email', function (req, res) {


    console.log("\n Inside get property list for Owner");
    console.log(`email: ${req.params.email}`)

    kafka.make_request('getList', req.params.email, async function (err, result) {
        if (err) {
            res.code = "400";
            res.value = "Something went wrong!";
            console.log(res.value);
            res.sendStatus(400).end();
        } else {

            // console.log("Login successful. User authenticated!")
            if (result.status == "1") {
                let info=result.info
                if (info[0] && info[0].propertyList && info[0].propertyList.length > 0) {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    })
                    console.log(`successfull fetched properties`);
                    let property = []
                    let i = 0;
                    info[0].propertyList.forEach(value => {
                        let imagesName = JSON.parse(value.images)
                        // console.log(imagesName)
                        let imageFinal = [];
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
                    data = {
                        status: 1,
                        msg: "Success",
                        property: property
                    }
                    res.end(JSON.stringify(data));
                } 
            } else {

                console.log(`No properties found`);

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                })
                data = {
                    status: -1,
                    msg: "No property found"
                }
                res.end(JSON.stringify(data));
            }

        }
    })







})








// router.post('/login', (req, res) => {
//     console.log("\nIn login request");
//     console.log(`email: ${req.body.email}, password: ${req.body.password} `)
//     kafka.make_request('login', req.body, async function (err, result) {
//         if (err) {
//             res.code = "400";
//             res.value = "Something went wrong!";
//             console.log(res.value);
//             res.sendStatus(400).end();
//         } else {

//             // console.log("Login successful. User authenticated!")
//             if (result.status == "1") {
//                 res.cookie('cookie', "admin", { maxAge: 60 * 60 * 1000, httpOnly: false, path: '/' });
//                 var token = jwt.sign({ email: req.body.email }, config.secret, {
//                     expiresIn: 60 * 60 * 1000 // in seconds
//                 });
//                 result.info.token = 'JWT ' + token
//                 res.writeHead(200, {
//                     'Content-Type': 'application/json'
//                 })
//                 if (result.info.images) {
//                     try {
//                         let newFileFormat = await imageProcess.changeFormat(result.info.images)
//                         result.info.profileImage = newFileFormat
//                         data = {
//                             status: 1,
//                             msg: "Successful login",
//                             info: result.info
//                         }
//                         res.end(JSON.stringify(data));
//                     } catch (error) {
//                         let data = {
//                             status: -1,
//                             msg: "Error in file conversion"
//                         }
//                         res.end(JSON.stringify(data));
//                     }

//                     res.end(JSON.stringify(result));

//                 } else {
//                     console.log("no result found!")
//                     console.log(result)
//                     res.end(JSON.stringify(result));

//                 }
//             } else {

//                 res.writeHead(200, {
//                     'Content-Type': 'application/json'
//                 })
//                 console.log(result.msg)
//                 res.end(JSON.stringify(result));
//             }

//         }
//     })


// })

module.exports = router;