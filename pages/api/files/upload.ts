import formidable from 'formidable';
import aws from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import { createReadStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * 파일 업로드 API
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const form = new formidable.IncomingForm();

      //* s3에 파일을 업로드하고 업로드한 파일의 주소를 받아온다
      const url = await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
          console.log('FILES: ', files);

          const s3 = new aws.S3({
            accessKeyId: process.env.ACCESSKEY_ID,
            secretAccessKey: process.env.SECRET_ACCESSKEY_ID,
          });

          const stream = createReadStream(files.file.path);

          // ? 파일명 설정 (같은 파일일 경우 덮어쓰기 방지)
          const originalFileName = files.file.name.split('.').shift();

          // 확장자
          const fileExtension = files.file.name.split('.').pop();

          await s3
            .upload({
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: `${originalFileName}__${uuidv4()}.${fileExtension}`,
              ACL: 'public-read',
              Body: stream,
            })
            .promise()
            .then((response) => resolve(response.Location))
            .catch((e) => reject(e));
        });
      });

      return res.status(201).end(url);
    } catch (error) {
      console.log(error);
      return res.end();
    }
  }
  return res.status(405).end();
};
