import {
  DeleteObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { env } from '@/env/server'

const client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
})

export async function generatePresignedUrlUserImage({
  key,
  contentType,
  bucket,
}: {
  key: string
  contentType: string
  bucket: string
}) {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    // ACL: 'private',
    ContentType: contentType,
  })

  const url = await getSignedUrl(client, command, {
    expiresIn: 3600,
  })

  return url
}

export async function listFilesInBucket(bucket: string, prefix?: string) {
  const command = new ListObjectsCommand({
    Bucket: bucket,
    Prefix: prefix,
  })
  const response = await client.send(command)
  return response.Contents
}

export async function putFileToBucket(
  bucket: string,
  key: string,
  body?: any,
  contentType?: string,
  contentLanguage?: string
) {
  const command = new PutObjectCommand({
    ACL: 'public-read',
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    ContentLanguage: contentLanguage,
  })
  await client.send(command)
}

export async function deleteFileFromBucket(bucket: string, key: string) {
  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: key,
  })
  await client.send(command)
}
