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
import { useNavigate } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        background: 'linear-gradient(180deg, #373737 0%, #121212 84.9%)',
        color: theme.palette.common.white,
        fontSize: '18px',
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
    const [selectedtableProducts, setSelectedtableProducts] = useState<any>([])
    const [dialogOption, setDialogOption] = useState<{
        isOpen: boolean,
        id: number | string
    }>({
        isOpen: false,
        id: ''
    })
    const navigate = useNavigate()



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

    const { data, fetchNextPage, hasNextPage, isLoading, isFetching, } = useInfiniteQuery({
        queryKey: ['products', Tab, ProductFilters],
        queryFn: ({ pageParam = 1 }) => getProductsQuery({ ...ProductFilters, ...filterOptions, page: pageParam }),
        getNextPageParam: (lastPage) => lastPage.pagination.nextPage ? lastPage.pagination.nextPage : undefined,
    })

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
        const selectedIndex = Tab === 'ACTIVE' ? selectedProduct.findIndex((item: any) => item.id === row.id) : selectedtableProducts.findIndex((item: any) => item.id === row.id)
        let newSelected: any = [];
        const newRow = {
            quantity: 1,
            image: row.images[0]?.url,
            name: row.name,
            price: row.selling_price,
            const_price: row.cost_price,
            id: row.id,
            category: row.category.id,
            productQuantity: row.quantity,
            discount: row.discount,
            totalPrice: row.selling_price - (row.discount / 100 * row.selling_price) * 1,
        }

        if (Tab === 'ACTIVE') {
            if (selectedIndex === -1) {
                newSelected = [...selectedProduct, newRow]; // Add the selected item to the array
            } else {
                newSelected = [...selectedProduct.slice(0, selectedIndex), ...selectedProduct.slice(selectedIndex + 1)]; // Remove the selected item from the array
            }
        } else {
            if (selectedIndex === -1) {
                newSelected = [...selectedtableProducts, row]; // Add the selected item to the array
            } else {
                newSelected = [...selectedtableProducts.slice(0, row), ...selectedtableProducts.slice(selectedIndex + 1)]; // Remove the selected item from the array
            }
        }
        if (Tab === 'ACTIVE') {
            setSelectedProduct(newSelected);
        } else {
            setSelectedtableProducts(newSelected);
        }
    };


    const isSelected = (id: any) => {
        if (Tab === 'ACTIVE') {
            return selectedProduct?.findIndex((item: any) => item?.id === id) !== -1;
        } else {
            return selectedtableProducts?.findIndex((item: any) => item?.id === id) !== -1;
        }
    }

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
                {selectedProduct.length > 0 || selectedtableProducts?.length ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >{
                            Tab === 'ACTIVE' ? <h1>{selectedProduct.length}</h1> : <h1>
                                {selectedtableProducts.length}
                            </h1>
                        }
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
                {selectedProduct?.length > 0 || selectedtableProducts?.length > 0 ? (
                    <div className='flex flex-row justify-center items-center gap-5'>
                        {Tab === 'ACTIVE' &&
                            <button onClick={() => navigate('/order?tab=createorder')} name='createOrder' type='submit' className='w-36 py-2 bg-greenText rounded-2xl font-extrabold text-SecondaryText'>
                                Create Order
                            </button>}
                        {Tab === 'ARCHIVED' || Tab === 'DRAFT' ? (
                            <button name='createOrder' type='submit' className='w-36 py-2 bg-greenText rounded-2xl font-extrabold text-SecondaryText'>
                                Move To Active
                            </button>
                        ) : Tab === 'ACTIVE' ? (
                            <button name='createOrder' type='submit' className='w-36 py-2 bg-greenText rounded-2xl font-extrabold text-SecondaryText'>
                                Move To Archive
                            </button>
                        ) : null}
                    </div>
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
                                                        <img className='w-28' src={row.images[0]?.url} alt="" />
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
                                                    aria-checked={isItemSelected}
                                                    // disabled={row?.unstakeTimestamp ? true : false}
                                                    tabIndex={-1}
                                                    selected={isItemSelected}
                                                    key={row.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            onClick={(event) => handleClick(event, row)}
                                                            color="primary"
                                                            checked={isItemSelected}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <img className='w-28' src={row.images[0]?.url} alt="" />
                                                    </TableCell>
                                                    <TableCell sx={{
                                                        fontWeight: '500',
                                                        fontSize: '18px',
                                                        color: '#121212'
                                                    }} align="center"> {row.name}</TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontWeight: '500',
                                                            fontSize: '18px',
                                                            color: '#121212',
                                                            maxWidth: '400px', // Set your desired maximum width for the cell
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                        align="center"
                                                    >
                                                        {row.description}
                                                    </TableCell>
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
