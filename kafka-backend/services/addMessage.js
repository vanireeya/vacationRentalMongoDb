// var mongo = require('./mongo');
var { mongoose } = require('../db/mongoose');
var { userinfos } = require('../models/userinfos');

// var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for booking ")




console.log(msg.cid)
console.log(msg.traveler)
    userinfos.updateOne(
        {
            $and: [{ email: msg.traveler },
            { 'conversation.cid': msg.cid }]
        },
        {
            $push: {
                'conversation.$.msg': msg.msg
            }
        },
        { upsert: true },
        function (err1, result1) {
            if (err1) {
                console.log("error in updating, at kafka");
                console.log(err1);
                callback(err1, "Error in updating from database at kafka11111111111111.");
            } else {
                userinfos.updateOne(
                    {
                        $and: [{ _id: msg.ownerId },
                        { 'conversation.cid': msg.cid }]
                    },
                    {
                        $push: {
                            'conversation.$.msg': msg.msg
                        }
                    },
                    { upsert: true },
                    function (err1, result1) {
                        if (err1) {
                            console.log("error in updating, at kafka");
                            console.log(err);
                            callback(err, "Error in updating from database at kafka.");
                        } else {
                            console.log(result1)
                            let data = {
                                status: 1,
                                msg: "Successfully booked",
                                // info: information
                            }
                            console.log("successfully booked the property")
                            callback(null, data)
                        }
                    });
            }
        });






    // userinfos.updateOne(
    //     { email: msg.email },
    //     {
    //         $push: {
    //             pastPropertyList: msg.property

    //         }
    //     },
    //     { upsert: true },
    //     function (err, result) {
    //         if (err) {
    //             console.log("error in updating, at kafka");
    //             console.log(err);
    //             callback(err, "Error in updating from database at kafka.");
    //         } else {
    //             // console.log(result)
    //             if (msg.property && msg.property.ownderId) {

    //                 userinfos.updateOne(
    //                     {
    //                         $and: [{ _id: msg.property.ownderId },
    //                         { 'propertyList.street': msg.property.street }]
    //                     },
    //                     {
    //                         $push: {
    //                             'propertyList.$.booked': msg.property.booked
    //                         }
    //                     },
    //                     { upsert: true },
    //                     function (err1, result1) {
    //                         if (err1) {
    //                             console.log("error in updating, at kafka");
    //                             console.log(err);
    //                             callback(err, "Error in updating from database at kafka.");
    //                         } else {
    //                             // console.log(result1)
    //                             let data = {
    //                                 status: 1,
    //                                 msg: "Successfully booked",
    //                                 // info: information
    //                             }
    //                             console.log("successfully booked the property")
    //                             callback(null, data)
    //                         }
    //                     });
    //             }
    //             else {
    //                 console.log("error in updating, at kafka");
    //                 console.log(err);
    //                 callback(err, "Error in updating from database at kafka.");
    //             }
    //         }
    //     });

















}


exports.handle_request = handle_request;