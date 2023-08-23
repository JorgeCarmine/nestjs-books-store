import { Injectable } from "@nestjs/common";
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {

    private s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
    }

    async uploadFile(fileKey: string, file: Express.Multer.File) {
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
          };
      
          return this.s3.upload(params).promise();
    }

    async deleteFile(fileKey: string) {
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: fileKey
          };
      
          return this.s3.deleteObject(params).promise();
    }
}