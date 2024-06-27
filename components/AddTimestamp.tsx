'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddTimestampProps {
  trackId: string;
  onTimestampAdded: () => void;
}

export default function AddTimestamp({ trackId, onTimestampAdded }: AddTimestampProps) {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const time = parseInt(minutes) * 60 + parseInt(seconds);

    try {
      const response = await fetch('/api/timestamps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackId,
          time,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add timestamp');
      }

      // Clear form
      setMinutes('');
      setSeconds('');
      setDescription('');

      // Notify parent component
      onTimestampAdded();
    } catch (error) {
      console.error('Error adding timestamp:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <div>
          <Label htmlFor="minutes">Minutes</Label>
          <Input
            id="minutes"
            type="number"
            min="0"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="seconds">Seconds</Label>
          <Input
            id="seconds"
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Add Timestamp</Button>
    </form>
  );
}