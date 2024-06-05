import aws from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

// Configure AWS SDK
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export const uploadFile = (files) => {
  const params = files.map((file, i) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuidv4()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
  });
  const result = Promise.all(params.map((param) => s3.upload(param).promise()));
  return result;
};
