const uploadToS3 = require("./uploadToS3.js");
const aws_link =
  "https://miraclemessagesimages.s3.amazonaws.com/";

const postImageGetUrl = async function(img, res) {
  //pulling out the chapter_img file
  // console.log("in the function");
  //uploading the file to AWS
  try {
    uploadToS3(img);
    // console.log("success");
  } catch (error) {
    res.status(500).json({ error: `error uploading the ${img} to AWS` });
  }

  // storing the chapter image url i database

  const encodedImgName = encodeURI(await img.name);

  return aws_link + encodedImgName;
};

module.exports = postImageGetUrl;
