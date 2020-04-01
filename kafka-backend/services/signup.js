// var mongo = require('./mongo');
var { mongoose } = require('../db/mongoose');
var { userinfos } = require('../models/userinfos');

var bcrypt = require('bcryptjs');


function handle_request(information, callback) {

    console.log("\n\nInside kafka backend for Signup request")

    // console.log(information)

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(information.password, salt);
    var userinfo = new userinfos({
        firstname: information.firstname,
        lastname: information.lastname,
        flag: information.type,
        email: information.email,
        password: hash,
        image: ""
    })
    console.log(`email: ${userinfo.email}`);
    userinfo.save().then(userinfo => {

        console.log(userinfo);

        console.log(`successfully signed up: ${userinfo.email}`);

        information.uid = userinfo._id;
        let data = {
            status: 1,
            msg: "Successfully signed up!",
            info: information
        }
        callback(null, data);

        // res.end(JSON.stringify(data));

    }, err => {

        console.log(err);
        let data = {
            status: -1,
            msg: "Duplicate record!",
            info: "error"
        }
        callback(err, data);

        // res.end(JSON.stringify(data));





    })

}
exports.handle_request = handle_request;