const AWS = require("aws-sdk");
const express = require("express");

const chapterDB = require("../models/chapters-model.js");

// CONSTANTS
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;

// UPLOAD TO S3 BUCKET

const uploadToS3 = (file, res, next) => {
  const s3Bucket = new AWS.S3({
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    Bucket: S3_BUCKET_NAME
  });

  s3Bucket.createBucket(async () => {
    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: file.name,
      ContentType: file.name.mimetype,
      Body: file.data
    };

    var result = s3Bucket.upload(params, (err, data) => {
      if (err) {
        console.log("error in callback");
        console.log(err);
      }
      console.log("success");

      res.status(200).json(data);
    });
  });
};

// const uploadToS3 = (file, res, id) => {
//   const s3Bucket = new AWS.S3({
//     accessKeyId: S3_ACCESS_KEY_ID,
//     secretAccessKey: S3_SECRET_ACCESS_KEY,
//     Bucket: S3_BUCKET_NAME
//   });

//   s3Bucket.createBucket(() => {
//     const params = {
//       Bucket: S3_BUCKET_NAME,
//       Key: file.name,
//       ContentType: file.name.mimetype,
//       Body: file.data
//     };

//     s3Bucket.upload(params, (err, data) => {
//       if (err) {
//         console.log("error in callback");
//         console.log(err);
//       }
//       console.log("success");
//       // console.log(data);

//       try {
//         const chapter = chapterDB.updateChapter( 3, {
//           chapter_img_url: data.Location
//         });

//         console.log(chapter._single);
//          res.status(200).json(chapter);
//       } catch (error) {
//         res
//           .status(500)
//           .json({ error: " Error adding the image url to the chapter" });
//       }

//       res.status(200).json(data);
//       console.log(res.data);
//     });
//   });
// };

module.exports = uploadToS3;
