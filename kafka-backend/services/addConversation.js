// var mongo = require('./mongo');
var { mongoose } = require('../db/mongoose');
var { userinfos } = require('../models/userinfos');

// var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for booking ")
    console.log(msg.ownerId)
    console.log(msg.cid)
    console.log(msg)




    userinfos.updateOne(
        { _id: msg.ownerId },
        {
            $push: {
                conversation: msg

            }
        },
        { upsert: true },
        function (err, result) {
            if (err) {
                console.log("error in updating, at kafka");
                console.log(err);
                callback(err, "Error in updating from database at kafka.");
            } else {
                console.log("Owner updated successfully")
                userinfos.updateOne(
                    { _id: msg.travellerId },
                    {
                        $push: {
                            conversation: msg
            
                        }
                    },
                    { upsert: true },
                    function (err, result) {
                        if (err) {
                            console.log("error in updating, at kafka");
                            console.log(err);
                            callback(err, "Error in updating from database at kafka.");
                        } else {
                            console.log(result)
                            let data = {
                                status: 1,
                                msg: "Successfully booked",
                                // info: information
                            }
                            console.log("Traveller updated successfully")
                            callback(null,data)
                        }
                    });
                
            }
        });









  







}


exports.handle_request = handle_request;