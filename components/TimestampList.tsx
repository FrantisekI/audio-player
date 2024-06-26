import React from 'react';
import { Button } from '@/components/ui/button';

interface Timestamp {
  id: string;
  time: number;
  description: string;
}

interface TimestampListProps {
  timestamps: Timestamp[];
  trackId: string;
}

export default function TimestampList({ timestamps, trackId }: TimestampListProps) {
  const playFromTimestamp = (time: number) => {
    console.log('playFromTimestamp', time);
    window.dispatchEvent(new CustomEvent('audio-control', { 
      detail: { action: 'playFrom', trackId, time } 
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Timestamps</h2>
      <ul>
        {timestamps.map((timestamp) => (
          <li key={timestamp.id} className="mb-2">
            <Button 
              onClick={() => playFromTimestamp(timestamp.time)}
              className="mr-2"
            >
              {Math.floor(timestamp.time / 60)}:{(timestamp.time % 60).toString().padStart(2, '0')}
            </Button>
            {timestamp.description}
          </li>
        ))}
      </ul>
    </div>
  );
}