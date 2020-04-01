// var mongo = require('./mongo');
var { mongoose } = require('../db/mongoose');
var { userinfos } = require('../models/userinfos');

// var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for updating profile pic of traveller ")

console.log(msg.uid)

    userinfos.updateOne({
        _id: msg.uid
    }, {
            $set: {
                "image": msg.filename,
            }
        }, async function (err, resp) {

            if (err) {
                console.log("error in updating profile pic, at kafka");
                console.log(err);
                callback(err, "Error in updating profile pic from database at kafka.");
            } else {
                console.log("Profile Pic Successfully updated")
                data = {
                    status: 1,
                    msg: "Successfully updated",

                }
                callback(null, data)
            }
        })











   








}


exports.handle_request = handle_request;