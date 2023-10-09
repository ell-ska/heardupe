import { getServerSession } from 'next-auth'

import PlaylistCard from '@/components/Playlist/PlaylistCard'
import PlaylistGallery from '@/components/Playlist/PlaylistGallery'
import placeholderImage from '@/public/placeholder.jpeg'

const staticPlaylist = {
  id: '2RQXRUsr4IW1f3mKyKsy4B',
  type: 'artist',
  description: 'Indie, alternative',
  name: 'Noah Kahan',
  images: [
    {
      height: 640,
      width: 640,
      url: placeholderImage.src,
    },
  ],
}

const Home = async () => {
  const session = await getServerSession()

  return (
    <main className='main mt-8 grow'>
      <div className='mb-8 flex flex-col-reverse gap-8 md:flex-row'>
        <PlaylistCard {...staticPlaylist} className='flex-1' featured />
        <div className='flex flex-1 flex-col justify-center'>
          <span>Hello, and welcome to</span>
          <h1 className='mb-2 font-branding text-4xl xs:text-5xl'>Heardupe</h1>
          <h2 className='text-lg xs:text-xl'>
            Please pick a playlist to start
          </h2>
        </div>
      </div>
      {session && <PlaylistGallery />}
    </main>
  )
}

export default Home
