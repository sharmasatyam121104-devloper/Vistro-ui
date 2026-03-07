'use client'
import { Button } from '@/components/ui/button'
import fetcher from '@/lib/fetcher'
import { Divider, Form, Input, Modal, Table, Tag, Button as AntBtn } from 'antd'
import { Upload } from 'lucide-react'
import moment from 'moment'
import { useState } from 'react'
import useSwr from 'swr'

const Library = () => {

  const {data, error, isLoading} = useSwr('/video', fetcher)
  const [open, setOpen] = useState(false)
  const [videoForm] = Form.useForm()

  const handleCloseModel = ()=>{
    setOpen(false)
    videoForm.resetFields()
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      Key: 'tittle'

    },
    {
      title: 'Size',
      dataIndex: 'size',
      Key: 'size'

    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      Key: 'duration'

    },
    {
      title: 'Status',
      Key: 'status',
      render: (item: any)=>{
        <Tag>Draft</Tag>
      }
    },
    {
      title: 'Date',
      Key: 'date',
      render: (item: any)=>{
        moment(item).format('DD MMM YYY, hh:mm A')
      }

    },

  ]
  return (
    <div className='space-y-4'>
      <Button onClick={()=>setOpen(true)}>
        <Upload/>
        <p>Uplaod Video</p>
      </Button>

      <Table
        columns={[columns]}
        dataSource={[]}
      />
      <Modal
        open={open}
        title="Upload Video"
        footer={null}
        centered
        width={650}
        onCancel={handleCloseModel}
        maskClosable={false}
      >
        <Divider />

        <Form layout="vertical" form={videoForm} className='w-full!'>
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
            <Input type="file" accept=".mp4" size="large" />
          </Form.Item>

          <Divider />

          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <AntBtn type="primary" htmlType="submit">
                Upload Video
              </AntBtn>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Library