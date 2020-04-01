// var mongo = require('./mongo');
var { mongoose } = require('../db/mongoose');
var { userinfos } = require('../models/userinfos');

// var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for geting list for owner ")

    console.log(msg)

    userinfos.find({
        email: msg
    }, { propertyList: 1, _id: 0 }, async function (err, result) {
        if (err) {
            console.log("error in fetching, at kafka");
            console.log(err);
            callback(err, "Error in fecthing from database at kafka.");
        } else {

            console.log(`result: ${result[0]}`)
            if (result[0] && result[0].propertyList && result[0].propertyList.length > 0) {

                console.log(`successfull fetched properties`);

                data = {
                    status: 1,
                    msg: "Success",
                    info: result
                }
                callback(null, data)

                // res.end(JSON.stringify(data));
            } else {
                console.log(`No properties found`);
                data = {
                    status: -1,
                    msg: "No property found"
                }
                callback(null, data)

            }

        }
    })


}


exports.handle_request = handle_request;