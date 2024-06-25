import { Inter } from 'next/font/google'
import './globals.css'
import PersistentAudioPlayer from '@/components/PersistentAudioPlayer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Audio Player',
  description: 'Listen to your favorite tracks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="pb-20"> {/* Add padding to bottom to account for player */}
          {children}
        </main>
        <PersistentAudioPlayer />
      </body>
    </html>
  )
}