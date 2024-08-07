import * as Minio from 'minio'



// Create a new Minio client with the S3 endpoint, access key, and secret key
export const s3Client = new Minio.Client({
    endPoint: process.env.NEXT_PUBLIC_S3_ENDPOINT as string,
    port: process.env.NEXT_PUBLIC_S3_PORT ? Number(process.env.NEXT_PUBLIC_S3_PORT) : undefined,
    accessKey: process.env.NEXT_PUBLIC_S3_ACCESS_KEY as string,
    secretKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY as string,
    useSSL: process.env.NEXT_PUBLIC_S3_USE_SSL === 'true',
})


export async function createBucketIfNotExists(bucketName: string) {
    const bucketExists = await s3Client.bucketExists(bucketName)
    if (!bucketExists) {
        await s3Client.makeBucket(bucketName);
    }
}

export async function putObject(fileName: any, filePath: any, mimetype: any) {
    try {

        const metaData = {
            'Content-Type': mimetype,
            'Content-Disposition': 'inline'
        };

        console.log("fileName: ", fileName)
        console.log("filePath: ", filePath)

        
        const result = await s3Client.fPutObject(
            process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
            filePath,
            `/Users/selim/Desktop/${fileName}`,
            metaData as any
        );

        console.log("result: ", result)

        if (process.env.NEXT_PUBLIC_LOG_LEVEL === "debug") {
            return `${process.env.NEXT_PUBLIC_DOMAIN}:9000/${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}/${filePath}`;
        } else {
            return `${process.env.NEXT_PUBLIC_DOMAIN}/${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}/${filePath}`;
        }


    } catch (error) {
        console.log("putObject Error: " + error);
    }
}