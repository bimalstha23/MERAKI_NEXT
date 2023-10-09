'use client';
import { deleteCartItem, updateCartItem } from '@/services/cartService';
import { queryClient } from '@/services/queryClient';
import { IErrorMessage, IProduct, Product } from '@/types';
import { truncateText } from '@/utils/getGoogleUrl';
import { Image } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

interface CartItemProps {
    quantity: number;
    product: Product;
    id: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity, id }) => {
    const { mutate } = useMutation({
        mutationKey: ['addtocart', 'cart'],
        mutationFn: (data: any) => updateCartItem(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', 'getCart']);
        },
        onError: (error: AxiosError<IErrorMessage>) => {
            console.log(error);
            enqueueSnackbar(error.response?.data.message || 'Something Went Wrong', {
                variant: 'error'
            });
        }
    });


    const { mutate: deleteCart } = useMutation({
        mutationKey: ['deletecart', 'cart'],
        mutationFn: (data: any) => deleteCartItem(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', 'getCart']);
            enqueueSnackbar('Item Removed From Cart', {
                variant: 'success'
            });
        },
        onError: (error: AxiosError<IErrorMessage>) => {
            console.log(error);
            enqueueSnackbar(error.response?.data.message || 'Something Went Wrong', {
                variant: 'error'
            });
        }
    })


    return (
        <div
            className="relative flex flex-wrap w-full items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700 xl:justify-between border-opacity-40">
            <div className="w-full  mb-2 lg:mb-0   lg:w-32 ">
                <Image src={product.images[0].url} alt={product.name} loading='lazy'
                    className="object-cover w-full " />
            </div>
            <div className="w-full px-4  md:w-auto xl:mb-0">
                <h1 className="block  text-xl font-medium dark:text-gray-400 hover:underline" >
                    {product.name}
                </h1>
                <div className="flex flex-col items-start justify-start w-full">
                    <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
                        {truncateText(product.description, 20)}
                    </span>
                </div>
            </div>
            <div className="w-full px-4 mt-6 mb-6 xl:w-auto xl:mb-0 xl:mt-0">
                <div className="flex items-center">
                    <h4 className="mr-4 font-medium dark:text-gray-400">Qty:</h4>
                    <div
                        className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 ">
                        <button
                            onClick={() => {
                                if (quantity > 1)
                                    mutate({ cartItemId: id, quantity: quantity - 1 })
                            }}
                            className="py-2 pr-2 cursor-pointer border-r border-gray-300 dark:border-gray-600 dark:text-gray-400 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z">
                                </path>
                            </svg>
                        </button>

                        <h1 className='w-12 px-2 py-4 text-center border-0 '>
                            {quantity}
                        </h1>

                        <button
                            onClick={() => mutate({ cartItemId: id, quantity: quantity + 1 })}
                            className="py-2 pl-2 border-l cursor-pointer border-gray-300 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path
                                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full px-4 xl:w-auto">
                <span className="text-xl font-medium ">
                    <span className="text-sm">RS. </span>
                    <span>{(product.selling_price * quantity)}</span>
                </span>
            </div>

            <button
                onClick={() => deleteCart(id)}
                className="absolute top-0 right-0 text-gray-300 lg:mt-6 mt-2 lg:-mr-4 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    className="w-6 h-6 bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </button>
        </div >
    );
};

export default CartItem;
