import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography, alpha, styled, tableCellClasses } from '@mui/material'
import { FC, Fragment, useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query';
import { getProductsQuery } from '../../ApiHandle/productApi';
import { useOnScreen } from '../../Hooks/utilityHooks/useOnScreen';
import { TableSkeleton } from './TableSkeleton';
import { useProduct } from '../../Hooks/ProviderHooks/useProduct';
import { MdModeEditOutline } from "react-icons/md"
import { useAuth } from '../../Hooks/ProviderHooks/useAuth';
import { UpdateProduct } from './UpdateProduct';


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

type TabType = 'ACTIVE' | 'DRAFT' | 'ARCHIVED' | 'onstocks' | 'outofstocks'

export const ProductsTable: FC<{ Tab: TabType }> = ({ Tab }) => {
    const [maxHeight, setMaxHeight] = useState<number>(0);
    const { measureRef, isIntersecting, observer } = useOnScreen();
    const { ProductFilters } = useProduct()
    const { setSelectedProduct, selectedProduct } = useAuth()
    const [dialogOption, setDialogOption] = useState<{
        isOpen: boolean,
        id: number | string
    }>({
        isOpen: false,
        id: ''
    })


    const filterOptions: {
        status?: string
        onStock?: boolean
        outOfStock?: boolean
    } = {}

    switch (Tab) {
        case 'ACTIVE':
            filterOptions.status = 'ACTIVE'
            break;
        case 'DRAFT':
            filterOptions.status = 'DRAFT'
            break;
        case 'ARCHIVED':
            filterOptions.status = 'ARCHIVED'
            break;
        case 'onstocks':
            filterOptions.onStock = true
            break;
        case 'outofstocks':
            filterOptions.outOfStock = true
            break;
        default:
            break;
    }


    const { data, fetchNextPage, hasNextPage, isLoading, isFetching, refetch: refetchProduct } = useInfiniteQuery({
        queryKey: ['products', Tab],
        queryFn: ({ pageParam = 1 }) => getProductsQuery({ ...ProductFilters, ...filterOptions, page: pageParam }),
        getNextPageParam: (lastPage) => lastPage.pagination.nextPage ? lastPage.pagination.nextPage : undefined,
    })


    useEffect(() => {
        refetchProduct()
    }, [ProductFilters, refetchProduct])

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
            observer.disconnect();
        }
    }, [isIntersecting, hasNextPage, fetchNextPage]);

    const handleClick = (_event: any, row: any) => {
        const selectedIndex = selectedProduct.findIndex((item: any) => item.id === row.id);
        let newSelected: any = [];

        const newRow = {
            quantity: 1,
            image: row.images[0].url,
            name: row.name,
            price: row.selling_price,
            id: row.id,
            category: row.category.name,
        }


        if (selectedIndex === -1) {
            newSelected = [...selectedProduct, newRow]; // Add the selected item to the array
        } else {
            newSelected = [...selectedProduct.slice(0, selectedIndex), ...selectedProduct.slice(selectedIndex + 1)]; // Remove the selected item from the array
        }
        setSelectedProduct(newSelected);
    };


    const isSelected = (id: any) => selectedProduct?.findIndex((item: any) => item?.id === id) !== -1;
    const handleDialogClose = () => {
        setDialogOption({
            isOpen: false,
            id: ''
        })
    }


    return (
        <div>
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(selectedProduct.length > 0 && {
                        bgcolor: (theme) =>
                            alpha(
                                theme.palette.primary.main,
                                theme.palette.action.activatedOpacity
                            ),
                    }),
                }}
            >
                {selectedProduct.length > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {selectedProduct.length} Selected Products
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {Tab} Products
                    </Typography>
                )}
                {selectedProduct.length > 0 ? (
                    <button>
                        <MdModeEditOutline />
                    </button>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                    ></Typography>
                )}
            </Toolbar>
            <TableContainer component={Paper} sx={{
                maxHeight: `${maxHeight}px`,
            }}
            >
                <Table sx={{ minWidth: 700, }} aria-label="customized table" stickyHeader   >
                    <TableHead sx={{
                        backgroundColor: "#121212",
                    }}>
                        <TableRow sx={{ overflow: 'auto' }}>
                            <StyledTableCell >
                                <Checkbox
                                    color="primary"
                                    // indeterminate={
                                    //     selected.length > 0 && selected.length < stakedData.length
                                    // }
                                    // checked={
                                    //     stakedData.length > 0 && selected.length === stakedData.length
                                    // }
                                    // onChange={handleSelectAllClick}
                                    inputProps={{
                                        'aria-label': 'select all desserts',
                                    }}
                                />
                            </StyledTableCell>
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
                        {!isLoading ? (
                            <Fragment>
                                {data?.pages?.map((page, pageIndex) => (
                                    <Fragment>
                                        {page?.data?.map((row: any, rowIndex: number) => {
                                            const isItemSelected = isSelected(row?.id);
                                            if (pageIndex === data?.pages?.length - 1 && rowIndex === page?.data?.length - 1) {
                                                return <TableRow onClick={(event) => handleClick(event, row)} role='checkbox' sx={{
                                                    cursor: 'pointer',
                                                }}
                                                    aria-checked={isItemSelected}
                                                    hover
                                                    tabIndex={-1}
                                                    key={row.id} ref={measureRef}>
                                                    <TableCell>
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <img className='w-28' src={row.images[0].url} alt="" />
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
                                                        <button onClick={() => setDialogOption({
                                                            id: row.id,
                                                            isOpen: true,
                                                        })} className=" text-textHighlight px-4 py-2 rounded-md">
                                                            <MdModeEditOutline />
                                                        </button>
                                                    </TableCell>
                                                </TableRow>
                                            } else {
                                                return <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, row)}
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    // disabled={row?.unstakeTimestamp ? true : false}
                                                    tabIndex={-1}
                                                    selected={isItemSelected}
                                                    sx={{ cursor: 'pointer' }}
                                                    key={row.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            color="primary"
                                                            checked={isItemSelected}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <img className='w-28' src={row.images[0].url} alt="" />
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
                                                        <button onClick={() => setDialogOption({
                                                            id: row.id,
                                                            isOpen: true,
                                                        })} className=" text-textHighlight px-4 py-2 rounded-md">
                                                            <MdModeEditOutline />
                                                        </button>
                                                    </TableCell>
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
                        {data?.pages[0].data.length === 0 && !isLoading && <TableRow>
                            <TableCell colSpan={8} align="center">
                                <Typography variant="h6" align="center" sx={{ color: '#121212' }}>
                                    No Products Found
                                </Typography>
                            </TableCell>
                        </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <UpdateProduct id={dialogOption.id} isOpen={dialogOption.isOpen} handleClose={handleDialogClose} />

        </div>

    )
}
