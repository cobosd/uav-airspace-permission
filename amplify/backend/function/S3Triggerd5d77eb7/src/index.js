const AWS = require('aws-sdk');
const options = { region: process.env.REGION };

// initialising the dynamodb sdk
const documentClient = new AWS.DynamoDB.DocumentClient(options);

exports.handler = async function (event) {
  const tableName = `${process.env.dynamoname}-${process.env.ENV}`;
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  const object = event.Records[0].s3.object;
  const currentDate = new Date();
  const epochTimestamp = currentDate.getTime();

  const item = {
    recordId: `${checkFileType(key)}_${key.replace('public/', '')}`,
    formattedDate: currentDate.toISOString().substring(0, 10),
    mediaType: checkFileType(key),
    fileName: key.replace('public/', ''),
    fileExtension: key.substr(key.lastIndexOf(".") + 1),
    createdAt: epochTimestamp,
    updateAt: epochTimestamp,
    size: object['size'],
    etag: object['eTag'],
    recordType: 's3_media_metadata'
  };
  console.log(`Logging Item to be posted in DynamoDB: ${JSON.stringify(item)}`);

  const params = {
    TableName: tableName,
    Item: item,
    ConditionExpression: 'attribute_not_exists(recordId) AND attribute_not_exists(formattedDate)'
  };
  console.log(`Params to be posted to Dynamo - ${JSON.stringify(params)}`);
  try{
    await documentClient.put(params).promise();
    console.log('Drone Media metadata is successfully logged.');
  } catch(err) {
    console.log(`Drone Media metadata fails to get logged in dynamoDB. Error: ${err}`);
  }
  console.log(`Bucket: ${bucket}`, `Key: ${key}`);
};

function checkFileType(fileName) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  const videoExtensions = [".mp4", ".mkv", ".avi", ".mov", ".wmv"];
  const fileExtension = fileName.substr(fileName.lastIndexOf("."));

  if (imageExtensions.includes(fileExtension)) {
    return "image";
  } else if (videoExtensions.includes(fileExtension)) {
    return "video";
  } else {
    return "unknown";
  }
}


