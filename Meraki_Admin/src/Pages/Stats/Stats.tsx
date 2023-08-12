import { useQuery } from "@tanstack/react-query"
import { getStats } from "../../services/statsAPi"
import { useState } from "react"
import Select from 'react-select'
import { customStyles } from "../../Utils/custom"
import { Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { ChartComp } from "../../Components/DashBoard/Chart"

const timeOptions = [
    {
        value: 'lifetime',
        label: 'lifetime'
    },
    {
        value: 'last2days',
        label: 'Last 2 days'
    },
    {
        value: 'last7days',
        label: 'last7days'
    }, {
        value: "last1month",
        label: "last 1 month"
    },
    {
        value: 'last6month',
        label: 'last 6 month'
    },
    {
        value: 'last1year',
        label: 'Last Year'
    }
]

export const Stats = () => {
    const [filter, setFilter] = useState<string>('lifetime')

    const { data, isLoading } = useQuery({
        queryKey: ["stats", filter],
        queryFn: () => getStats(filter)
    })

    const handleChange = (selectedOption: any) => {
        setFilter(selectedOption.value)
    }

    return (
        <div className='w-full flex flex-col  px-10 gap-4'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold'>DashBoard</h1>
                <h1 className='text-base font-bold text-slate-400'>Check out the performance of your business here</h1>
            </div>
            <div className="flex justify-start items-start w-full">
                <Select options={timeOptions} defaultInputValue={
                    'lifetime'
                }
                    value={timeOptions.find((option) => option.value === filter)}
                    onChange={handleChange} styles={customStyles} className='z-50' />
            </div>
            {!isLoading ?
                <div className="flex flex-row flex-wrap gap-4 justify-start items-start">
                    <div className="p-7 shadow-xl rounded-xl w-[300px] bg-success text-black ">
                        <h1 className="text-slate-700 text-base">
                            Total Profit
                        </h1>
                        <h1 className="font-extrabold text-3xl">
                            Rs. {data?.totalProfit || 0}
                        </h1>
                    </div>
                    <div className="p-7 shadow-xl rounded-xl w-[300px]  text-black ">
                        <h1 className="text-slate-700 text-base">
                            Total Sales
                        </h1>
                        <h1 className="font-extrabold text-3xl">
                            Rs. {data?.TotalSales || 0}
                        </h1>
                    </div>  <div className="p-7 shadow-xl rounded-xl w-[300px]  text-black ">
                        <h1 className="text-slate-700 text-base">
                            Products Sold
                        </h1>
                        <h1 className="font-extrabold text-3xl">
                            {data?.TotalProductsSold || 0}
                        </h1>
                    </div>  <div className="p-7 shadow-xl rounded-xl w-[300px]  text-black ">
                        <h1 className="text-slate-700 text-base">
                            Total Orders
                        </h1>
                        <h1 className="font-extrabold text-3xl">
                            {data?.TotalOrders || 0}
                        </h1>
                    </div>  <div className="p-7 shadow-xl rounded-xl w-[300px]  text-black ">
                        <h1 className="text-slate-700 text-base">
                            Total Users
                        </h1>
                        <h1 className="font-extrabold text-3xl">
                            {data?.Totalusers || 0}
                        </h1>
                    </div>
                </div> :
                <div
                    className="flex flex-row flex-wrap gap-4 justify-start items-start"
                >
                    {Array.from(Array(5).keys()).map((_i: number) => (
                        <Skeleton
                            key={_i}
                            variant="rectangular"
                            width={300}
                            height={118}
                            className="rounded-xl"
                        />
                    ))
                    }
                </div>
            }

            <div className="flex flex-row gap-10 w-full mt-10">
                <div className="w-full ">
                    <TableContainer
                        className="shadow-2xl"
                        component={Paper}

                        sx={{
                            width: '100%',
                            minWidth: '100%',
                            borderRadius: '15px',
                            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                        }}
                    >
                        <Table
                            sx={{
                                width: '100%',
                                minWidth: '100%',
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '16px'
                                        }}>
                                        Product Id
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: 'bold',
                                        fontSize: '16px'
                                    }}>
                                        Image

                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '16px'
                                        }}>
                                        Product Name
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '16px'
                                        }}>
                                        Category
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '16px'
                                        }} >
                                        Status
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '16px'
                                        }} >
                                        Total Sales
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {!isLoading ? <TableBody>
                                {data?.topProducts?.map((product: any) => (
                                    <TableRow>
                                        <TableCell>
                                            {product.id}
                                        </TableCell>
                                        <TableCell>
                                            <img src={product.images[0].url} alt="" className="w-16" />
                                        </TableCell>
                                        <TableCell>
                                            {product.name}
                                        </TableCell>
                                        <TableCell>
                                            {product.category.name}
                                        </TableCell>
                                        <TableCell>
                                            {product.status}
                                        </TableCell>
                                        <TableCell>
                                            {product.soldCount}
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody> : <TableBody>
                                {Array.from(Array(10).keys()).map((_i: number) => (
                                    <TableRow>
                                        <TableCell>
                                            <Skeleton animation='wave'>

                                            </Skeleton>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton width={60} height={60} animation='wave'>

                                            </Skeleton>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton animation='wave'>

                                            </Skeleton>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton animation='wave'>

                                            </Skeleton>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton animation='wave'>

                                            </Skeleton>
                                        </TableCell>
                                        <TableCell>
                                            <Skeleton animation='wave'>

                                            </Skeleton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            }
                        </Table>

                    </TableContainer>
                </div>
                <div className="w-[70%]">
                    <ChartComp />
                </div>
            </div>
        </div>
    )
}
