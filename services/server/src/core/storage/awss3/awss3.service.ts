import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, GetObjectCommand, CreateBucketCommand, AbortMultipartUploadCommand } from '@aws-sdk/client-s3';

// https://www.freecodecamp.org/news/how-to-upload-files-to-aws-s3-with-node/
@Injectable()
export class AliossService {

    constructor(
        private readonly configService: ConfigService,
    ) {
    }

    async uploadPublicFile(dataBuffer: Buffer, filename: string) {
        // const s3 = new S3Client({
        //     credentials: {
        //         accessKeyId,
        //         secretAccessKey
        //     },
        //     region: "REGION"
        // });

        // const command = new AbortMultipartUploadCommand({
        //     Bucket: this.configService.get('BUCKET_NAME') || '',
        //     Body: dataBuffer,
        //     Key: filename,
        // })
        // const uploadResult = await s3
        //     .send(command)
        //     .then((data) => {

        //     }, (err) => {

        //     });
        // return uploadResult;
    }

    async getPreSignedURL(filename: string): Promise<any> {
        const s3 = new S3Client({ region: "REGION" });
        // const expiry = this.configService.get('SIGNED_URL_TIMEOUT')
        //     ? this.configService.get('SIGNED_URL_TIMEOUT')
        //     : 72000;
        // const presignedPUTURL = s3.getSignedUrl('putObject', {
        //     Bucket: this.configService.get('BUCKET_NAME'),
        //     Key: filename,
        //     Expires: expiry,
        // });

        // return {
        //     url: presignedPUTURL,
        //     durationToExpire: expiry,
        // };
    }
}
