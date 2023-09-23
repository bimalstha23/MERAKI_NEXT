import Image from 'next/image'
import React from 'react'
import merakilogo from '../../public/merakilogo.svg'

const Footer = () => {
    return (
        <footer className='flex flex-col justify-center items-center bg-merakiblack mt-24 text-white py-24 gap-10'>
            <div className='flex lg:flex-row flex-col justify-between lg:gap-2 gap-10 items-center container mx-auto '>
                <div>
                    <Image className='lg:w-44 w-20' src={merakilogo} alt="meraki" />
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <h1 className='text-white font-bold text-lg'>Social</h1>
                    <div className='flex flex-col justify-center items-center'>
                        <a className='' href="">Instagram</a>
                        <a className='' href="">Facebook</a>
                        <a className='' href="">TikTok</a>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <h1 className='text-white font-bold text-lg'>Email</h1>
                    <div className='flex flex-col justify-center items-center'>
                        <a className='' href="">Merakiapp@gmail.com</a>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <h1 className='text-white font-bold text-lg'>Tech support</h1>
                    <div className='flex flex-col justify-center items-center'>
                        <a className='' href="">Sweven Visuls</a>
                        <a target='_blank' href="mailto:swevenvisuals@gmail.com">Swevenvisual@gmail.com</a>
                    </div>
                </div>
            </div>
            <h1 className='text-swevenvisuals text-center font-bold '>
                Website by Sweven Visuals
            </h1>
        </footer>
    )
}

export default Footer