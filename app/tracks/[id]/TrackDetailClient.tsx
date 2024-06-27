'use client';

import React, { useState } from 'react';
import PlayPauseButton from '@/components/PlayPauseButton'
import TimestampList from '@/components/TimestampList'
import AddTimestamp from '@/components/AddTimestamp'

interface Timestamp {
  id: string;
  time: number;
  description: string;
}

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  filePath: string;
  timestamps: Timestamp[];
}

interface Props {
  track: Track;
}

export default function TrackDetailClient({ track: initialTrack }: Props) {
  const [track, setTrack] = useState(initialTrack);

  const handleTimestampAdded = async () => {
    // Fetch updated track data
    const response = await fetch(`/api/tracks/${track.id}`);
    if (response.ok) {
      const updatedTrack = await response.json();
      setTrack(updatedTrack);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{track.title}</h1>
      <p className="text-xl mb-2">Artist: {track.artist}</p>
      <p className="mb-2">Album: {track.album}</p>
      <p className="mb-4">Duration: {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</p>
      <div className="mb-4">
        <PlayPauseButton track={track} size={32} />
      </div>
      <TimestampList timestamps={track.timestamps} trackId={track.id} />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Add New Timestamp</h2>
        <AddTimestamp trackId={track.id} onTimestampAdded={handleTimestampAdded} />
      </div>
    </div>
  )
}