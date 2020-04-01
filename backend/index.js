//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var kafka = require('./kafka/client')
var cors = require('cors');
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var pool = require('./pool');
const path = require('path');
const fs = require('fs');

var jwt = require('jsonwebtoken');
var requireAuth = passport.authenticate('jwt', { session: false });
var config = require('./config/settings');


var { userinfos } = require('./models/userinfos');
var { mongoose } = require('./db/mongoose');
var loginService = require("./services/loginService");
var signupService = require("./services/signupService");
var listingService = require("./services/listingService");
var getListService = require("./services/getListService");
var getTripService = require("./services/getTripService");
var profileService = require("./services/profileService");
var updateProfileService = require("./services/updateProfileService")
var updateProfilePicService = require("./services/updateProfilePicService")
var book_propertyService = require("./services/book_propertyService")
var searchService = require("./services/searchService")
var addConversationService = require("./services/addConversationService")
var getMessageListService = require("./services/getMessageListService")
var addMessageService = require("./services/addMessageService")
var customSearchService = require("./services/customSearchService")
var customFilterService = require("./services/customFilterService")


app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        console.log(file)
        // const newFilename = `test${path.extname(file.originalname)}`;
        const newFilename = file.originalname;

        cb(null, newFilename);
    },
});
// const upload = multer({ storage });
var upload = multer({ storage }).array('photos', 5);
const upload1 = multer({ storage });



//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_homeaway',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());







//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});



app.post('/login', loginService)
app.post('/signup', signupService)

app.post('/listing', requireAuth, listingService)
app.get('/getTrips/:id', requireAuth, getTripService)
app.get('/profile/:id', requireAuth, profileService)
app.post('/updateProfile', requireAuth, updateProfileService)
app.post('/updateProfilePic', requireAuth, updateProfilePicService)
app.get('/getList/:email', requireAuth, getListService)
app.get('/getMessageList/:id', requireAuth, getMessageListService)
app.get('/search/:id', requireAuth, searchService)
app.get('/customSearch/:id', requireAuth, customSearchService)
app.get('/customFilter/:id', requireAuth, customFilterService)


app.post('/addConversation', requireAuth, addConversationService)
app.post('/addMessage/', requireAuth, addMessageService)


app.post('/book_property', requireAuth, book_propertyService)




//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");