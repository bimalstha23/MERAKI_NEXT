import React from 'react'
import SiteDesImage from '../../public/siteDesImage.jpeg'
import Image from 'next/image'
import instagram from '../assets/icon/instagram.svg'
import email from '../assets/icon/email.svg'
const SiteDescription = () => {
    return (
        <section className='container mx-auto mt-24 max-sm:p-2'>
            <div className='flex lg:flex-row lg:gap-10 flex-col justify-center items-center'>
                <div className='w-full'>
                    <Image src={SiteDesImage} className='w-full' alt="Meraki" />
                </div>
                <div className='flex flex-col gap-3 justify-start items-start w-full font-normal lg:text-2xl text-base'>
                    <div>
                        <h1 className='text-4xl font-bold lg:text-start text-center'>Homemade Products</h1>
                        <p className='lg:text-start text-center text-sm mt-4'>
                            Hey there! At Meraki, we love creating one-of-a-kind jewelry just for you! Whether it&apos;s a special occasion or you want something unique for yourself, our custom-made accessories are crafted from scratch.
                        </p>
                    </div>
                    <p className='lg:text-start text-center text-sm mt-4'>Shoot us a message on Instagram @meraki_2080 <br />
                        or drop an email at <a className='underline' href="mailto:merakiapp@gmail.com">merakiapp@gmail.com
                        </a> to discuss your dream design.</p>
                    <h1 className='text-merakired lg:text-start w-full text-center text-sm mt-4'>
                        Let&apos;s make something awesome together!
                    </h1>
                    <div className='flex flex-col max-sm:w-full gap-2 lg:justify-start justify-center lg:items-start items-center'>
                        <a href='https://www.instagram.com/meraki_2080/' target='_blank' className='flex flex-row justify-center items-center gap-2 bg-merakiblack text-white py-2 w-full rounded-xl px-3'>
                            Message us
                            <Image src={instagram} alt="meraki_instagram" />
                        </a>
                        <a target='_blank' className='flex flex-row justify-center items-center gap-2 bg-merakiblack text-white px-3 py-2 w-full rounded-xl'>
                            Email us
                            <Image src={email} alt="meraki_instagram" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SiteDescription