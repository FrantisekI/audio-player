'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlayPauseButton from '@/components/PlayPauseButton';

interface Track {
    id: string;
    title: string;
    artist: string;
    filePath: string;
}

export default function AudioPlayer() {
    const [tracks, setTracks] = useState<Track[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch('/api/tracks')
            .then((res) => res.json())
            .then(setTracks);
    }, []);

    const showMoreInfo = (track: Track) => {
        router.push(`/tracks/${track.id}`);
        // Start playing the track when showing more info
        localStorage.setItem('currentTrack', JSON.stringify(track));
        window.dispatchEvent(new Event('storage'));
        //window.dispatchEvent(new CustomEvent('audio-control', { detail: { action: 'play' } }));
    };

    return (
        <div className="p-4 bg-gray-900 text-white min-h-screen">
            <h2 className="text-3xl font-bold mb-6">Audio Player</h2>
            <ul className="space-y-4">
                {tracks.map((track) => (
                    <li
                        key={track.id}
                        className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                    >
                        <span className="text-xl">{track.title} - {track.artist}</span>
                        <div className="space-x-2">
                            <PlayPauseButton track={track} />
                            <Button 
                                onClick={() => showMoreInfo(track)}
                                className="w-12 h-12 flex items-center justify-center"
                            >
                                <Info size={24} />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}