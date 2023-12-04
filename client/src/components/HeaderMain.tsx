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
import RegisterModal from "./modals/RegisterModal";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/services/cartService";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { useRouterWithProgress } from "@/hooks/useRouterWithProgress";

const HeaderMain = () => {
    const { queryParams, setQueryParams } = useQueryParams()
    const searchquery = queryParams?.get('search') || ''
    const [search, setSearch] = React.useState(searchquery)

    const { isLoginModalOpen,
        isRegisterModalOpen,
        setisLoginModalOpen,
        setisRegisterModalOpen } = useAuth()

    useEffect(() => {
        if (searchquery !== search && search !== '')
            setSearch(searchquery)
    }, [searchquery])


    const { currentUser } = useCurrentUser()

    const { data, isLoading: cartLoading } = useQuery({
        queryKey: ['cart', 'getCart'],
        queryFn: getCart,
    })

    const numberofCart = data?.cart?.length || 0

    return (
        <div className="border-b border-gray-200 py-6 bg-merakiblack px-2">
            <div className="container flex flex-row lg:justify-between justify-center gap-3 items-center mx-auto">
                <Link href='/' className="font-bold text-4xl text-center text-black">
                    <Image src={merakilogo} alt="" />
                </Link>
                <div className=" relative mx-auto text-gray-600 w-full lg:w-1/2">
                    <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-full w-full text-sm focus:outline-none shadow-innershadow"
                        type="search" name="search" placeholder="Search" />
                    <button type="submit" className="absolute right-0 top-0 m-3 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                            <g clip-path="url(#clip0_1449_3291)">
                                <path d="M17.6985 16.5367L14.0475 12.8947C15.2544 11.3184 15.8174 9.34253 15.6227 7.36685C15.4281 5.39118 14.4902 3.56321 12.9989 2.2528C11.5076 0.942388 9.57417 0.247378 7.58986 0.30839C5.60556 0.369402 3.71851 1.18188 2.31052 2.58144C0.902534 3.98099 0.0787371 5.86313 0.00580856 7.84703C-0.0671199 9.83094 0.616265 11.7685 1.9177 13.2676C3.21913 14.7668 5.04143 15.7156 7.0159 15.9222C8.99037 16.1287 10.9696 15.5775 12.5531 14.3801L16.213 18.0132C16.3091 18.1132 16.4245 18.1925 16.5522 18.2463C16.6799 18.3002 16.8172 18.3274 16.9558 18.3264C17.0957 18.3276 17.2344 18.3004 17.3636 18.2466C17.4928 18.1928 17.6097 18.1134 17.7074 18.0132C17.8971 17.8137 18.0021 17.5485 18.0004 17.2732C17.9988 16.9979 17.8905 16.734 17.6985 16.5367ZM7.85509 13.8522C6.35357 13.8498 4.91442 13.2513 3.85394 12.1884C2.79346 11.1254 2.19843 9.68479 2.19961 8.18327C2.2008 6.68175 2.79811 5.24213 3.86027 4.18081C4.92243 3.11949 6.36252 2.52331 7.86404 2.52331C9.36557 2.52331 10.8057 3.11949 11.8678 4.18081C12.93 5.24213 13.5273 6.68175 13.5285 8.18327C13.5297 9.68479 12.9346 11.1254 11.8741 12.1884C10.8137 13.2513 9.37451 13.8498 7.87299 13.8522H7.85509Z" fill="#121212" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1449_3291">
                                    <rect width="18" height="18.0215" fill="white" transform="translate(0 0.304932)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>

                <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
                    {
                        currentUser && currentUser?.profile ? (
                            <Dropdown
                                backdrop="blur"
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
                                        <Link href={'/profile'}>
                                            My Profile
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem key="system">My Orders</DropdownItem>
                                    <DropdownItem key="configurations">Address Book</DropdownItem>
                                    <DropdownItem key="help_and_feedback">
                                        Help & Feedback
                                    </DropdownItem>
                                    <DropdownItem key="logout" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        ) : (
                            <button onClick={() => setisLoginModalOpen(true)}>
                                <BiUser />
                            </button>
                        )}
                    <Link href={'/cart'} className="relative">
                        <HiOutlineShoppingBag />
                        <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
                            {numberofCart}
                        </div>
                    </Link>
                </div>
            </div>
            {
                isLoginModalOpen && (
                    <LoginModal handleClose={() => setisLoginModalOpen(false)} open={isLoginModalOpen} key={1234145} registerModal={isRegisterModalOpen} setRegisterModalOpen={setisRegisterModalOpen} />
                )
            }
            {
                isRegisterModalOpen && (
                    <RegisterModal open={isRegisterModalOpen} handleClose={() => setisRegisterModalOpen(false)} openLoginModal={isLoginModalOpen} setisLoginModalOpen={setisLoginModalOpen} />
                )
            }
        </div>
    );
};

export default HeaderMain;
