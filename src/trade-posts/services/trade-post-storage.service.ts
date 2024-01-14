import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'nest-aws-sdk';

@Injectable()
export class TradePostStorageService {
  private readonly bucketName = 'trade-post-image';

  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  async listBucketContents(bucket: string) {
    const response = await this.s3.listObjectsV2({ Bucket: bucket }).promise();
    return response.Contents.map((c) => c.Key);
  }
}
