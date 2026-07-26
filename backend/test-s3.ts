import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ 
  region: process.env.AWS_REGION 
});

async function testS3() {
  try {
    const command = new ListBucketsCommand({});
    const response = await client.send(command);
    console.log("✅ AWS Connection Success!");
    console.log("Buckets:", response.Buckets);
  } catch (error) {
    console.error("❌ AWS Connection Failed:", error);
  }
}

testS3();
