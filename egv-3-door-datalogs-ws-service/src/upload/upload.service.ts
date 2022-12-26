import { Injectable } from '@nestjs/common';
import { InjectS3, S3 as NestJsS3 } from 'nestjs-s3';
import { S3 } from 'aws-sdk';

@Injectable()
export class UploadService {
  constructor(@InjectS3() private readonly s3: NestJsS3) {}

  async uploadFile(params: S3.Types.PutObjectRequest) {
    return new Promise((resolve, reject) => {
      this.s3.upload(params, function (error, data) {
        if (error) reject(error);
        resolve(data);
      });
    });
  }

  async getFile(params: S3.Types.GetObjectRequest) {
    return new Promise((resolve, reject) => {
      this.s3.getObject(params, function (error, data) {
        if (error) reject(error);
        resolve(data);
      });
    });
  }

  async getFileStream(params: S3.Types.GetObjectRequest) {
    return new Promise((resolve, reject) => {
      this.s3
        .getObject(params, function (error, data) {
          if (error) reject(error);
          resolve(data);
        })
        .createReadStream();
    });
  }

  async listFile(params: S3.Types.ListObjectsV2Request) {
    return new Promise((resolve, reject) => {
      this.s3.listObjectsV2(params, function (error, data) {
        if (error) reject(error);
        resolve(data);
      });
    });
  }

  deleteFile(params: S3.Types.DeleteObjectRequest) {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject(params, function (error, data) {
        if (error) reject(error);
        resolve(data);
      });
    });
  }
}
