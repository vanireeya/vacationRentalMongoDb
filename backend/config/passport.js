'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
// var db = require('../app/db');
var config = require('./settings');
var { userinfos } = require('../models/userinfos');

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    console.log("reached here*****************");
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    console.log(opts);
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log("___________________________________________________" + jwt_payload.email)
        console.log(typeof (jwt_payload.email))
        userinfos.findOne({
            email:  jwt_payload.email
            // email: "test@g.com"
        }, function (err, res) {
            if (err) {
                return callback(err, false);

            } else if (res) {
                var user = res;
                delete user.password;
                callback(null, user);

            }

        }
            // , function (err) {
            //     console.log("********************err")

            // }
        );
    }));
};
