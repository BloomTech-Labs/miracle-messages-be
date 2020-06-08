const AWS = require("aws-sdk");

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;

const uploadToS3 = (file, res) => {
  const s3Bucket = new AWS.S3({
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  });
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: file.name,
      ContentType: file.name.mimetype,
      Body: file.data
    };
    s3Bucket.upload(params, (err, data) => {
      if (err) {
        return err;
      }
      return data;
    });
  // });
};

module.exports = uploadToS3;
