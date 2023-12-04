'use client'
import React from 'react'
import done from '../../public/done.svg'
import { truncateText } from '@/utils/getGoogleUrl'
import cross from '../../public/cross.svg'
import { useMutation } from '@tanstack/react-query'
import { addtoCart } from '@/services/cartService'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { IErrorMessage, Product } from '@/types'
import { useAuth } from '@/Providers/AuthProvider'
import { Image } from '@nextui-org/react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { queryClient } from '@/services/queryClient'
import { useScreenWidth } from '@/hooks/useScreenWidth'
import { useRouterWithProgress } from '@/hooks/useRouterWithProgress'

const ProductCard = ({ product }: { product: Product }) => {
    const { currentUser } = useCurrentUser()
    const { setisLoginModalOpen } = useAuth()
    const { mutate } = useMutation({
        mutationKey: ['addtocart', 'cart'],
        mutationFn: (data: number) => addtoCart(data as unknown as number),
        onSuccess: (data) => {
            enqueueSnackbar('Added to cart', {
                variant: 'success'
            })
            queryClient.invalidateQueries(['cart', 'getCart'])
        },
        onError: (error: AxiosError<IErrorMessage>) => {
            enqueueSnackbar(error.response?.data.message || 'Something Went Wrong', {
                variant: 'error'
            })
        }
    })

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation(); // Stop the click event from propagating to the parent div
        // Handle your button click logic here
        if (currentUser) {
            mutate(product.id)
        } else {
            enqueueSnackbar('Please Login First', {
                variant: 'error'
            })
            setisLoginModalOpen(true)
        }
    };


    const screenWidth = useScreenWidth()

    // const router = useRouterWithProgress()
    const router = useRouterWithProgress()


    const handleNavigateToProduct = () => {
        console.log('clicked', product.slug)
        router.push(`/product/${product.slug}`, {
            scroll: true
        })
    }


    return (
        <div onClick={handleNavigateToProduct}
            className='relative flex flex-col justify-start items-start w-full shadow-meraki cursor-pointer' >
            {
                product.discount ?
                    <div className='ribbon overflow-hidden z-10'>
                        <span className='text-white font-bold text-lg'>
                            {product.discount}% OFF
                        </span>
                    </div> : null
            }

            <div className='w-full h-full' >
                <Image src={product.images[0]?.url} loading='lazy' alt={product.name} isZoomed radius='none' width={'100%'} className='w-full lg:h-[270px] h-[150px] object-cover z-0' />
            </div >

            <div className='flex flex-col justify-start items-start lg:p-4 p-2 gap-2 w-full'>
                {product.instock ? (
                    <h1 className='text-merakigreen gap-2 w-full  lg:text-lg text-sm flex flex-row justify-start items-center'>
                        <Image src={done.src} className='w-4' alt="on Stock" />
                        On Stock
                    </h1>
                ) : (
                    <h1 className='text-merakired gap-2 w-full  lg:text-lg text-sm flex flex-row justify-start items-start'>
                        <Image src={cross} alt="" />
                        Out of Stock
                    </h1>
                )}

                <div>
                    <h1 className='text-merakiTextGray lg:text-lg text-sm font-bold'>
                        {truncateText(product.name, screenWidth > 768 ? 30 : 20)}
                    </h1>
                    <h1 className='text-merakiTextGray text-xs p-0 m-0  w-full whitespace-nowrap text-ellipsis overflow-hidden'>
                        {truncateText(product.description, screenWidth > 768 ? 50 : 20)}
                    </h1>
                </div>
                <div className='flex flex-col w-full'>
                    {product.discount ? <div className='w-full flex flex-row justify-between items-center'>
                        {<h1 className='text-black lg:text-2xl text-lg font-semibold'>
                            Rs.{product.selling_price - (product.selling_price * product.discount / 100)}
                        </h1>}
                        <h1 className='text-merakired  lg:text-2xl  line-through decoration-4 text-lg font-semibold'>
                            Rs.{product.selling_price}
                        </h1>
                    </div> : <h1 className='text-black lg:text-2xl text-lg font-semibold'>
                        Rs.{product.selling_price}
                    </h1>}
                    <button onClick={handleButtonClick} className='w-full  rounded-xl text-center bg-merakiblack text-white lg:py-3 py-1 hover:bg-merakimain hover:text-merakiblack transition-all duration-400 font-semibold' >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div >
    )
}

export default ProductCard