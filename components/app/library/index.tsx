'use client'
import { Button } from '@/components/ui/button'
import { calcDuration, calcKSize } from '@/lib/calcFuntion'
import clientCatchError from '@/lib/clientCatchError'
import fetcher from '@/lib/fetcher'
import httpRequest from '@/lib/http'
import { Divider, Form, Input, Modal, Table, Tag, Button as AntBtn, message, Skeleton, Empty, Pagination, Progress } from 'antd'
import axios from 'axios'
import { Upload } from 'lucide-react'
import moment from 'moment'
import { ChangeEvent, useState } from 'react'
import useSwr, { mutate } from 'swr'

export interface VideoInterface  {
    user: string
    title: string
    description: string
    size: number
    duration: number
    path: string
    status: VideoStatusEnum
}

export enum VideoStatusEnum {
    draft = "draft",
    progressing = "progressing",
    published = "published",
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
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(false)
  const [videoForm] = Form.useForm()
  const [file, setFile] = useState<File | null>(null)
  const {data, error, isLoading} = useSwr(
    `/video?page=${page}&limit=${limit}`,
    fetcher
  )
  
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
        onUploadProgress: (e: any)=>{
          const p = Math.floor((e.loaded*100)/e.total);
          setProgress(p)
        }
      }
      
      setLoading(true)
      const duration = await getVideoDuration(file)
      console.log("duration", duration);
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

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => (
        <span className="capitalize">{title}</span>
      )
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size: number) => calcKSize(size)
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration: number) => {
        const d = calcDuration(duration)
        return (
          <div>
            <div>{d.text}</div>
          </div>
        )
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: VideoStatusEnum) => {
        let color = "default";

        if (status === VideoStatusEnum.published) color = "green";
        if (status === VideoStatusEnum.progressing) color = "blue";
        if (status === VideoStatusEnum.draft) color = "orange";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date: string) => {
        return moment(date).format("DD MMM YYYY, hh:mm A");
      },
    }
  ];


  if(isLoading) {
    return <Skeleton active />
  }

  if(error) {
    return <Empty description={error.message}/>
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
          <Table
          columns ={columns}
          dataSource={data.data}
          rowKey={"_id"}
          pagination={false}
      />
      }
      
      {/* Pegination */}
      <div className='flex justify-end mt-2'>
        <Pagination
          total={data.total}
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
    </div>
  )
}

export default Library