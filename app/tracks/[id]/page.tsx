import { Metadata, ResolvingMetadata } from 'next'
import prisma from '@/lib/prisma'
import PlayPauseButton from '@/components/PlayPauseButton'

interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
    filePath: string;
}

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
  }) as Track | null

  if (!track) {
    return <div>Track not found</div>
  }

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{track.title}</h1>
      <p className="text-xl mb-2">Artist: {track.artist}</p>
      <p className="mb-2">Album: {track.album}</p>
      <p className="mb-4">Duration: {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</p>
      <div className="mb-4">
        <PlayPauseButton track={track} size={32} />
      </div>
    </div>
  )
}