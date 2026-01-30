'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, Input, Select } from 'antd'
import { ArrowRight } from 'lucide-react'

interface handleCreateInterface {
  bucketName: string,
  region: string,
}


const CreateBucket = () => {

  const handleCreate = (value: handleCreateInterface)=>{
    console.log(value);
  }

  return (
    <Card>

      <CardHeader>
        <CardTitle className='text-lg'>Let&#39;s create you first video library</CardTitle>
        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quia quod fugit? Iste officia aliquam impedit nemo, obcaecati exercitationem esse maiores hic quis. Molestias iste distinctio voluptate nobis aperiam quaerat!</CardDescription>
      </CardHeader>

      <CardContent>
        <Form onFinish={handleCreate}>
          <div className='grid md:grid-cols-2 md:gap-8'>
            <Form.Item name="bucketName" rules={[{required:true}]}>
              <Input
                size='large'
                placeholder='Enter your bucket name'
              />
            </Form.Item>

            <Form.Item name="region" rules={[{required:true}]}>
              <Select
                size='large'
                placeholder="Select a region"
                options={[
                  { value: 'ap-south-1', label: 'ap-south-1 (India)' },
                  { value: 'us-east-1', label: 'us-east-1 (USA' },
                  { value: 'ap-southeast-1', label: 'ap-southeast-1 (Singapore)' },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Button size={"lg"} className='bg-gray-500 text-lg '>
                <ArrowRight />
                Create
              </Button>
            </Form.Item>
          </div>
        </Form>
      </CardContent>

    </Card>
  )
}

export default CreateBucket