var restify = require('restify');
var nodemailer = require('nodemailer');
var twilio = require('twilio');
var nodemailer = require('nodemailer');

var alert = function(msg) {
    var transport = nodemailer.createTransport('SES', {
        AWSAccessKeyID: process.env.AWSAccessKeyID,
        AWSSecretKey: process.env.AWSSecretKey
    });

    transport.sendMail({
        from: 'contact@dannysu.com',
        to: 'contact@dannysu.com',
        subject: 'URGENT: FIX STUFF',
        text: msg
    }, function(err, responseStatus) {
        // Do nothing
    });

    //
    // Send SMS
    //
    var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    client.sms.messages.create({
        body: msg,
        to: '+18888888888',
        from: '+18888888888'
    }, function() {
        // Do nothing
    });

    //
    // Call
    //
    client.calls.create({
        to: '+18888888888',
        from: '+18888888888',
        url: 'https://someplace.com/twiml.xml',
        method: 'get'
    }, function(error, message) {
        // Do nothing
    });
};

var test = function() {
    var client = restify.createJsonClient({
        url: 'https://someplace.com'
    });

    client.get('/somepath', function(err, req, res, obj) {
        if (err) {
            alert('URGENT: FIX STUFF NOW!!!');
            return;
        }
    });
};

setInterval(function() {
    test();
}, 60 * 1000);
