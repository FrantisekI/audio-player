import AudioPlayer from '@/components/AudioPlayer';
import DisplayImage from '@/components/DisplayImage';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AudioPlayer />
      
      <DisplayImage />
    </main>
  );
}