import VideoPlayer from '@/components/shared/video-player'


const HomeRouter = () => {
  return (
    <div className='w-8/12'>
      <VideoPlayer 
        src="https://vistro-server.s3.ap-southeast-1.amazonaws.com/streams/sample.m3u8"
      />
    </div>
  )
}

export default HomeRouter
