'use client'
import { getCart } from '@/services/cartService'
import { ICartItem } from '@/types'
import { Image } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CartItem from './CartItem'

const CartPage = () => {

    const { data, isLoading: cartLoading } = useQuery<{ cart: ICartItem[] }>({
        queryKey: ['cart', 'getCart'],
        queryFn: getCart,
    })

    const totalAmount = data?.cart?.reduce((acc, item) => acc + item.product.selling_price * item.quantity, 0) || 0

    return (
        <div className="flex lg:flex-row flex-col shadow-md my-10">
            <div className="lg:w-3/4 w-full bg-white lg:px-10 py-10 px-2">
                <div className="flex justify-between border-b pb-8">
                    <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                    <h2 className="font-semibold text-2xl">3 Items</h2>
                </div>
                {data?.cart?.map((item: ICartItem) => (
                    <CartItem
                        product={item.product}
                        quantity={item.quantity}
                        key={item.id}
                        id={item.id}
                    />
                ))
                }

                <a href="products" className="flex font-semibold text-merakimain cursor-pointer hover:underline text-sm mt-10">
                    <svg className="fill-current mr-2 text-merakimain w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                    Continue Shopping
                </a>
            </div>

            <div id="summary" className="lg:w-1/4 w-full px-8 py-10 bg-gray-100">
                <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                <div className="flex justify-between mt-10 mb-5">
                    <span className="font-semibold text-sm uppercase"> {data?.cart?.length} Items </span>
                    <span className="font-semibold text-sm">
                        {totalAmount}
                    </span>
                </div>
                <div>
                    <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
                    <select className="block p-2 text-gray-600 w-full text-sm">
                        <option>Standard shipping - Rs.150</option>
                        <option>Outside valley  - Rs.500</option>
                    </select>
                </div>
                <div className="py-10">
                    <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                    <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                </div>
                <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
                <div className="border-t mt-8">
                    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>Total cost</span>
                        <span>$600</span>
                    </div>
                    <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                </div>
            </div>

        </div>
    )
}

export default CartPage