import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function uploadToS3(path, filename, data) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${path}${filename}`,
    Body: JSON.stringify(data),
    ContentType: 'application/json',
  };

  return s3.upload(params).promise();
}
