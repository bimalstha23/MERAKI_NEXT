
import React from 'react'
import heroimage from '../../public/heroimage.svg'
import betterwhenits from '../../public/betterwhenits.svg'
import Image from 'next/image'
import { FaLongArrowAltRight } from 'react-icons/fa'

const HeroSection = () => {
    return (
        <div className="container mx-auto  flex flex-col justify-end  lg:p-44"
            style={{
                backgroundImage: `url(${heroimage.src})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='flex flex-col mt-10'>
                <Image className='max-lg:w-1/2' src={betterwhenits} alt="" />
                <div className=' p-9'>
                    <button className='bg-white text-black font-bold px-5 rounded-full py-3 w-fit flex flex-row justify-center items-center'>
                        Prdoucts
                        <FaLongArrowAltRight />
                    </button>
                    <h1 className='text-merakigreen font-bold lg:text-2xl'>
                        Purchase the product directly from this website and get discount of 20%
                    </h1>
                </div>
            </div>

        </div>
    )
}

export default HeroSection