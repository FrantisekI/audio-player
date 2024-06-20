import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const tracks = await prisma.track.findMany();
    return NextResponse.json(tracks);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching tracks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const track = await prisma.track.create({
      data: {
        title: body.title,
        artist: body.artist,
        album: body.album,
        duration: body.duration,
        filePath: body.filePath,
      },
    });
    return NextResponse.json(track);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating track' }, { status: 500 });
  }
}