import React, { FC } from 'react'
import ReactPlayer from 'react-player'
import { ReactPlayerProps } from 'react-player/types';



const VideoPlayer: FC<ReactPlayerProps> = ({ ...rest}) => {
  return (
    <ReactPlayer
        controls
        width = {"100%"}
        height={"100%"}
        style={{maxWidth: "100%", maxHeight: "100%"}}
        {...rest}
        className='w-full! max-w-5xl! mx-auto! aspect-video!'
    />
  );
}

export default VideoPlayer;
