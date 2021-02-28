import formidable from 'formidable';
import aws from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import { createReadStream } from 'fs';

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

      const url = await new Promise((resolve) => {
        form.parse(req, async (err, fields, files) => {
          console.log('FILES: ', files);

          const s3 = new aws.S3({
            accessKeyId: process.env.ACCESSKEY_ID,
            secretAccessKey: process.env.SECRET_ACCESSKEY_ID,
          });

          const stream = createReadStream(files.file.path);

          await s3
            .upload({
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: files.file.name,
              ACL: 'public-read',
              Body: stream,
            })
            .promise()
            .then((response) => resolve(response.Location))
            .catch((e) => console.log(e));
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
