import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const timestamp = await prisma.timestamp.create({
      data: {
        trackId: body.trackId,
        time: body.time,
        description: body.description
      }
    });
    return NextResponse.json(timestamp);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating timestamp' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    await prisma.timestamp.delete({
      where: { id: body.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting timestamp' }, { status: 500 });
  }
}