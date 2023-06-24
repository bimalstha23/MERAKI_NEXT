import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import DummyProduct from "../../assets/dummy/DummyProduct.svg"
import { MdModeEditOutline } from "react-icons/md"
import { useInfiniteQuery } from '@tanstack/react-query';
import { getProductsQuery } from '../../ApiHandle/productApi';
import { useOnScreen } from '../../Hooks/utilityHooks/useOnScreen';
import { IProduct } from '../../globalTypes';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        background: 'linear-gradient(180deg, #373737 0%, #121212 84.9%)',
        color: theme.palette.common.white,
        fontSize: '24px',
        fontWeight: '600',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));




export const ProductsTable: FC = () => {
    const [maxHeight, setMaxHeight] = useState<number>(0);
    const { measureRef, isIntersecting, observer } = useOnScreen();

    const filter = {
        pageSize: 2,
    }


    const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({ pageParam = 1 }) => getProductsQuery({ ...filter, page: pageParam }),
        getNextPageParam: (lastPage) => lastPage.pagination.nextPage ? lastPage.pagination.nextPage : undefined,
    })

    useEffect(() => {
        const updateMaxHeight = () => {
            const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            const offset = 200; // You can adjust this offset value if needed
            setMaxHeight(windowHeight - offset);
        };
        updateMaxHeight();
        window.addEventListener('resize', updateMaxHeight);

        return () => {
            window.removeEventListener('resize', updateMaxHeight);
        };
    }, []);
    console.log(hasNextPage, 'hasNextPage')
    useEffect(() => {
        if (isIntersecting && hasNextPage) {
            fetchNextPage()
            observer.disconnect();
        }
    }, [isIntersecting, hasNextPage, fetchNextPage]);

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
                        <StyledTableCell>Image</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Description</StyledTableCell>
                        <StyledTableCell align="center">Category</StyledTableCell>
                        <StyledTableCell align="center">Quantity </StyledTableCell>
                        <StyledTableCell align="center">Price </StyledTableCell>
                        <StyledTableCell align="center">ID </StyledTableCell>
                        <StyledTableCell align="center">Edit </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data?.pages?.map((data) => {
                            return data?.data?.map((row: any) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">
                                        <img src={row.images[0].url} alt="" />
                                    </TableCell>
                                    <TableCell sx={{
                                        fontWeight: '500',
                                        fontSize: '18px',
                                        color: '#121212'
                                    }} align="center"> {row.name}</TableCell>
                                    <TableCell sx={{
                                        fontWeight: '500',
                                        fontSize: '18px',
                                        color: '#121212'
                                    }} align="center">{row.description}</TableCell>
                                    <TableCell sx={{
                                        fontWeight: '500',
                                        fontSize: '18px',
                                        color: '#121212'
                                    }} align="center">{row.category.name}</TableCell>
                                    <TableCell sx={{
                                        fontWeight: '500',
                                        fontSize: '18px',
                                        color: '#121212'
                                    }} align="center">{row.quantity}</TableCell>
                                    <TableCell sx={{
                                        fontWeight: '500',
                                        fontSize: '18px',
                                        color: '#121212'
                                    }} align="center">{row.selling_price}</TableCell>
                                    <TableCell sx={{
                                        fontWeight: '500',
                                        fontSize: '18px',
                                        color: '#121212'
                                    }} align="center">{row.id}</TableCell>
                                    <TableCell sx={{
                                        fontWeight: '500',
                                        fontSize: '18px',
                                        color: '#121212'
                                    }} align="center">
                                        <button className=" text-textHighlight px-4 py-2 rounded-md">
                                            <MdModeEditOutline />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        })
                    }




                </TableBody>
            </Table>
            <button onClick={() => {
                console.log('fetching next page')
                return fetchNextPage()
            }}>Fetch Next Page</button>
        </TableContainer>
    )
}
