import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';

@Injectable()
export class TradePostStorageService {
  private readonly logger = new Logger(TradePostStorageService.name);
  private readonly bucketName = 'minarvas';
  private readonly bucketDirectory = 'trade-post-image';

  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  private getKey = (postId: string) => `${this.bucketDirectory}/${postId}`;

  async uploadImage(postId: string, image: FileUpload) {
    if (!image || !postId) return null;

    try {
      this.logger.log('Uploading image to S3 bucket...');
      const key = this.getKey(postId);
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

  async deleteImage(postId: string) {
    try {
      this.logger.log('Deleting trade post image from S3 bucket...');
      const key = this.getKey(postId);
      await this.s3.deleteObject({ Bucket: this.bucketName, Key: key }).promise();
    } catch (err) {
      this.logger.warn('Fail to delete trade post image. Or image does not exist in s3 storage', err);
    }
  }
}
