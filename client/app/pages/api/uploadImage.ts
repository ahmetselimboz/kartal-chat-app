
import { putObject } from '@/app/utils/s3-file-management';
import {IncomingForm} from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const form = new IncomingForm();
  console.log(req)
  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) {
        res.status(500).json({ error: 'Error parsing form data' });
      return;
    }

    const userId = fields.userId;
    const file = files.profilePicture;
    const filePath = `profiles/${userId}/${file.originalFilename}`;

    try {
      const fileContent = fs.readFileSync(file.filepath);
      await putObject(filePath, file.filePath, file.mimetype)
      res.status(200).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: "Bir Hata Oluştu!!" });
    }
  });
}
