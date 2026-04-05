import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='w-11/12 max-w-3x1 text-center max-auto h-screen flex flex-col items-center justify-center gap-4'>

        <div>
            <Image src={assets.profile_img} alt='' className='rounded-full w-32'/>
        </div>
        <h3 className='flex items-end gap-2 text-x1 md:text-2xl mb-3 font-Ovo'>Hi! I'm Mohammed Zaid D. <Image src={assets.hand_icon}  alt='' className='w-6'/> </h3>
        <h1 className='text-3x1 sm:text-6x1 lg:text-[66px] font-Ovo'>
            Cloud Engineer based in Hamburg
        </h1>

        <p className='max-w-2x1 mx-auto font-Ovo'>
            I am a frontend developer from Hamburg, Germany with 4 years of experience in multiple companies like Chartworld,Fugro.
        </p>
        <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
            <a href="#contact" className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2'
            >contact me <Image src={assets.right_arrow_white}  alt='' className='w-4'/> </a>
            <a href="/sample-resume.pdf" download className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2'>
            
            my resume <Image src={assets.download_icon}  alt='' className='w-4'/> </a>
        </div>
      
    </div>
  )
}

export default Header
