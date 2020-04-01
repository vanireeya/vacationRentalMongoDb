var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
// var Books = require('./services/books.js');
var login = require('./services/login.js');
var signup = require('./services/signup.js');
var listing = require('./services/listing.js');
var getList = require('./services/getList.js');
var getTrip = require('./services/getTrip.js');
var profile = require('./services/profile.js');
var updateProfile = require('./services/updateProfile.js');
var updateProfilePic = require('./services/updateProfilePic.js');
var book_property = require('./services/book_property.js');
var search = require('./services/search.js');
var addConversation = require('./services/addConversation.js');
var getMessageList = require('./services/getMessageList.js');
var addMessage = require('./services/addMessage.js');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login",login)
handleTopicRequest("signup",signup)
handleTopicRequest("listing",listing)
handleTopicRequest("getList",getList)
handleTopicRequest("getTrip",getTrip)
handleTopicRequest("profile",profile)
handleTopicRequest("updateProfile",updateProfile)
handleTopicRequest("updateProfilePic",updateProfilePic)
handleTopicRequest("book_property",book_property)
handleTopicRequest("search",search)
handleTopicRequest("addConversation",addConversation)
handleTopicRequest("getMessageList",getMessageList)
handleTopicRequest("addMessage",addMessage)
