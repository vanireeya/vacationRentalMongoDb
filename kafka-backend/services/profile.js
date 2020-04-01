// var mongo = require('./mongo');
var { mongoose } = require('../db/mongoose');
var { userinfos } = require('../models/userinfos');

// var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for geting profile of traveller ")

    console.log(msg)






    userinfos.findOne({
        _id: msg
    }, async function (err, user) {
        if (err) {
            console.log("error in fetching, at kafka");
            console.log(err);
            callback(err, "Error in fecthing from database at kafka.");
        } else if (user) {
            console.log("User found: " + user)
           
            data = {
                status: 1,
                msg: "Successful login",
                info: user
            }
            callback(null, data)
        } else {

            data = {
                status: -1,
                msg: "User not found"
            }
            callback(null, data)

        }
    }).lean();









}


exports.handle_request = handle_request;