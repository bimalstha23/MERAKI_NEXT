import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { changeStatus, getOrder } from "../../ApiHandle/OrderAPi"
import Select from 'react-select'
import { HiLocationMarker } from "react-icons/hi"
import { FaUserCircle } from "react-icons/fa"
import { RiTruckLine } from "react-icons/ri"
import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses } from "@mui/material"
import { useEffect, useState } from "react"
import { enqueueSnackbar } from "notistack"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        background: 'linear-gradient(180deg, #373737 0%, #121212 84.9%)',
        color: theme.palette.common.white,
        fontSize: '18px',
        fontWeight: '100',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const OrderDetail = () => {
    const id = useParams<{ id: string }>().id
    const { data, isLoading } = useQuery({
        queryKey: ['order', id],
        queryFn: () => getOrder(id),
        enabled: !!id,
        onError: () => {
            enqueueSnackbar('Error Fetching Order', {
                variant: 'error'
            })
        }
    })

    const statusOptions = [{
        value: 'PENDING',
        label: 'PENDING'

    }, {
        value: 'DELIVERED',
        label: 'DELIVERED'
    }, {
        value: 'CANCELLED',
        label: 'CANCELLED'
    }, {
        value: 'PACKED',
        label: 'PACKED'
    }, {
        value: 'SHIPPED',
        label: 'SHIPPED'
    }
    ]

    const date = new Date(data?.order?.createdAt)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    const [status, setStatus] = useState<any>({ value: data?.order?.status, label: data?.order?.status })

    useEffect(() => {
        if (data) {
            setStatus({ value: data?.order?.status, label: data?.order?.status })
        }
    }, [data])

    const { mutate, isLoading: mutationLoading } = useMutation({
        mutationFn: changeStatus,
        mutationKey: ['changeStatus , order'],
        onSuccess: () => {
            enqueueSnackbar('Status Changed Successfully', {
                variant: 'success'
            })
        }
    })

    const handleChangeStatus = () => {
        mutate({ id: data?.order?.id, status: status.value })
    }
    console.log(data)

    return (
        <div className="flex flex-col w-full p-20">
            <h1 className="text-2xl" > Order Details</h1 >
            <div className="flex flex-col justify-center items-center w-full gap-10 mt-10" >
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="flex flex-col w-full">
                        {isLoading ? <Skeleton width={150} variant="text">
                        </Skeleton> : <h1> {formattedDate}</h1>}
                    </div>
                    <div className="w-full flex flex-row justify-end items-center ">
                        <Select
                            className="w-44 z-50"
                            options={statusOptions}
                            defaultValue={{ value: data?.order?.status, label: data?.order?.status }}
                            value={status}
                            onChange={(selectedOption) => {
                                setStatus(selectedOption)
                            }}
                            isLoading={isLoading}
                        />
                        <button
                            disabled={status.value === data?.order?.status || isLoading || mutationLoading}
                            onClick={handleChangeStatus}
                            className="bg-green-500 text-white px-5 py-2 rounded-md ml-5"
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                    <div className=" flex flex-row justify-start items-start gap-7">
                        <div>
                            <FaUserCircle size={40} />
                        </div>
                        <div className="flex flex-col justify-start items-start  text-start">
                            <h1 className="text-2xl">Customer</h1>
                            {isLoading ? <Skeleton width={150} variant="text">
                            </Skeleton> : <h1 className="text-slate-600">{data?.order.user.role === 'ADMIN' ? data?.order?.customer_name : data?.order.user.name}</h1>}
                            {isLoading ? <Skeleton width={150} variant="text">
                            </Skeleton> : <h1 className="text-slate-600">{data?.order?.customer_email}</h1>}
                            {isLoading ? <Skeleton width={150} variant="text">
                            </Skeleton> : <h1 className="text-slate-600">{data?.order?.customer_phone}</h1>}
                        </div>
                    </div>
                    <div className=" flex flex-row justify-start items-start gap-7">
                        <div>
                            <RiTruckLine size={40} />
                        </div>
                        <div className="flex flex-col justify-start items-start  text-start">
                            <h1 className="text-2xl">Order info</h1>
                            {isLoading ? <Skeleton width={150} variant="text">
                            </Skeleton> : <h1 className="text-slate-600">{data?.order.createdByAdmin === true ? 'Order Created By Admin' : 'order created by' + data?.order.user.name}</h1>}
                        </div>
                    </div>
                    <div className=" flex flex-row justify-start items-start gap-7">
                        <div>
                            <HiLocationMarker size={40} />
                        </div>
                        <div className="flex flex-col justify-start items-start  text-start">
                            <h1 className="text-2xl">Deliver To</h1>
                            {isLoading ? <Skeleton width={150} variant="text"> </Skeleton> : <h1 className="text-slate-600">{data?.order?.customer_address}</h1>}
                            {isLoading ? <Skeleton width={150} variant="text">
                            </Skeleton> : <h1 className="text-slate-600">{data?.order?.customer_address_landmark}</h1>}
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <Table sx={{ minWidth: 700, }} aria-label="customized table" stickyHeader   >
                        <TableHead sx={{
                            backgroundColor: "#121212",
                        }}>
                            <TableRow sx={{ overflow: 'auto' }}>
                                <StyledTableCell align="center">ID </StyledTableCell>
                                <StyledTableCell align="center">Image </StyledTableCell>
                                <StyledTableCell align="center">Name </StyledTableCell>
                                <StyledTableCell align="center">Price </StyledTableCell>
                                <StyledTableCell align="center">Quantity </StyledTableCell>
                                <StyledTableCell align="center">Total </StyledTableCell>
                                {/* <StyledTableCell align="center">Edit </StyledTableCell> */}
                            </TableRow>
                        </TableHead>
                        {isLoading ? <TableBody>
                            {
                                Array.from(Array(5).keys()).map((index: number) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            sx={{
                                                fontWeight: '500',
                                                fontSize: '18px',
                                                color: '#121212'
                                            }} align="center"
                                        >
                                            <Skeleton>

                                            </Skeleton>
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                        >
                                            <Skeleton>

                                            </Skeleton>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: '500',
                                                fontSize: '18px',
                                                color: '#121212'
                                            }} align="center"
                                        >
                                            <Skeleton>

                                            </Skeleton>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: '500',
                                                fontSize: '18px',
                                                color: '#121212'
                                            }} align="center"
                                        >
                                            <Skeleton>

                                            </Skeleton>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: '500',
                                                fontSize: '18px',
                                                color: '#121212'
                                            }} align="center"
                                        >
                                            <Skeleton>

                                            </Skeleton>
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: '500',
                                                fontSize: '18px',
                                                color: '#121212'
                                            }} align="center"
                                        >
                                            <Skeleton>

                                            </Skeleton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody> :
                            <TableBody>
                                {
                                    data?.order?.orderProducts?.map((item: any, index: number) => (
                                        <TableRow key={index}>
                                            <TableCell
                                                sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center"
                                            >
                                                {item?.id}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                            >
                                                <img className="w-20" src={item?.product?.images[0].url} alt="" /></TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center"
                                            >
                                                {item?.product?.name}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center"
                                            >
                                                {item?.product?.selling_price || ' '}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center"
                                            >
                                                {item?.quantity}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center"
                                            >
                                                {item?.product?.selling_price * item?.quantity}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>}
                    </Table>
                    <div className="flex flex-col w-full justify-end">
                        {isLoading ? <Skeleton variant="text" width={150}></Skeleton> : <h1 className="font-bold text-xl text-right">
                            Total: {data?.order?.total_amount}
                        </h1>}
                        <p className="font-normal text-xs text-right">(Discounts Data are not available) </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
