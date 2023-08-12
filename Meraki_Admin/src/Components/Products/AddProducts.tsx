import Select from 'react-select'
import { inputSelect } from '../../Utils/custom'
import { ImageUpload } from './ImageUpload'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../../services/categoryApi'
import { ICategory, IFormValues } from './types'
import { FC, useState } from 'react'
import { AddProductMutation } from '../../services/productApi'
import { enqueueSnackbar } from 'notistack'
import { Backdrop, CircularProgress } from '@mui/material'
import queryClient from '../../API/ReactQuery'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from '@hookform/error-message'

export const AddProducts: FC = () => {
    const [droppedFiles, setDroppedFiles] = useState<File[]>([]);

    const Schema = yup.object().shape({
        name: yup.string().required().min(3),
        description: yup.string().required().min(5),
        costPrice: yup.mixed().required(),
        sellingPrice: yup.mixed().required(),
        quantity: yup.mixed().required(),
        discount: yup.mixed(),
        category: yup.mixed().required(),
        images: yup.array().required().min(1),
        status: yup.string().required().is(['ACTIVE', 'DRAFT', 'ARCHIVED'])
    })

    const { mutate, isLoading } = useMutation({
        mutationFn: AddProductMutation,
        mutationKey: ['addProducts , products'],
        onSuccess: () => {
            enqueueSnackbar('Product Added Successfully', { variant: 'success' })
            queryClient.invalidateQueries(['products'])
            reset()
            setDroppedFiles([])
        },
        onError: (data: any) => {
            enqueueSnackbar(data.message, { variant: 'error' })
        }
    })

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

    const { control, register, watch, handleSubmit, setValue, reset, formState: { errors } } = useForm<IFormValues | any>({
        defaultValues: {
            name: '' as unknown as string,
            description: '' as unknown as string,
            costPrice: '' as unknown as number,
            sellingPrice: '' as unknown as number,
            quantity: '' as unknown as number,
            discount: '' as unknown as number,
            category: '' as unknown as number,
            images: [] as unknown as File[],
            status: 'ACTIVE' as unknown as string,
        },
        resolver: yupResolver(Schema),
        mode: 'onSubmit'
    })

    const submit = (data: IFormValues, event: any) => {
        const submitName = event.nativeEvent.submitter.name
        if (data.images.length === 0) return enqueueSnackbar('Please add atleast one image', { variant: 'error' })
        switch (submitName) {
            case 'addProduct':
                mutate(data)
                break;
            case 'saveDraft':
                mutate({ ...data, status: 'DRAFT' })
                break;
            case 'moveToArchive':
                mutate({ ...data, status: 'ARCHIVED' })
                break;
            default:
                break
        }
    }

    const files = watch('images')

    return (
        <form className="flex flex-row justify-center gap-5 " onSubmit={handleSubmit((data, event) => submit(data, event))}>
            <div className="w-full flex flex-col  gap-8">
                <div className='flex flex-col justify-center items-start w-full gap-3'>
                    <label className='font-bold' htmlFor="">Product Name</label>
                    <input {...register('name')} className='rounded-sm bg-white w-full px-2 h-10 py-1 outline focus:outline-1 focus:outline-textHighlight   ' id='name' type="text" placeholder='Product Name' />
                    <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }) => <p className='text-red-500'>{message}</p>}
                    />
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
                    <ErrorMessage
                        errors={errors}
                        name="category"
                        render={({ message }) => <p className='text-red-500'>{message}</p>}
                    />
                </div>
                <div className='flex flex-col justify-center items-start gap-3 '>
                    <label className='font-bold' htmlFor="filter">
                        Description
                    </label>
                    <textarea {...register('description')} id="description" rows={10} cols={50} className='outline rounded-sm p-5 w-full focus:outline-textHighlight'></textarea>
                    <ErrorMessage
                        errors={errors}
                        name="description"
                        render={({ message }) => <p className='text-red-500'>{message}</p>}
                    />
                </div>
            </div>
            <div className="w-full flex flex-col gap-4">
                <ImageUpload setValue={setValue} droppedFiles={droppedFiles} setDroppedFiles={setDroppedFiles} />
                <DroppedFiless files={files} />
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row justify-center items-center gap-10'>
                        <div>
                            <div className='flex flex-row justify-center items-center w-full '>
                                <label className='font-bold ' htmlFor="">Cost Price:</label>
                                <input {...register('costPrice')} className='rounded-lg bg-[#FB244833] w-full px-2 h-10 py-1 outline-4 outline-textHighlight focus:outline-4 focus:outline-textHighlight border-4 border-textHighlight  ' type="text" placeholder='Rs' />
                            </div>
                            <ErrorMessage
                                errors={errors}
                                name="costPrice"
                                render={({ message }) => <p className='text-red-500 text-xs'>{message}</p>}
                            />
                        </div>
                        <div>
                            <div className='flex flex-row justify-center items-center w-full '>
                                <label className='font-bold ' htmlFor="">Selling price:</label>
                                <input {...register('sellingPrice')} className='rounded-lg bg-[#29CC9733] w-full px-2 h-10 py-1 outline-4 border-4 border-greenText focus:outline-4 focus:outline-greenText   ' type="text" placeholder='Rs' />
                            </div>
                            <ErrorMessage
                                errors={errors}
                                name="sellingPrice"
                                render={({ message }) => <p className='text-red-500 text-xs'>{message}</p>}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row justify-center items-center gap-10'>
                        <div>
                            <div className='flex flex-row justify-center items-center w-full '>
                                <label className='font-bold' htmlFor="">Quantity:</label>
                                <input {...register('quantity')} className='rounded-lg bg-white w-full px-2 h-10 py-1 outline-4 border-2 border-PrimaryText focus:outline-1 focus:outline-PrimaryText ' type="text" placeholder='PCs' />
                            </div>
                            <ErrorMessage
                                errors={errors}
                                name="quantity"
                                render={({ message }) => <p className='text-red-500 text-xs'>{message}</p>}
                            />
                        </div>
                        <div>
                            <div className='flex flex-row justify-center items-center w-full '>
                                <label className='font-bold' htmlFor="">Discount:</label>
                                <input {...register('discount')} className='rounded-lg bg-white w-full px-2 h-10 py-1 outline-4 border-2 border-PrimaryText focus:outline-1 focus:outline-PrimaryText   ' type="text" placeholder='%' />
                            </div>
                            <ErrorMessage
                                errors={errors}
                                name="discount"
                                render={({ message }) => <p className='text-red-500 text-xs'>{message}</p>}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <button name='addProduct' type='submit' className='py-3 px-4 bg-greenText rounded-2xl font-extrabold text-SecondaryText'>
                        Add Product
                    </button>
                    <button type='submit' name='saveDraft' className='py-3 px-4 bg-textHighlight rounded-2xl font-extrabold text-SecondaryText'>
                        Save as Draft
                    </button>
                    <button name='moveToArchive' type='submit' className='py-3 px-4 bg-background rounded-2xl font-extrabold text-SecondaryText'>
                        Move to Archive
                    </button>
                </div>
            </div>
            {
                isLoading && <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        </form >
    )
}


const DroppedFiless: FC<{ files?: File[], }> = ({ files = [] }) => {
    return (
        <div>
            <div className="flex flex-wrap justify-center gap-2">

                {
                    files.length > 0 && files?.map((file, index: number) => (
                        <img key={index} src={URL.createObjectURL(file)} className="w-1/4 inline object-contain" alt="Uploaded file" />
                    ))
                }
            </div>
        </div>
    );
};