import React, { useState } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Mousewheel } from 'swiper/modules';
import { Image } from '@nextui-org/react';

export const ImageSwiper = ({ Image: img }: { Image: any }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    return (
        <>
            <Swiper
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Thumbs]}
                className="mySwiper2 rounded-lg h-[600px] !w-full"
            >
                {img?.map((image: any) => (
                    <SwiperSlide key={image.id}>
                        <Image width={'100%'} isZoomed isBlurred className='w-full   object-cover' src={image.url} alt="meraki" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                spaceBetween={5}
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                // freeMode={true}
                mousewheel={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
                className="mySwiper rounded-lg py-2 h-24"
            >
                {img?.map((image: any) => (
                    <SwiperSlide key={image.id}>
                        <Image width={'100%'} isZoomed isBlurred className='rounded-lg object-cover' src={image.url
                        } alt="meraki" />
                    </SwiperSlide>
                ))}
            </Swiper>

        </>
    )
}
