import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import { useForm } from "react-hook-form"
import { useAuth } from "../../Hooks/ProviderHooks/useAuth";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../ApiHandle/OrderAPi";


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
    const { selectedProduct, setSelectedProduct, user } = useAuth()
    console.log(user, 'useasdasdr')
    console.log(user?.user?.id, "useasdasdr")
    const [discount, setDiscount] = useState<boolean>(false)
    const { handleSubmit, register, reset, watch } = useForm({
        defaultValues: {
            name: '',
            description: '',
            address: '',
            phone: '',
            email: "",
            discount: "",
            deliveryCharge: "",
        }
    })

    const { mutate } = useMutation({
        mutationKey: ['createOrder', 'orders', 'order'],
        mutationFn: createOrder,
        onSuccess: () => {
            enqueueSnackbar('Order Created Successfully', { variant: 'success' })
            setSelectedProduct([])
            reset()
        },
    })
    const [selected, setSelected] = useState<any>([]);
    const toggleDiscount = () => {
        setDiscount(!discount)
    }

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
                if (item.quantity < item.productQuantity) {
                    return { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice * (item.quantity + 1) }
                } else {
                    enqueueSnackbar('Product Quantity is not available', { variant: 'error' })
                }
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
    const watchDiscount = watch('discount')
    const watchDeliverCharge = watch('deliveryCharge')

    let calculatedTotalAmount = 0;
    let totalDiscount = 0;

    // Calculate the total amount, total discount, and total cost price
    for (const product of selectedProduct) {
        const orderedQuantity = product.quantity;
        console.log(product, 'product')

        const productData = product;

        const productSubtotal = product.price * orderedQuantity;
        console.log(productSubtotal, 'productSubtotal')
        // Check if the product has an individual discount
        if (productData.discount) {
            const discountDecimal = productData.discount / 100;
            console.log(discountDecimal, 'discountDecimal')
            const productDiscount = productSubtotal * discountDecimal;
            console.log(productDiscount, 'productDiscount')
            totalDiscount += productDiscount;
        }
        calculatedTotalAmount += productSubtotal;

        // totalCostPrice += productData.cost_price * orderedQuantity;
    }
    console.log(calculatedTotalAmount, 'calculatedTotalAmount')
    console.log(totalDiscount, 'totalDiscount')
    // Apply the overall discount to the total amount
    const discountedTotalAmount = calculatedTotalAmount - totalDiscount;
    console.log(discountedTotalAmount, 'discountedTotalAmount')
    const extraDiscountAmount = (discountedTotalAmount * Number(watchDiscount)) / 100;
    console.log(extraDiscountAmount, 'extraDiscountAmount')
    const totalAmount = discountedTotalAmount - extraDiscountAmount + Number(watchDeliverCharge);
    console.log(totalAmount, 'totalAmount')
    console.log(selectedProduct, 'asdasdasdwasdf')
    const submit = (data: any, event: any) => {
        event.preventDefault();
        const products = selectedProduct.map((item: any) => {
            return {
                id: item.id,
                quantity: item.quantity,
                name: item.name, // Include 'name', 'selling_price', 'cost_price', and 'category' for each product
                selling_price: item.price,
                cost_price: item.const_price,
                categoryId: item.category, // Use 'connect' to associate an existing category with the product
            }
        })


        const order = {
            customer_name: data.name,
            customer_phone: data.phone,
            customer_email: data.email,
            customer_address: data.address,
            total_amount: totalAmount,
            discount: data.discount,
            deleviry_fee: data.deliveryCharge,
            userid: user?.user?.id,
            products,
        }
        console.log(order, '√asdfafs')
        mutate(order)

    }
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
                            <label className='font-bold' htmlFor="">Customer's Phone Number</label>
                            <input {...register('phone')} className='rounded-sm bg-white w-full px-2 h-10 py-1 outline focus:outline-1 focus:outline-textHighlight   ' id='phone' type="number" placeholder="Customer's Phone Number" />
                        </div>
                        <div className='flex flex-col justify-center items-start w-full gap-3'>
                            <label className='font-bold' htmlFor="">Delivery Charge</label>
                            <input {...register('deliveryCharge')} className='rounded-sm bg-white w-full px-2 h-10 py-1 outline focus:outline-1 focus:outline-textHighlight   ' id='phone' type="number" placeholder="delivery Charge" />
                        </div>
                        <div className="flex flex-row justify-start items-center">
                            <Checkbox checked={discount} onChange={toggleDiscount} />
                            <h1 className="text-slate-400 text-xs">Want to add Extra Total Discount? (Note: if there is global discount on product it will be automatically apllied)</h1>
                        </div>
                        {discount &&
                            <div className='flex flex-col justify-center items-start w-full gap-3'>
                                <label className='font-bold' htmlFor="">Extra Discount</label>
                                <input {...register('discount')} className='rounded-sm bg-white w-full px-2 h-10 py-1 outline focus:outline-1 focus:outline-textHighlight   ' id='phone' type="number" placeholder="Discount" />
                            </div>
                        }

                        <div className='flex flex-col justify-center items-start gap-3 '>
                            <label className='font-bold' htmlFor="filter">
                                Description
                            </label>
                            <textarea {...register('description')} id="description" placeholder="description" rows={10} cols={50} className='outline rounded-sm p-5 w-full focus:outline-textHighlight'></textarea>
                        </div>
                        <button name='createOrder' type='submit' className='w-36 py-2 bg-greenText rounded-2xl font-extrabold text-SecondaryText'>
                            Create Order
                        </button>
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
                                    <StyledTableCell align="center">Discount </StyledTableCell>
                                    <StyledTableCell align="center">Price </StyledTableCell>
                                    <StyledTableCell align="center">Total Price </StyledTableCell>
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
                                                    <button onClick={() => handleDecreament(row)}>-</button>
                                                </div>
                                            </TableCell>
                                            <TableCell sx={{
                                                fontWeight: '500',
                                                fontSize: '18px',
                                                color: '#121212'
                                            }} align="center">{row.discount}</TableCell>

                                            <TableCell sx={{
                                                fontWeight: '500',
                                                fontSize: '18px',
                                                color: '#121212'
                                            }} align="center">{row.price}</TableCell>

                                            <TableCell sx={{
                                                fontWeight: '500',
                                                fontSize: '18px',
                                                color: '#121212'
                                            }} align="center">{row.totalPrice}</TableCell>
                                        </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        <div className="flex flex-col justify-start items-end w-full">
                            <div className="flex flex-row items-start gap-6 text-start">
                                <h1 className="text-slate-400 text-xs">Total Discount</h1>
                                <h1 className="text-slate-400 text-xs">{totalDiscount}</h1>
                            </div>
                            {watchDeliverCharge &&
                                <div className="flex flex-row items-start gap-6  text-start">
                                    <h1 className="text-slate-400 text-xs">DeliveryCharge</h1>
                                    <h1 className="text-slate-400 text-xs">{watchDeliverCharge}</h1>
                                </div>}
                            {watchDiscount &&
                                <div className="flex flex-row items-start gap-6  text-start">
                                    <h1 className="text-slate-400 text-xs">Extra Discount</h1>
                                    <h1 className="text-slate-400 text-xs">{watchDiscount}</h1>
                                </div>
                            }
                            <div className="flex flex-row items-start gap-6 text-start">
                                <h1 className="text-slate-400 text-xs">Total Amount</h1>
                                <h1 className="text-slate-400 text-xs">{totalAmount}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}