const aws = require("aws-sdk");
const ses = new aws.SES({ region: "us-west-2" });

var response = {
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json","Access-Control-Allow-Origin": "*"
  },
  "isBase64Encoded": false,
  "body": "{ \"result\": \"Success\"\n}"
};

exports.handler = async function (event, context) {
  console.log('EVENT: ', event);
  sendEmail(event, function (err, data) {
    context.done(err, null);
  });
  return response;
};

function sendEmail (event, done) {
  // Extract the properties from the event body
  const { senderEmail, senderName, senderDetails, senderLaunchDate, senderBudget } = JSON.parse(event.body);
  const params = {
    Destination: {
      ToAddresses: ["aimrivera@gmail.com"],
    },
		// Interpolate the data in the strings to send
    Message: {
      Body: {
        Text: {
            Data: `You just got a message from ${senderName} - ${senderEmail}
Details: ${senderDetails}
Launch Date: ${senderLaunchDate}
Budget: ${senderBudget}`,
            Charset: 'UTF-8'
        }
      },
      Subject: {
        Data: `Message from ${senderName}`,
        Charset: 'UTF-8'
      }
    },
    Source: "aimrivera@gmail.com",
  };

  ses.sendEmail(params).promise();
}