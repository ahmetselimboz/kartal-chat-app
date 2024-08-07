import { NextResponse } from 'next/server';
import fs from 'fs';
import { putObject } from '@/app/utils/s3-file-management';
import { IncomingForm } from 'formidable';
import getRawBody from 'raw-body';
import { Readable } from 'stream';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: any) {

    const Formdata = await req.formData();
    console.log(Formdata)
    const userId = Formdata.get('userId');
    const file = Formdata.get('profilePicture') as any;
    console.log("file: ", file)
    const filePath = `profiles/${userId}/${file.name}`;
    console.log("filePath: ", filePath)
    try {
  
        const url = await putObject(file.name, filePath, file.type);
        console.log("url: ", url)
        return NextResponse.json({ message: 'Profile picture uploaded successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Bir Hata Oluştu!!' }, { status: 500 })
    }
}


// const Formdata = await req.formData();
// console.log(Formdata)
// const userId = Formdata.userId;
// const file = Formdata.profilePicture as any;
// console.log("file: ", file)
// const filePath = `profiles/${userId}/${file.name}`;

// try {
//     const fileContent = fs.readFileSync(file.filepath);
//     await putObject(file.name, filePath, file.type);
//     NextResponse.json({ message: 'Profile picture uploaded successfully' })
// } catch (error) {
//     NextResponse.json({ error: 'Bir Hata Oluştu!!' }, { status: 500 })
// }

export async function GET() {
    return NextResponse.json({ message: 'Method GET not allowed' }, { status: 405 });
}
