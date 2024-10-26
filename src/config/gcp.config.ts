import { Storage } from '@google-cloud/storage';
import { join } from 'path';

export const gcpStorage = new Storage({
  keyFilename: join('./key.json'),
  projectId: 'notional-buffer-426116-s1',
});

export const bucketName = 'mentorsforge';
