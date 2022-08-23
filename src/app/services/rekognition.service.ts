import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Credentials } from 'aws-sdk';

@Injectable()
export class RekognitionService {
  constructor() {
    AWS.config.update({
      credentials: new Credentials({
        accessKeyId: 'AKIAIHRZRTBDBSVIRRVA',
        secretAccessKey: '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',
      }),
    });
    AWS.config.update({ region: 'us-east-1' });
  }

  detectLabels(imgDataUrl: string) {
    const image = atob(imgDataUrl.split('data:image/jpeg;base64,')[1]);
    const length = image.length;
    const imageBytes = new ArrayBuffer(length);
    const ua = new Uint8Array(imageBytes);
    for (let i = 0; i < length; i++) {
      ua[i] = image.charCodeAt(i);
    }
    const rekognition = new AWS.Rekognition();
    const params = {
      Image: {
        Bytes: imageBytes,
      },
    };
    const promise = new Promise((resolve, reject) => {
      rekognition.detectLabels(params, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Labels);
        }
      });
    });
    return promise;
  }
}
