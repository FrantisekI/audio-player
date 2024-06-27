import AudioPlayer from '@/components/AudioPlayer';
import DisplayImage from '@/components/DisplayImage';
import UploadWidget from '@/components/UploadWidget';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <AudioPlayer />

      <UploadWidget />
    </main>
  );
}