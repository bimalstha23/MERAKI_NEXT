'use client'
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineHome, AiOutlineAppstore } from "react-icons/ai";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Image } from "@nextui-org/react";
import { BiUser } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/cartService";
import Link from "next/link";

const MobNavbar = () => {
    const currentUser = useCurrentUser()
    const { data, isLoading: cartLoading } = useQuery({
        queryKey: ['cart', 'getCart'],
        queryFn: getCart,
    })

    const numberofCart = data?.cart?.length || 0
    return (
        <div className="lg:hidden fixed bottom-0 w-full bg-white left-[50%] -translate-x-[50%] z-50 max-w-full mob_navbar px-8">
            <div className="flex justify-between text-[28px] py-2">
                <Link href={'/'}>
                    <AiOutlineHome />
                </Link>
                <Link href={'/products'}>
                    <AiOutlineAppstore />
                </Link>
                <Link href={'/cart'} className="relative">
                    <HiOutlineShoppingBag />
                    <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
                        {numberofCart}
                    </div>
                </Link>
                {
                    currentUser && currentUser?.profile ? (
                        <Dropdown
                            backdrop="blur"
                            placement="bottom-end"
                        >
                            <DropdownTrigger>
                                <Avatar
                                    name={currentUser?.name}
                                    alt={currentUser?.name}
                                    as="button"
                                    className="transition-transform"
                                    src={currentUser?.profile}
                                    size="sm"
                                    showFallback
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{currentUser?.email}</p>
                                </DropdownItem>
                                <DropdownItem key="settings">
                                    My Profile
                                </DropdownItem>
                                <DropdownItem key="analytics">
                                    Analytics
                                </DropdownItem>
                                <DropdownItem key="system">System</DropdownItem>
                                <DropdownItem key="configurations">Configurations</DropdownItem>
                                <DropdownItem key="help_and_feedback">
                                    Help & Feedback
                                </DropdownItem>
                                <DropdownItem key="logout" color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                            {/* <Image width={30} height={30} src={currentUser?.profile} alt={currentUser?.name} className="rounded-full w-[30px] h-[30px]" /> */}
                        </Dropdown>
                    ) : (
                        <button>
                            <BiUser />
                        </button>
                    )}
            </div>
        </div>
    );
};

export default MobNavbar;
