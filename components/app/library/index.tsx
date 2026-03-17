'use client'
import { Button } from '@/components/ui/button'
import { calcDuration, calcKSize } from '@/lib/calcFuntion'
import clientCatchError from '@/lib/clientCatchError'
import fetcher from '@/lib/fetcher'
import httpRequest from '@/lib/http'
import { Divider, Form, Input, Modal, Button as AntBtn, message, Skeleton, Empty, Pagination, Progress } from 'antd'
import axios, { AxiosProgressEvent } from 'axios'
import {  ImageUp,  PlayIcon, Timer, Upload } from 'lucide-react'
import moment from 'moment'
import { ChangeEvent, useEffect, useState } from 'react'
import useSwr, { mutate } from 'swr'
import { webSocket } from '../app-layout'
import VideoPlayer from '@/components/shared/video-player'
import {  Card } from '@/components/ui/card'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from '@/components/ui/tooltip'


export interface ThumbnailInterface {
    high?: {
        path: string,
        width: number,
        height: number,
    },
    medium?: {
        path: string,
        width: number,
        height: number,
    },
    low?: {
        path: string,
        width: number,
        height: number,
    },
}

export interface VideoInterface  {
    _id: string
    user: string
    title: string
    description: string
    size: number
    duration: number
    path: string
    status: "draft" | "converting" | "published"
    thumbnail: ThumbnailInterface
    createdAt: string
}



interface UploadVideoValueInterafce {
  title: string
  description: string
  duration: number
  size: number
  file?: File
}

const Library = () => {

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const [open, setOpen] = useState(false)
  const [videoModal, setVideoModal] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [video, setVideo] = useState({
    src: undefined,
    title: null,
    videoId: null,
  })
  const [videoForm] = Form.useForm()
  const [file, setFile] = useState<File | null>(null)
  const {data, error, isLoading} = useSwr(
    `/video?page=${page}&limit=${limit}`,
    fetcher
  )


  const onVideoTransCodind = ()=>{
    mutate(`/video?page=${page}&limit=${limit}`)
  }

  useEffect(()=>{
    webSocket.on("video-transcoding", onVideoTransCodind)

    return ()=>{
      webSocket.off("video-transcoding", onVideoTransCodind)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  //For pagination
  const onPaginate = (p: number, l: number)=>{
    setPage(p)
    setLimit(l)
  }

  //For closing modal
  const handleCloseModel = ()=>{
    if(progress > 0 ){
      return message.info("plase wait file is uploading...")
    }

    setOpen(false)
    videoForm.resetFields()
    setFile(null)
  }

  //For handling video file
  const handleFile = (e: ChangeEvent<HTMLInputElement>)=>{
    const input = e.target
    if(input.files) {
      setFile(input.files[0])
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const palyVideo = async(item: any, status: string)=>{
    try {
      if(status !== "published"){
        return message.info("please wait, you can only pay video when its staus is publisheed.")
      }
      const {data} = await httpRequest.post('/video/stream', {path: item.path})
      setVideo({
        title: item.title,
        videoId: item._id,
        src: data.url
      })
      setVideoModal(true)
    } 
    catch (error) {
     return clientCatchError(error)  
    }
  }
  
  //For geting video metadata
  const getVideoDuration = (video: File): Promise<number> => {
    return new Promise((resolve) => {
      const videoTag = document.createElement("video");
      const url = URL.createObjectURL(video);

      videoTag.src = url;
      videoTag.preload = "metadata";

      videoTag.onloadedmetadata = () => {
        const duration = videoTag.duration;
        URL.revokeObjectURL(url);
        resolve(duration);
      };
    });
  };

  //For calling api for video upload
  const uploadVideo = async(values: UploadVideoValueInterafce)=>{
    try {
      if(!file) {
        return null
      }

      const options = {
        headers: {
          'Content-Type': file.type
        },
        onUploadProgress: (e: AxiosProgressEvent)=>{
          if (!e.total) return;
          
          const p = Math.floor((e.loaded*100)/e?.total);
          setProgress(p)
        }
      }
      
      setLoading(true)
      const duration = await getVideoDuration(file)
      values.duration = Number(duration)
      values.size = file.size
      delete values.file

      const {data} = await httpRequest.post('/video', values)
      const uploadUrl = data.uploadUrl
      await axios.put(uploadUrl, file, options)
      message.success("Video upload successfully.!")
      setProgress(0)
      handleCloseModel()
      mutate(`/video?page=${page}&limit=${limit}`)
    } 
    catch (error) {
      return clientCatchError(error)
    }
    finally{
      setLoading(false)
    }
  }

  const closeVideoModel = ()=>{
    setVideoModal(false)
    setVideo({
      src: undefined,
      videoId: null,
      title: null
    })
  }

  const handleChangeThubnail = async(id: string)=>{
    try {
      const input = document.createElement('input')
      input.type = "file"
      input.accept = "image/*"
      input.click()

      input.onchange = ()=>{
        if(!input.files) {
          throw new Error("File not found")
        }

        const file = input.files[0]
        input.remove()
        const url = URL.createObjectURL(file)
        const img = new window.Image()
        img.src = url
        img.onload = async()=>{
          if(img.width !== 1280 || img.height !== 720){
            return message.error("Image resolution must be 1280/720")
          }

          const option = {
            headers: {
              'Content-Type': file.type
            },
            onUploadProgress: (e: AxiosProgressEvent)=>{
              if (!e.total) return;
              
              const p = Math.floor((e.loaded*100)/e?.total);
              setProgress(p)
            }
          }

          const {data} = await httpRequest.post("/video/thumbnail", {videoId: id})
          await axios.put(data.uploadUrl, file, option)
          message.success("Tumbnail chnged.!")
          mutate(`/video?page=${page}&limit=${limit}`)
        }
      }
    } 
    catch (error) {
      return clientCatchError(error)  
    }
  }

  if(isLoading) {
    return <Skeleton active />
  }

  if (error) {
    return (
      <Empty 
        description={
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while fetching videos."
        } 
      />
    )
  }
  


  return (
    <div className='space-y-4'>
      <Button onClick={()=>setOpen(true)}>
        <Upload/>
        <p>Uplaod Video</p>
      </Button>

      { 
        data?.total === 0 
          ?
          <Empty description={"You haven’t uploaded any videos yet. Please upload a video to get started."}/>
          : 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
            {data?.data?.map((item: VideoInterface, index: number) => {
              const image = item?.thumbnail?.medium || item?.thumbnail?.high || item?.thumbnail?.low;
              const durationData = calcDuration(item.duration);

              return (
                <Card 
                  key={index} 
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:shadow-2xl hover:border-primary/50"
                >
                  {/* Thumbnail Area - Clickable */}
                  <div 
                    className="relative aspect-video w-full overflow-hidden cursor-pointer" 
                    onClick={() => palyVideo(item, item.status)}
                  >
                    <Image
                      src={image ? `${process.env.NEXT_PUBLIC_CDN}/${image.path}` : "/thumb_sample.jpg"}
                      fill
                      alt={item.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* DARK OVERLAY - Always exists but becomes visible on hover */}
                    <div className="absolute inset-0 z-10 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      {/* THE PLAY BUTTON - Solid white for maximum visibility */}
                      <div className="bg-primary text-white p-3 rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <PlayIcon size={40} fill="currentColor" />
                      </div>
                      
                      {/* Text indicator to make it super clear */}
                      <span className="absolute bottom-3 w-full text-center text-[10px] font-black uppercase tracking-widest text-white drop-shadow-md">
                          Play Video
                      </span>
                    </div>

                    {/* Time Badge - Always on top */}
                    <div className="absolute bottom-2 right-2 z-20 rounded bg-black/90 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {durationData.display}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1 overflow-hidden">
                        <h3 className="text-sm font-bold truncate capitalize group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-tighter">
                          {calcKSize(item.size)} • {moment(item.createdAt).format("MMM DD, YYYY")}
                        </p>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeThubnail(item._id);
                              }}
                            >
                              <ImageUp size={16} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">Update Thumbnail</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {/* Bottom Bar: Status & Duration Text */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      {item.status === "draft" && (
                        <Badge variant="outline" className="text-[9px] h-5 bg-slate-50 text-slate-500 border-slate-200">DRAFT</Badge>
                      )}
                      {item.status === "converting" && (
                        <Badge variant="outline" className="text-[9px] h-5 bg-amber-50 text-amber-600 border-amber-200 animate-pulse"><Spinner data-icon="inline-start"/>CONVERTING</Badge>
                      )}
                      {item.status === "published" && (
                        <Badge className="text-[9px] h-5 bg-emerald-600 text-white border-none shadow-sm">PUBLISHED</Badge>
                      )}
                      
                      <div className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground">
                        <Timer size={12} strokeWidth={3} />
                        {durationData.text.split(' ')[0]} {durationData.text.split(' ')[1]}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
      }


      
      {/* Pegination */}
      <div className='flex justify-end mt-2'>
        <Pagination
          total={data?.total}
          onChange={onPaginate}
          pageSize={limit}
          current={page}
          showSizeChanger
          pageSizeOptions={["5","10","15","20","25","50"]}
        />
      </div>

      <Modal
        open={open}
        title="Upload Video"
        footer={null}
        centered
        width={650}
        maskClosable={false}
        onCancel={handleCloseModel}
      >
        <Divider />

        <Form layout="vertical" form={videoForm} className='w-full!' onFinish={uploadVideo}>
          <Form.Item
            label="Video Title"
            name="title"
            rules={[{ required: true, message: "Please enter video title" }]}
          >
            <Input placeholder="Enter video title" size="large" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <Input.TextArea
              placeholder="Enter video description"
              size="large"
              rows={4}
            />
          </Form.Item>

          <Form.Item
            label="Upload Video (.mp4 only)"
            name="file"
            rules={[{ required: true, message: "Please select a video file" }]}
          >
            <Input type="file" accept=".mp4" size="large"  onChange={handleFile}/>
          </Form.Item>

          <Divider />

          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <AntBtn type="primary" htmlType="submit" loading={loading} disabled={loading}>
                Upload Video
              </AntBtn>
            </div>
          </Form.Item>
        </Form>
        <Progress percent={progress}/>
      </Modal>

      <Modal
        open={videoModal}
        footer={null}
        onCancel={closeVideoModel}
        centered
        width={920}
        className="video-modal"
        title={
          <div className="flex flex-col gap-1">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 leading-snug">
              {video.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Watch in high quality streaming
            </p>
          </div>
        }
      >

        <div className="flex flex-col gap-5">

          {/* Video Player */}
          <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-200 bg-black shadow-sm">
            <VideoPlayer
              src={video.src || ""}
              autoPlay
            />
          </div>

          {/* Video Details */}
          <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">

            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                Streaming Quality
              </span>
              <span className="text-xs text-gray-500">
                Adaptive bitrate enabled
              </span>
            </div>

            <div className="text-xs text-gray-400">
              HLS Video
            </div>

          </div>

        </div>

      </Modal>
    </div>
  )
}

export default Library