const fs = require("fs");
const AWS = require("aws-sdk");
const config = require("../config");

const bucketName = config.AWS_S3_BUCKET_NAME;
const bucketRegion = config.AWS_S3_BUCKET_REGION;

AWS.config.update({
  region: bucketRegion,
});

const s3 = new AWS.S3();

const uploadStream = async (readStream, keyName) => {
  const params = {
    Bucket: bucketName,
    Key: keyName,
    Body: readStream,
    ContentType: "image/jpeg",
    ACL: "public-read",
  };
  return s3.putObject(params).promise();
};

const getFile = (keyName) =>
  s3.getObject({ Bucket: bucketName, Key: keyName }).promise();

const generateURL = (keyName) =>
  `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${keyName}`;

module.exports = {
  uploadStream,
  getFile,
  generateURL,
};
