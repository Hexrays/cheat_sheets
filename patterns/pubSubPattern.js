// ********************************************
// ********************************************
// The Publish/Subscribe Pattern Example
// ********************************************
// ********************************************

// Avery simple new mail handler

// A count of the number of messages received
var mailCounter = 0;

// Initialize subscribers that will listen out for a topic
// with the name "inbox/newMessages".

// Render a preview of new messages
var subscriber1 = subscribe('inbox/newMessage', function(topic, data){

    // log the topic for debugging purposes
    console.log('A new message was received: ', topic);

    // Use the data that was passed from our subject
    // to display a message preview to the user
    $('.messageSender').html(data.sender);
    $('.messagePreview').html(data.body);
});

// Here's another subscriber using the same data to perform a different task

// Update the counter displaying the number of new
// messages received via the publisher

var subscriber2 = subscribe('inbox/newMessage', function(topic, data){
    $('.newMessageCounter').html(++mailCounter);
});

publish('inbox/newMessage',[{
    sender : 'hello@google.com',
    body   : 'Hey there! This is a message to you'
}]);

// We could then at a later point unsubscribe our subscribers
// from receiving any new topic notifications as follows
// unsubscribe(subscriber1);
// unsubscribe(subscriber2);