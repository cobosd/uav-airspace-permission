const Dynamo = require('./dynamo');

exports.handler = async function (event) {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  const s3EvtRecord = event.Records[0];
  const dynamo = new Dynamo(s3EvtRecord);
  switch (s3EvtRecord.eventName) {
    case 'ObjectCreated:Put':
      await dynamo.put();
      break;
    case 'ObjectRemoved:Delete':
      await dynamo.delete();
      break;
  }
};
