// var mongo = require('./mongo');
var { mongoose } = require('../db/mongoose');
var { userinfos } = require('../models/userinfos');

// var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for searching")



    console.log("in search")
    let id = msg
    id = JSON.parse(id)
    // id.guests = parseInt(id.guests)

    userinfos.aggregate([
        { $unwind: '$propertyList' },
        { $match: { 'propertyList.city': id.city, 'propertyList.accomodates': { $gte: id.guests } } },
        { $project: { propertyList: 1 } }
    ], function (err, result) {
        if (err) {
            console.log("error in updating, at kafka");
            console.log(err);
            callback(err, "Error in updating from database at kafka.");
        }
        else {

            let data = {
                status: 1,
                msg: "Successfully updated",
                info: result
            }
            callback(null, data)
            console.log("Successfully sent")


        }
    })












    // userinfos.updateOne({
    //     _id: msg.uid
    // }, {
    //         $set: {
    //             "firstname": msg.firstname,
    //             "lastname": msg.lastname,
    //             "description": msg.description,
    //             "country": msg.country,
    //             "company": msg.company,
    //             "school": msg.school,
    //             "hometown": msg.hometown,
    //             "languages": msg.languages,
    //             "gender": msg.gender,
    //             "city": msg.city,
    //             "phoneno": msg.phoneno
    //         }
    //     }, async function (err, resp) {

    //         if (err) {
    //             console.log("error in updating, at kafka");
    //             console.log(err);
    //             callback(err, "Error in updating from database at kafka.");
    //         } else {
    //             console.log("Profile Successfully updated")

    //             let data = {
    //                 status: 1,
    //                 msg: "Successfully updated",
    //             }
    //             callback(null, data)
    //         }
    //     })








}


exports.handle_request = handle_request;