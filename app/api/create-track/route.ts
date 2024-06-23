import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { publicId, url, title, artist, album, duration } = body;

  if (!publicId || !url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const track = await prisma.track.create({
      data: {
        title: title || `Track ${Date.now()}`,
        artist: artist || 'Unknown Artist',
        album: album || 'Unknown Album',
        duration: duration || 0,
        filePath: url,
      },
    });
    console.log('Created track:', track);
    return NextResponse.json({ success: true, track });
  } catch (error) {
    console.error('Error creating track:', error);
    return NextResponse.json({ error: 'Failed to create track' }, { status: 500 });
  }
}