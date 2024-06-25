'use client';

import React from 'react';
import PlayPauseButton from '@/components/PlayPauseButton'
import TimestampList from '@/components/TimestampList'

interface Timestamp {
  id: string;
  time: number;
  description: string;
}

interface Track {
  id: string;
  title: string;
  artist: string | null;
  album: string | null;
  duration: number | null;
  filePath: string;
  timestamps: Timestamp[];
}

interface Props {
  track: Track;
}

export default function TrackDetailClient({ track }: Props) {
  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{track.title}</h1>
      <p className="text-xl mb-2">Artist: {track.artist}</p>
      <p className="mb-2">Album: {track.album}</p>
      
      <div className="mb-4">
        <PlayPauseButton track={track} size={32} />
      </div>
      <TimestampList timestamps={track.timestamps} trackId={track.id} />
    </div>
  )
}