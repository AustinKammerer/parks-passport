require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads file (from multer) to s3
function uploadFile(file) {
  // create a read stream with fs
  const fileStream = fs.createReadStream(file.path);
  // declare the upload parameters
  const uploadParams = {
    Bucket: bucketName, // AWS S3 bucket name
    Body: fileStream, //
    Key: file.filename, // name of file within the bucket (filename created by Multer)
  };

  return s3.upload(uploadParams).promise();
}

// downloads file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey, // created during upload
    Bucket: bucketName,
  };
  return s3.getObject(downloadParams).createReadStream();
}

module.exports = {
  uploadFile: uploadFile,
  getFileStream: getFileStream,
};
