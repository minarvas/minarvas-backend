import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';

@Injectable()
export class TradePostStorageService {
  private readonly logger = new Logger(TradePostStorageService.name);
  private readonly bucketName = 'minarvas';
  private readonly bucketDirectory = 'trade-post-image';

  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async listBucketContents() {
    const response = await this.s3.listObjectsV2({ Bucket: this.bucketName }).promise();
    return response.Contents.map((c) => c.Key);
  }

  async upload(postId: string, image: FileUpload) {
    if (!image || !postId) return null;

    try {
      this.logger.log('Uploading image to S3 bucket...');
      const key = `${this.bucketDirectory}/${postId}`;
      const response = await this.s3
        .upload({
          Bucket: this.bucketName,
          Key: key,
          Body: image.createReadStream(),
        })
        .promise();
      this.logger.log(`Image uploaded to ${response.Location}`);
      return response.Location;
    } catch (err) {
      this.logger.error('Fail to upload image', err);
      return null;
    }
  }
}
