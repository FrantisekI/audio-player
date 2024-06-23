/*import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request){
  const body = await request.json() as { paramsToSign: Record<string, string> };
  const { paramsToSign } = body;
  const signature = cloudinary.utils.api_sign_request(paramsToSign, 
    process.env.CLOUDINARY_API_SECRET as string);
  return Response.json({ signature });
}*/

import { v2 as cloudinary } from 'cloudinary';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const body = await request.json() as {
    paramsToSign: Record<string, string>,
    metadata: Prisma.TrackCreateInput
  };
  
  const { paramsToSign, metadata } = body;
  const signature = cloudinary.utils.api_sign_request(paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string);

  // Create default example data for testing
  const exampleTrack: Prisma.TrackCreateInput = {
    title: `Example Track ${Date.now()}`,
    artist: 'Test Artist',
    album: 'Test Album',
    duration: 180, // 3 minutes in seconds
    filePath: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/example_path`, // Generic path
  };

  try {
    const track = await prisma.track.create({
      data: exampleTrack
    });

    console.log('Created example track:', track);

    return Response.json({ signature, createdTrack: track });
  } catch (error) {
    console.error('Error creating example track:', error);
    return Response.json({ signature, error: 'Failed to create example track' }, { status: 500 });
  }
}