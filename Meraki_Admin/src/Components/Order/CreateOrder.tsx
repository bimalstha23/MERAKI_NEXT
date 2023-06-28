import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import { useForm } from "react-hook-form"
import { useAuth } from "../../Hooks/ProviderHooks/useAuth";
import { useState } from "react";


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

export const CreateOrder = () => {
    const { selectedProduct, setSelectedProduct } = useAuth()

    const { handleSubmit, register } = useForm({
        defaultValues: {
            name: '',
            description: '',
            address: '',
            phone: '',
        }
    })
    const submit = (data: any, event: any) => {
        console.log(data);
        console.log(event);
    }
    const [selected, setSelected] = useState<any>([]);


    const isSelected = (id: any) => selected?.findIndex((item: any) => item?.id === id) !== -1;


    const handleSelectAllClick = (event: { target: { checked: any; }; }) => {
        setSelected(event.target.checked ? selectedProduct : []);
    };

    const handleClick = (_event: any, row: any) => {
        const selectedIndex = selected.findIndex((item: any) => item.id === row.id);
        let newSelected: any = [];
        if (selectedIndex === -1) {
            newSelected = [...selected, row]; // Add the selected item to the array
        } else {
            newSelected = [...selected.slice(0, selectedIndex), ...selected.slice(selectedIndex + 1)]; // Remove the selected item from the array
        }
        setSelected(newSelected);
    };

    const handleIncreament = (row: any) => {
        const updatedSelect = selectedProduct.map((item: any) => {
            if (item.id === row.id) {
                return { ...item, quantity: item.quantity + 1 }
            } else
                return {
                    ...item
                }
        })
        setSelectedProduct(updatedSelect)
    }

    const handleDecreament = (row: any) => {
        const updatedSelect = selectedProduct.map((item: any) => {
            if (item.id === row.id) {
                if (item.quantity > 0) {
                    return { ...item, quantity: item.quantity - 1 }
                }
            } else
                return {
                    ...item
                }
        })
        setSelectedProduct(updatedSelect)
    }


    console.log(selectedProduct, 'selectedProduct')

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center items-start w-full gap-5">
                <form className="flex flex-row justify-center gap-5 w-[75%] " onSubmit={handleSubmit((data, event) => submit(data, event))}>
                    <div className="w-full flex flex-col  gap-8">
                        <div className='flex flex-col justify-center items-start w-full gap-3'>
                            <label className='font-bold' htmlFor="">Customer Full Name</label>
                            <input {...register('name')} className='rounded-sm bg-white w-full px-2 h-10 py-1 outline focus:outline-1 focus:outline-textHighlight   ' id='name' type="text" placeholder='Customer Name' />
                        </div>
                        <div className='flex flex-col justify-center items-start w-full gap-3'>
                            <label className='font-bold' htmlFor="">Customer's Address</label>
                            <input {...register('address')} className='rounded-sm bg-white w-full px-2 h-10 py-1 outline focus:outline-1 focus:outline-textHighlight   ' id='address' type="text" placeholder="Customer's address" />
                        </div>
                        <div className='flex flex-col justify-center items-start w-full gap-3'>
                            <label className='font-bold' htmlFor="">Customer's Address</label>
                            <input {...register('phone')} className='rounded-sm bg-white w-full px-2 h-10 py-1 outline focus:outline-1 focus:outline-textHighlight   ' id='phone' type="number" placeholder="Customer's Phone Number" />
                        </div>
                        <div className='flex flex-col justify-center items-start gap-3 '>
                            <label className='font-bold' htmlFor="filter">
                                Description
                            </label>
                            <textarea {...register('description')} id="description" placeholder="description" rows={10} cols={50} className='outline rounded-sm p-5 w-full focus:outline-textHighlight'></textarea>
                        </div>
                    </div>
                </form>
                <div className="w-full">
                    <TableContainer component={Paper} sx={{
                        maxHeight: `${800}px`,
                    }}
                    >
                        <Table sx={{ minWidth: 700, }} aria-label="customized table" stickyHeader   >
                            <TableHead sx={{
                                backgroundColor: "#121212",
                            }}>
                                <TableRow sx={{ overflow: 'auto' }}>
                                    <StyledTableCell>
                                        <Checkbox
                                            onChange={handleSelectAllClick}
                                            color="primary"
                                            inputProps={{
                                                'aria-label': 'select all desserts',
                                            }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell>Image</StyledTableCell>
                                    <StyledTableCell align="center">Name</StyledTableCell>
                                    <StyledTableCell align="center">Category</StyledTableCell>
                                    <StyledTableCell align="center">Quantity </StyledTableCell>
                                    <StyledTableCell align="center">Price </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    selectedProduct?.map((row: any) => {
                                        const isItemSelected = isSelected(row.id);
                                        return (<TableRow
                                            sx={{
                                                cursor: 'pointer',
                                            }}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell>
                                                <Checkbox
                                                    onChange={(event) => handleClick(event, row)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <img className="w-28" src={row.image} alt="" />
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
                                            }} align="center">{row.category}</TableCell>
                                            <TableCell sx={{
                                                fontWeight: '500',
                                                fontSize: '18px',
                                                color: '#121212'
                                            }} align="center">
                                                <div className="flex flex-row justify-center items-center">
                                                    <button onClick={() => handleIncreament(row)}>+</button>
                                                    <span>{row.quantity}</span>
                                                    <button onClick={(e) => handleDecreament(row)}>-</button>
                                                </div>
                                            </TableCell>
                                            <TableCell sx={{
                                                fontWeight: '500',
                                                fontSize: '18px',
                                                color: '#121212'
                                            }} align="center">{row.price}</TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}
