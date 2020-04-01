
var { mongoose } = require('../db/mongoose');
var { userinfos } = require('../models/userinfos');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for geting Trip for traveller ")

    console.log(msg)
    userinfos.aggregate([
        { $unwind: '$pastPropertyList' },
        { $match: { 'email': msg } },
        { $project: { _id: 0, pastPropertyList: 1 } }
    ],
        function (err, result) {
            if (err) {
                console.log("error in fetching, at kafka");
                console.log(err);
                callback(err, "Error in fetching from database at kafka.");
            } else {
                console.log("successfully fetched all the trips")
                console.log(result)
                
                data = {
                    status: 1,
                    msg: "Success",
                    info: result
                }
                callback(null, data);

                // res.end(JSON.stringify(data));
            }
        })



















    


}


exports.handle_request = handle_request;