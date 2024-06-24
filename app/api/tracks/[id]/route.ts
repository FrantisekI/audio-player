import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  try {
    const track = await prisma.track.findUnique({
      where: { id: String(id) },
    });

    if (track) {
      return NextResponse.json(track);
    } else {
      return NextResponse.json({ message: 'Track not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching track', error }, { status: 500 });
  }
}