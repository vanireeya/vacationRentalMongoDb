// var mongo = require('./mongo');
var { mongoose } = require('../db/mongoose');
var { userinfos } = require('../models/userinfos');

// var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for login request")

    let email = msg.email;
    let location = msg.location;
    let details = msg.details;
    let filenames = msg.filenames;
    let pricing = msg.pricing


    userinfos.update({
        email: email
    }, {
            $push: {

                propertyList: {
                    country: location.country,
                    street: location.street,
                    city: location.city,
                    state: location.state,
                    zipcoded: location.zipcode,
                    headline: details.headline,
                    description: details.propDesc,
                    apt_type: details.aptType,
                    bedrooms: details.bedrooms,
                    accomodates: details.accomodates,
                    bathrooms: details.bathrooms,
                    images: filenames,
                    availablefrom: pricing.availableFrom,
                    availabletill: pricing.availableTill,
                    rent: pricing.rent,
                    booked: []
                },
            }
        }, async function (err, resp) {

            if (err) {
                console.log("error in inserting, at kafka");
                console.log(err);
                callback(err, "Error in inserting from database at kafka.");
            } else if (resp) {
                console.log("Property successfully listed")
                console.log(resp)

                let data = {
                    status: 1,
                    msg: "Successfully listed",
                    info: resp
                }

                callback(null, data)
            }
        })

}


exports.handle_request = handle_request;