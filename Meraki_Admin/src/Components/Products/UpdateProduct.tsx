import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { FC, ReactElement, Ref, forwardRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ICategory, IFormValues } from "./types";
import { inputSelect } from "../../Utils/custom";
import { DroppedFiles } from "./DropedFiles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../services/categoryApi";
import { enqueueSnackbar } from "notistack";
import Select from "react-select";
import { getProductQuery, updateProductMutation } from "../../services/productApi";
import queryClient from "../../API/ReactQuery";


interface IupdateProduct {
    id: number | string;
    isOpen: boolean;
    handleClose: () => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement;
    },
    ref: Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export const UpdateProduct: FC<IupdateProduct> = ({ isOpen, id, handleClose }) => {


    const { data: options } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        select: (data) => {
            return data.categories.map((category: ICategory) => {
                return {
                    value: category.id,
                    label: category.name,
                }
            })
        },
        onError: (data: any) => {
            enqueueSnackbar(data.message, { variant: 'error' })
        }
    })


    const { control, register, watch, handleSubmit, setValue, } = useForm<IFormValues>({
        defaultValues: {
            name: '',
            description: '',
            costPrice: '' as unknown as number,
            sellingPrice: '' as unknown as number,
            quantity: '' as unknown as number,
            discount: '' as unknown as number,
            category: '' as unknown as number,
            status: ''
        }
    })

    const { data: productData, isLoading, isFetching } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductQuery(id),
        enabled: !!id,
    })

    useEffect(() => {
        if (productData) {
            const { name, description, cost_price, selling_price, quantity, discount, categoryId, images, status } = productData.product

            const imagesUrl = images.map((image: any) => {
                return {
                    url: image.url
                }
            })
            setValue('name', name)
            setValue('description', description)
            setValue('costPrice', cost_price)
            setValue('sellingPrice', selling_price)
            setValue('quantity', quantity)
            setValue('discount', discount)
            setValue('category', categoryId)
            setValue('images', imagesUrl)
            setValue('status', status)
        }
    }, [productData, setValue])


    const { mutate } = useMutation({
        mutationKey: ['product , products', id],
        mutationFn: updateProductMutation,
        onSuccess: () => {
            enqueueSnackbar('Product Updated  Successfully', { variant: 'success' })
            queryClient.invalidateQueries(['products', id])
        },
        onError: (data: any) => {
            enqueueSnackbar(data.message, { variant: 'error' })
        },
    })

    const files = watch('images')
    const submit = (data: IFormValues, event: any) => {
        const submitName = event.nativeEvent.submitter.name
        switch (submitName) {
            case 'save':
                mutate({
                    id,
                    name: data.name,
                    description: data.description,
                    costPrice: data.costPrice,
                    sellingPrice: data.sellingPrice,
                    quantity: data.quantity,
                    discount: data.discount,
                    category: data.category,
                    images: files,
                    status: data.status,
                    image: ""
                })
                break;
            case 'archive':
                mutate({
                    id,
                    name: data.name,
                    description: data.description,
                    costPrice: data.costPrice,
                    sellingPrice: data.sellingPrice,
                    quantity: data.quantity,
                    discount: data.discount,
                    category: data.category,
                    images: files,
                    status: "ARCHIVED",
                    image: ""
                })
                break;
            case 'activate':
                mutate({
                    id,
                    name: data.name,
                    description: data.description,
                    costPrice: data.costPrice,
                    sellingPrice: data.sellingPrice,
                    quantity: data.quantity,
                    discount: data.discount,
                    category: data.category,
                    images: files,
                    status: "ACTIVE",
                    image: ""
                })
                break;
            default:
                break;
        }
        handleClose();
    }


    return (
        <Dialog
            open={isOpen}
            onClose={() => handleClose()}
            fullScreen
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative', backgroundColor: "#FFBA98" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <IoCloseCircleOutline />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Edit Product
                    </Typography>
                </Toolbar>
            </AppBar>

            {(isLoading || isFetching) && <div className="flex justify-between items-center">Loading...</div>}

            {
                !id && <div>Product not found</div>
            }
            {
                !isLoading &&
                <div className="p-14">
                    <form className="flex flex-row justify-center gap-5 " onSubmit={handleSubmit((data, event) => submit(data, event))}>
                        <div className="w-full flex flex-col  gap-8">
                            <div className='flex flex-col justify-center items-start w-full gap-3'>
                                <label className='font-bold' htmlFor="">Product Name</label>
                                <input {...register('name')} className='rounded-sm bg-white w-full px-2 h-10 py-1 outline focus:outline-1 focus:outline-textHighlight   ' id='name' type="text" placeholder='Product Name' />
                            </div>
                            <div className='flex flex-col justify-center items-start gap-3'>
                                <label className='font-bold' htmlFor="filter">
                                    Category
                                </label>
                                <Controller
                                    name="category"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Select value={options?.find((x: { label: string, value: number }) => x.value === value)} options={options} onChange={(selected) => {
                                            onChange(selected?.value);
                                            // handleTraitOneChange(selected);
                                        }} ref={ref} styles={inputSelect} className='!w-full ' />
                                    )}
                                />
                            </div>
                            <div className='flex flex-col justify-center items-start gap-3 '>
                                <label className='font-bold' htmlFor="filter">
                                    Category
                                </label>
                                <textarea {...register('description')} id="description" rows={10} cols={50} className='outline rounded-sm p-5 w-full focus:outline-textHighlight'></textarea>
                            </div>
                        </div>
                        <div className="w-full flex flex-col gap-4">
                            {/* <ImageUpload setValue={setValue} /> */}
                            <DroppedFiles files={files} urls={productData?.product?.images} />
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-row justify-center items-center gap-10'>
                                    <div className='flex flex-row justify-center items-center w-full '>
                                        <label className='font-bold ' htmlFor="">Cost Price:</label>
                                        <input {...register('costPrice')} className='rounded-lg bg-[#FB244833] w-full px-2 h-10 py-1 outline-4 outline-textHighlight focus:outline-4 focus:outline-textHighlight border-4 border-textHighlight  ' type="text" placeholder='Rs' />
                                    </div>
                                    <div className='flex flex-row justify-center items-center w-full '>
                                        <label className='font-bold ' htmlFor="">Selling price:</label>
                                        <input {...register('sellingPrice')} className='rounded-lg bg-[#29CC9733] w-full px-2 h-10 py-1 outline-4 border-4 border-greenText focus:outline-4 focus:outline-greenText   ' type="text" placeholder='Rs' />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-center items-center gap-10'>
                                    <div className='flex flex-row justify-center items-center w-full '>
                                        <label className='font-bold' htmlFor="">Quantity:</label>
                                        <input {...register('quantity')} className='rounded-lg bg-white w-full px-2 h-10 py-1 outline-4 border-2 border-PrimaryText focus:outline-1 focus:outline-PrimaryText ' type="text" placeholder='PCs' />
                                    </div>
                                    <div className='flex flex-row justify-center items-center w-full '>
                                        <label className='font-bold' htmlFor="">Discount:</label>
                                        <input {...register('discount')} className='rounded-lg bg-white w-full px-2 h-10 py-1 outline-4 border-2 border-PrimaryText focus:outline-1 focus:outline-PrimaryText   ' type="text" placeholder='%' />
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-row justify-center gap-32 items-center'>
                                {
                                    productData?.product?.status === 'ACTIVE' ? (
                                        <button name='archive' type='submit' className='py-3 px-4 bg-background rounded-2xl font-extrabold text-SecondaryText'>
                                            Move to Archive
                                        </button>

                                    ) : (
                                        <button name='activate' type='submit' className='py-3 px-4 bg-greenText rounded-2xl font-extrabold text-SecondaryText'>
                                            Move to Active
                                        </button>
                                    )
                                }
                                <button name='save' type='submit' className='py-3 px-4 bg-greenText rounded-2xl font-extrabold text-SecondaryText'>
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            }
        </Dialog >
    )
}



