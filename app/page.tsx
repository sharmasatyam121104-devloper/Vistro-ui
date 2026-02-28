import VideoPlayer from '@/components/shared/video-player'


const HomeRouter = () => {
  return (
    <div className='w-8/12'>
      <VideoPlayer 
        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      />
    </div>
  )
}

export default HomeRouter
