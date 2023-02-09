const AWS = require('aws-sdk');
const options = { region: process.env.REGION };

// initialising the dynamodb sdk
const documentClient = new AWS.DynamoDB.DocumentClient(options);

class Dynamo {
  constructor(s3EvtRecord) {
    this.tableName = `${process.env.dynamoname}-${process.env.ENV}`;
    this.s3EvtRecord = s3EvtRecord;
    this.bucket = s3EvtRecord.s3.bucket.name;
    this.s3Object = s3EvtRecord.s3.object;
    this.s3ObjectKey = this.s3Object.key;
  }

  async put() {
    const params = {
      TableName: this.tableName,
      Item: this.itemToPush,
      ConditionExpression: 'attribute_not_exists(recordId) AND attribute_not_exists(formattedDate)'
    };
    console.log(`Params to be posted to Dynamo - ${JSON.stringify(params)}`);
    try{
      await documentClient.put(params).promise();
      console.log('Drone Media metadata is successfully logged.');
    } catch(err) {
      console.log(`Drone Media metadata fails to get logged in dynamoDB. Error: ${err}`);
    }
  }

  async delete() {
    const partitionKey =`${this.checkFileType(this.s3ObjectKey)}_${this.s3ObjectKey.replace('public/', '')}`;
    const item = await this.getItemFromPartition(partitionKey);
    const params = {
      TableName: this.tableName,
      Key: {
        recordId: partitionKey,
        formattedDate: item.formattedDate
      },
    };
    console.log(`Params used to delete record in Dynamo - ${JSON.stringify(params)}`);
    try{
      await documentClient.delete(params).promise();
      console.log('Drone Media metadata is successfully deleted.');
    } catch(err) {
      console.log(`Drone Media metadata fails to get deleted from dynamoDB. Error: ${err}`);
    }
  }

  /**
   * @private
   * @returns {Object}
   */
  get itemToPush() {
    const currentDate = new Date();
    const epochTimestamp = currentDate.getTime();

    return {
      recordId: `${this.checkFileType(this.s3ObjectKey)}_${this.s3ObjectKey.replace('public/', '')}`,
      formattedDate: currentDate.toISOString().substring(0, 10),
      mediaType: this.checkFileType(this.s3ObjectKey),
      fileName: this.s3ObjectKey.replace('public/', ''),
      fileExtension: this.s3ObjectKey.substr(this.s3ObjectKey.lastIndexOf(".") + 1),
      createdAt: epochTimestamp,
      updateAt: epochTimestamp,
      size: this.s3Object.size,
      etag: this.s3Object.eTag,
      recordType: 's3_media_metadata'
    };
  }

  async getItemFromPartition(partitionKey) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'recordId = :recordId',
      ExpressionAttributeValues: {
        ':recordId': partitionKey,
      },
    };
    console.log(`Get params - ${JSON.stringify(params)}`);
    try {
      const data = await documentClient.query(params).promise();
      if (data && data.Count) {
        return data.Items[0];
      } else {
        throw { name: 'NotFound', message: 'Requested License Data Not Found' };
      }
    } catch (err) {
      console.log(`Get media metadata error: ${err}`);
    }
  }

  /**
   * @private
   * @param {string} fileName 
   * @returns {string}
   */
  checkFileType(fileName) {
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
}

module.exports = Dynamo;
