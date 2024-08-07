import { NextResponse } from 'next/server';
import fs from 'fs';
import { putObject } from '@/app/utils/s3-file-management';
import { IncomingForm } from 'formidable';
import getRawBody from 'raw-body';
import { Readable } from 'stream';
import User from '@/app/models/User';
import connectToDatabase from '@/app/libs/mongoose';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: any) {

    const Formdata = await req.formData();
    const username = Formdata.get('username');
    const bio = Formdata.get('bio');
    const userId = Formdata.get('userId');
    const file = Formdata.get('profilePicture') as any;
    const preview = Formdata.get('preview') as any;

    const filePath = `profiles/${userId}/${file.name}`;

    try {
     
        const url = await putObject(file.name, filePath, file.type, preview);
        console.log("url: ", url)
        return NextResponse.json({ url, username, bio })

    } catch (error) {
        return NextResponse.json({ error: 'Bir Hata Oluştu!!' }, { status: 500 })
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Method GET not allowed' }, { status: 405 });
}
