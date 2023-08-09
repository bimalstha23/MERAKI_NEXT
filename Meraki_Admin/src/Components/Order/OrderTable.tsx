import { useInfiniteQuery } from "@tanstack/react-query"
import { getOrders } from "../../ApiHandle/OrderAPi"
import { Box, Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableHead, TableRow, Typography, styled, tableCellClasses } from "@mui/material"
import { FC, Fragment, useEffect, useState } from "react";
import { TableSkeleton } from "../Products/TableSkeleton";
import { useOnScreen } from "../../Hooks/utilityHooks/useOnScreen";
import { Link } from "react-router-dom";

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

interface StatusCellProps extends TableCellProps {
    status: string;
}
interface OrderTableProps {
    status: string;
    orderFilters?: any;

}


const StatusCell = styled(Box)<StatusCellProps>(({ theme, status }) => ({
    fontWeight: '500',
    fontSize: '18px',
    color: '#121212',
    borderRadius: '10px',
    backgroundColor: status === 'PENDING' ? '#FCD34D' :
        status === 'DELIVERED' ? '#42B72A' :
            status === 'CANCELLED' ? '#FF4136' :
                status === 'PACKED' ? '#FF851B' :
                    status === 'SHIPPED' ? '#0074D9' :
                        theme.palette.common.white,
}));





export const OrderTable: FC<OrderTableProps> = ({ status, orderFilters }) => {

    const [filterstatus, setfilterstatus] = useState<string>(status === 'DELIVERED' || 'CANCELLED' ? status : "all")

    useEffect(() => {
        if (status === 'DELIVERED' || 'CANCELLED') {
            setfilterstatus(status)
        } else {
            setfilterstatus("all")
        }
    }, [status])



    const { data: orderData, isLoading, isFetching, hasNextPage, fetchNextPage, } = useInfiniteQuery({
        queryKey: ['orders', status, orderFilters],
        queryFn: ({ pageParam = 1 }) => getOrders({ page: pageParam, customerName: orderFilters?.searchTerm, sortOrder: orderFilters.sortOrder, filter: orderFilters.filter, pageSize: 14, status: filterstatus }),
        getNextPageParam: (lastPage) => lastPage.pagination.nextPage ? lastPage.pagination.nextPage : undefined,
    })

    const [maxHeight, setMaxHeight] = useState<number>(0);
    const { measureRef, isIntersecting, observer } = useOnScreen();






    useEffect(() => {
        const updateMaxHeight = () => {
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            const offset = 270; // You can adjust this offset value if needed
            setMaxHeight(windowHeight - offset);
        };
        updateMaxHeight();
        window.addEventListener('resize', updateMaxHeight);

        return () => {
            window.removeEventListener('resize', updateMaxHeight);
        };
    }, []);

    useEffect(() => {
        if (isIntersecting && hasNextPage) {
            fetchNextPage()
            console.log('fetching next page')
            observer.disconnect();
        }
    }, [isIntersecting, hasNextPage, fetchNextPage]);

    const avatarnames = [
        'Whiskers',
        'Fluffy',
        'George',
        'jasmine',
        'Toby',
        "Midnight",
        'Gracie',
        'Nala',
        'Sugar',
        'Zoey',
        'Sadie',
        'Garfield',
        'Simba',
        'Coco',
        'Snowball',
        'Sasha',
        'Kiki',
        'Peanut',
        'Sam',
        'buddy'
    ]

    const randomAvatarCollection = [
        'bottts',
        'bottts-neutral',
        'fun-emoji',
        'identicon',
        'thumbs',
    ]
    const randomavatarname = () => {
        const randomNumber = Math.floor(Math.random() * avatarnames.length);

        const a = avatarnames[randomNumber];
        return a
    }
    const randomavatar = () => {
        const randomNumber = Math.floor(Math.random() * randomAvatarCollection.length);
        const a = randomAvatarCollection[randomNumber]
        return a
    };

    return (
        <TableContainer component={Paper} sx={{
            maxHeight: `${maxHeight}px`,
        }}
        >
            <Table sx={{ minWidth: 700, }} aria-label="customized table" stickyHeader   >
                <TableHead sx={{
                    backgroundColor: "#121212",
                }}>
                    <TableRow sx={{ overflow: 'auto' }}>
                        <StyledTableCell align="center">ID </StyledTableCell>
                        <StyledTableCell>Avatar</StyledTableCell>
                        <StyledTableCell align="center">Customer Name</StyledTableCell>
                        <StyledTableCell align="center"> Customer Address</StyledTableCell>
                        <StyledTableCell align="center">Custommer Phone Number</StyledTableCell>
                        <StyledTableCell align="center">Total Amount </StyledTableCell>
                        <StyledTableCell align="center">Order Status </StyledTableCell>
                        <StyledTableCell align="center">Order Created By </StyledTableCell>
                        {/* <StyledTableCell align="center">Edit </StyledTableCell> */}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {!isLoading ? (
                        <Fragment>
                            {orderData?.pages?.map((page, pageIndex) => (
                                <Fragment>
                                    {page?.data?.map((row: any, rowIndex: number) => {
                                        if (pageIndex === orderData?.pages?.length - 1 && rowIndex === page?.data?.length - 1) {
                                            return (<TableRow
                                                hover
                                                component={Link}
                                                to={`/order/${row.id}`}
                                                sx={{
                                                    cursor: 'pointer',
                                                }}
                                                key={row.id} ref={measureRef}>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">{row.id}</TableCell>
                                                <TableCell align="center">
                                                    {
                                                        row.user.avatar ? <img className='w-14' src={row.user.avatar} alt="" /> :
                                                            <img className='w-14' src={`https://api.dicebear.com/6.x/${randomavatar()}/svg?seed=${randomavatarname()}`} alt="" />
                                                    }
                                                </TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center"> {row.customer_name}</TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">{row.customer_address}</TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">{row.customer_phone
                                                    }</TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">{row.total_amount}</TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">
                                                    <StatusCell
                                                        status={row.status}
                                                    >
                                                        {row.status}
                                                    </StatusCell>
                                                </TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">{row.user.name}</TableCell>

                                            </TableRow>)
                                        } else {
                                            return <TableRow
                                                key={row.id}
                                                hover
                                                component={Link}
                                                to={`/order/${row.id}`}
                                                sx={{
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">{row.id}</TableCell>
                                                <TableCell align="center">
                                                    <img className='w-14' src={`https://api.dicebear.com/6.x/${randomavatar()}/svg?seed=${randomavatarname()}`} alt="" />
                                                </TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center"> {row.customer_name}</TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">{row.customer_address}</TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">{row.customer_phone
                                                    }</TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">{row.total_amount}</TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">
                                                    <StatusCell
                                                        status={row.status}
                                                    >
                                                        {row.status}
                                                    </StatusCell>
                                                </TableCell>
                                                <TableCell sx={{
                                                    fontWeight: '500',
                                                    fontSize: '18px',
                                                    color: '#121212'
                                                }} align="center">{row.user.name}</TableCell>

                                            </TableRow>
                                        }
                                    })
                                    }
                                    {isFetching && hasNextPage ? <TableSkeleton /> : null}
                                </Fragment>
                            ))
                            }

                        </Fragment>
                    ) : (
                        <TableSkeleton />
                    )}
                    {orderData?.pages[0]?.data?.length === 0 && !isLoading && <TableRow>
                        <TableCell colSpan={8} align="center">
                            <Typography variant="h6" align="center" sx={{ color: '#121212' }}>
                                No Orders Found
                            </Typography>
                        </TableCell>
                    </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
