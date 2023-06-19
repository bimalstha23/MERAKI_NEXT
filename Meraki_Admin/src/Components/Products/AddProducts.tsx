import Select from 'react-select'
import { inputSelect } from '../../Utils/custom'
import { ImageUpload } from './ImageUpload'
import { Controller, useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../../ApiHandle/categoryApi'
import { ICategory, IFormValues } from './types'
import { FC } from 'react'

export const AddProducts: FC = () => {
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
        }
    })

    const { control, register, formState, watch, handleSubmit, setValue } = useForm<IFormValues>({
        defaultValues: {
            name: '',
            description: '',
            costPrice: '' as unknown as number,
            sellingPrice: '' as unknown as number,
            quantity: '' as unknown as number,
            discount: '' as unknown as number,
            category: '' as unknown as number,
            images: [],
        }
    })

    const submit = (data: IFormValues) => {
        console.log('submit', data)
    }
    const files = watch('images')
    return (
        <form className="flex flex-row justify-center gap-5 " onSubmit={handleSubmit(submit)}>
            <div className="w-full flex flex-col  gap-8">
                <div className='flex flex-col justify-center items-start w-full gap-3'>
                    <label className='font-bold' htmlFor="">Product Name</label>
                    <input {...register('name')} className='rounded-sm bg-white w-full px-2 h-10 py-1 outline focus:outline-1 focus:outline-textHighlight   ' id='name' type="text" placeholder='Product Name' />
                </div>
                <div className='flex flex-col justify-center items-start gap-3 '>
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
                <ImageUpload setValue={setValue} />
                <DroppedFiles files={files} />
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <div className='flex flex-row justify-center items-center w-full gap-3'>
                            <label className='font-bold w-full' htmlFor="">Cost Price:</label>
                            <input {...register('costPrice')} className='rounded-lg bg-[#FB244833] w-full px-2 h-10 py-1 outline-4 outline-textHighlight focus:outline-4 focus:outline-textHighlight border-4 border-textHighlight  ' type="text" placeholder='Rs' />
                        </div>
                        <div className='flex flex-row justify-center items-center w-full gap-3'>
                            <label className='font-bold w-full' htmlFor="">Selling price:</label>
                            <input {...register('sellingPrice')} className='rounded-lg bg-[#29CC9733] w-full px-2 h-10 py-1 outline-4 border-4 border-greenText focus:outline-4 focus:outline-greenText   ' type="text" placeholder='Rs' />
                        </div>
                    </div>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <div className='flex flex-row justify-center items-center w-full gap-3'>
                            <label className='font-bold w-full' htmlFor="">Quantity:</label>
                            <input {...register('quantity')} className='rounded-lg bg-white w-full px-2 h-10 py-1 outline-4 border-2 border-PrimaryText focus:outline-1 focus:outline-PrimaryText ' type="text" placeholder='PCs' />
                        </div>
                        <div className='flex flex-row justify-center items-center w-full gap-3'>
                            <label className='font-bold w-full' htmlFor="">Discount %:</label>
                            <input {...register('discount')} className='rounded-lg bg-white w-full px-2 h-10 py-1 outline-4 border-2 border-PrimaryText focus:outline-1 focus:outline-PrimaryText   ' type="text" placeholder='%' />
                        </div>
                    </div>
                    droppedFiles</div>
                <div className='flex flex-row justify-between items-center'>
                    <button type='submit' className='py-3 px-4 bg-greenText rounded-2xl font-extrabold text-SecondaryText'>
                        Add Product
                    </button>
                    <button className='py-3 px-4 bg-textHighlight rounded-2xl font-extrabold text-SecondaryText'>
                        Save as Draft
                    </button>
                    <button className='py-3 px-4 bg-background rounded-2xl font-extrabold text-SecondaryText'>
                        Move to Archive
                    </button>
                </div>
            </div>
        </form>
    )
}

const DroppedFiles: FC<{ files: File[] }> = ({ files }) => {
    return (
        <div>
            <h2>Uploaded Files:</h2>
            <div className="flex flex-wrap justify-center gap-2">
                {files.map((file) => (
                    <img src={URL.createObjectURL(file)} className="w-1/4 inline object-contain" alt="Uploaded file" />
                ))}
            </div>
        </div>
    );
};