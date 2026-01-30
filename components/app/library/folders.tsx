'use client'

import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, Input, Modal } from 'antd';
import { FolderOpen, PlusIcon, Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const gradients = [
  // 1. "The Enterprise Blue" (Very professional, great for data/services)
  "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100",

  // 2. "Modern Mint" (Fresh feel, looks very high-end)
  "bg-gradient-to-tr from-slate-50 via-emerald-50 to-cyan-100",

  // 3. "Soft Lavender" (Creative tools aur automation ke liye)
  "bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-100",

  // 4. "The Minimalist" (Clean and neutral)
  "bg-gradient-to-b from-gray-50 to-slate-200",

  // 5. "Sunset Horizon" (Slightly more vibrant for active states)
  "bg-gradient-to-br from-orange-50 via-rose-50 to-indigo-100",

];

const iconColors = [
  "text-indigo-600",
  "text-blue-600",
  "text-emerald-600",
  "text-teal-600",
  "text-purple-600",
  "text-rose-600",
  "text-orange-600",
  "text-sky-600",
]

const Folders = () => {
    const pathname = usePathname()
    const [folderForm] = Form.useForm()
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const handleCreateFolder = (value: string)=>{
        console.log(value);
        handleCloseModal()
    }

    const handleCloseModal = ()=>{
        setOpen(false)
        folderForm.resetFields()
    }
  return (
    <div className='space-y-9'>
       <Card className='shadow-none' >
            <CardHeader>
                <CardTitle>Folder&rsquo;s Utility</CardTitle>
            </CardHeader>
            <CardContent className='md:flex md:gap-8 md:space-y-0 space-y-4'>
                <Input size='large' placeholder='Search these contents' prefix={<Search/>}/>
                <Button onClick={()=>setOpen(true)} className='md:ml-0 ml-40'>
                    <PlusIcon/>
                    Add New Folder
                </Button>
            </CardContent>
       </Card>
        <div className='grid md:grid-cols-3 gap-8'onClick={()=>router.push(`${pathname}/html-tutorials`)}>
            {
                Array(24).fill(0).map((item, index: number)=>{
                    const gradientsIndex = index % gradients.length
                    const randomGradients = gradients[gradientsIndex]
                    return (
                    <Card key={index} className={`group ${randomGradients}transform transition-all duration-300 ease-in-out hover:scale-[1.09] cursor-pointer`}>
                        <CardHeader>
                        <FolderOpen
                            size={38}
                            className={`
                                ${iconColors[index % iconColors.length]}
                                transition-transform duration-300
                                group-hover:scale-110
                            `}
                            />
                            <CardAction className='text-xs'>
                            Jan 31, 2026
                            </CardAction>
                        </CardHeader>

                        <CardHeader>
                            <CardTitle className={`${iconColors[index % iconColors.length]}`}>
                                Html Tutorials
                            </CardTitle>
                            <CardDescription>22 Files</CardDescription>  
                            <CardAction className='text-xs text-gray-500 font-medium'>455 MB</CardAction>
                        </CardHeader>
                    </Card>
                )})
            }
        </div>
        <Modal open={open} title="Create a new folder" footer={null} onCancel={handleCloseModal}>
            <Form onFinish={handleCreateFolder} form={folderForm}>
                <Form.Item name="folderName" rules={[{required:true}]}>
                    <Input placeholder='Folder name?'/>
                </Form.Item>

                <Form.Item >
                    <Button variant={"secondary"} className='hover:bg-slate-900 hover:text-white '>
                       Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </div>
  )
}

export default Folders