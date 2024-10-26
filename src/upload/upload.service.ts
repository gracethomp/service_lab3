import { Injectable } from '@nestjs/common';
import { bucketName, gcpStorage } from 'src/config/gcp.config';

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const blob = gcpStorage.bucket(bucketName).file(`${file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      predefinedAcl: 'publicRead',
    });

    return new Promise((resolve, reject) => {
      blobStream
        .on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
          resolve(publicUrl);
        })
        .on('error', (err: any) => {
          reject(`Unable to upload file, something went wrong: ${err}`);
        })
        .end(file.buffer);
    });
  }
}
