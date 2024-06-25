// File: app/tracks/[id]/page.tsx
import { Metadata, ResolvingMetadata } from 'next'
import prisma from '@/lib/prisma'
import TrackDetailClient from './TrackDetailClient'

interface Props {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
 
  const track = await prisma.track.findUnique({
    where: { id: String(id) },
  })
 
  return {
    title: track ? `${track.title} - ${track.artist}` : 'Track Details',
  }
}

export default async function TrackDetailPage({ params }: Props) {
  const track = await prisma.track.findUnique({
    where: { id: String(params.id) },
    include: { timestamps: true }
  })

  if (!track) {
    return <div>Track not found</div>
  }

  return <TrackDetailClient track={track} />
}