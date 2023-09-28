'use client';
import React, { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Image from "next/image";
import merakilogo from "../../public/merakilogo.svg"
import useQueryParams from "@/hooks/useQueryParams";
import LoginModal from "./modals/LoginModal";
import { useAuth } from "../Providers/AuthProvider";

const HeaderMain = () => {
    const { queryParams, setQueryParams } = useQueryParams()
    const searchquery = queryParams?.get('search') || ''
    const [search, setSearch] = React.useState(searchquery)

    const [isLoginModalOpen, setisLoginModalOpen] = React.useState(false)

    useEffect(() => {
        if (searchquery !== search && search !== '')
            setSearch(searchquery)
    }, [])

    const { currentUser, isLoading } = useAuth()

    return (
        <div className="border-b border-gray-200 py-6 bg-merakiblack">
            <div className="container sm:flex justify-between items-center mx-auto">
                <a href='/' className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
                    <Image src={merakilogo} alt="" />
                </a>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        // if (pathname === '/products') setQueryParams({ search })
                        // else
                        location.href = `/products?search=${search}`
                    }}
                    className="w-full sm:w-[300px] md:w-[70%] rounded-full relative bg-merakigray">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-gray-200 bg-merakigray border focus:outline-none p-2 px-4 rounded-full w-full"
                        type="text"
                        placeholder="Enter any product name..."
                    />
                    <button
                        type="submit"
                        className="absolute flex justify-center items-center right-0 top-0  text-black bg-white   h-full rounded-full p-4 cursor-pointer"
                    >
                        <BsSearch
                            size={15}
                        />
                    </button>
                </form>

                <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
                    {!isLoading &&
                        currentUser && currentUser?.profile ? (
                        <img src={currentUser?.profile} alt={currentUser?.name} className="rounded-full w-[30px]" />
                    ) : (
                        <button onClick={() => setisLoginModalOpen(true)}>
                            <BiUser />
                        </button>
                    )}
                    <div className="relative">
                        <HiOutlineShoppingBag />
                        <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
                            0
                        </div>
                    </div>
                </div>
            </div>
            {
                isLoginModalOpen && (
                    <LoginModal handleClose={() => setisLoginModalOpen(false)} open={isLoginModalOpen} key={1234145} />
                )
            }
        </div >
    );
};

export default HeaderMain;
