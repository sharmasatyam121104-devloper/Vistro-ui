'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { Input } from './ui/input'
import {Form} from 'antd'
import { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from './ui/input-otp'
import Logo from './shared/logo'

interface handleSignupInterface {
    fullname: string
    mobile: string
}

interface handleVerifyOtpInterface {
    otp: number
}

const Signup = () => {
    const [sent, setSent] = useState(true)

    const handleSignup= (value: handleSignupInterface)=>{
        console.log(value);
    }

    const handleVerifyOtp = (value:handleVerifyOtpInterface)=>{
        console.log(value);
    }

  return (
    <div className="bg-gray-100 min-h-screen overflow-hidden flex items-center justify-center relative animate__animated animate__fadeIn">
      
      {
        sent ? 
            <Card className="md:w-112.5 sm:w-100 relative z-50 shadow-lg animate__animated animate__slideInUp animate__faster">
                <CardHeader>
                    <div className='w-full flex  justify-center'>
                        <Logo height={40} width={40} textSize='xxl' priority/>
                    </div>
                    <CardTitle className='text-4xl font-bold'>Otp Verification</CardTitle>
                    <CardDescription>Check your mobile phone</CardDescription>
                </CardHeader>
                <CardContent className=''>
                    <Form onFinish={handleVerifyOtp}>
                        <Form.Item name={"otp"} rules={[{required:true}]}>
                             <InputOTP id="disabled" maxLength={4} value="123456">
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} className='p-8'/>
                                    <InputOTPSlot index={1} className='p-8'/>
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={2} className='p-8'/>
                                    <InputOTPSlot index={3} className='p-8'/>
                                </InputOTPGroup>
                            </InputOTP>
                        </Form.Item>
                        <Form.Item >
                            <Button size={'lg'} className='py-6 w-full text-base font-semibold bg-zinc-700 hover:bg-zinc-900'>
                                <ArrowRight/>
                                Verify
                            </Button>
                        </Form.Item>
                    </Form>
                    
                </CardContent>
            </Card> :
            <Card className="md:w-112.5 sm:w-100 relative z-50 shadow-lg animate__animated animate__slideInUp animate__faster">
                <CardHeader>
                    <div className='w-full flex  justify-center'>
                        <Logo height={40} width={40} priority/>
                    </div>
                    <CardTitle className='text-4xl font-bold'>Register Now</CardTitle>
                    <CardDescription>Signup up to use services !</CardDescription>
                </CardHeader>
                <CardContent className=''>
                    <Form onFinish={handleSignup}>
                        <Form.Item name={"fullname"} rules={[{required:true}]}>
                            <Input
                                className='py-6 w-full h-16'
                                placeholder='Enter your name!'
                            />
                        </Form.Item>
                        <Form.Item name={"mobile"} rules={[{required:true}]}>
                            <PhoneInput
                                country={'in'}
                                inputClass='!w-full'
                            />
                        </Form.Item>
                        <Form.Item >
                            <Button size={'lg'} className='py-6 w-full text-base font-semibold bg-zinc-700 hover:bg-zinc-900'>
                                <ArrowRight/>
                                Next
                            </Button>
                        </Form.Item>
                    </Form>
                    
                </CardContent>
            </Card>

      }

      {/* Gradient Background Circle */}
      <div
        className="
          bg-linear-to-r from-indigo-500 via-sky-500 to-cyan-400
          w-140 h-195
          sm:w-190 sm:h-190
          md:w-270 md:h-270
          fixed
          md:left-1/2
          md:-bottom-175 sm:-bottom-112 bottom-1/2
          md:-translate-x-1/2
          rounded-full
        "
      />
    </div>
  )
}

export default Signup