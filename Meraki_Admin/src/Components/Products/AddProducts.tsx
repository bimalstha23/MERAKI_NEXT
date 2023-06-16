import Select from 'react-select'
import { inputSelect } from '../../Utils/custom'
import { ImageUpload } from './ImageUpload'

export const AddProducts = () => {
    const options = [
        { value: 'Ring  ', label: 'Ring' },
        { value: 'earrings', label: 'earrings' },
        { value: 'clips', label: 'clips' },
        { value: 'top', label: 'bangles' },
    ]
    return (
        <div className="flex flex-row justify-center gap-5">
            <div className="w-full flex flex-col  gap-8">
                <div className='flex flex-col justify-center items-start w-full gap-3'>
                    <label className='font-bold' htmlFor="">Product Name</label>
                    <input className='rounded-sm bg-white w-full px-2 h-10 py-1 outline focus:outline-1 focus:outline-textHighlight   ' id='name' name='name' type="text" placeholder='Product Name' />
                </div>
                <div className='flex flex-col justify-center items-start gap-3 '>
                    <label className='font-bold' htmlFor="filter">
                        Category
                    </label>
                    <Select options={options} styles={inputSelect} className='!w-full ' />
                </div>
                <div className='flex flex-col justify-center items-start gap-3 '>
                    <label className='font-bold' htmlFor="filter">
                        Category
                    </label>
                    <textarea name="Description" id="description" rows={10} cols={50} className='outline rounded-sm p-5 w-full focus:outline-textHighlight'></textarea>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4">
                <ImageUpload />
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <div className='flex flex-row justify-center items-center w-full gap-3'>
                            <label className='font-bold w-full' htmlFor="">Cost Price:</label>
                            <input className='rounded-lg bg-[#FB244833] w-full px-2 h-10 py-1 outline-4 outline-textHighlight focus:outline-4 focus:outline-textHighlight border-4 border-textHighlight  ' id='name' name='name' type="text" placeholder='Rs' />
                        </div>
                        <div className='flex flex-row justify-center items-center w-full gap-3'>
                            <label className='font-bold w-full' htmlFor="">Selling price:</label>
                            <input className='rounded-lg bg-[#29CC9733] w-full px-2 h-10 py-1 outline-4 border-4 border-greenText focus:outline-4 focus:outline-greenText   ' id='name' name='name' type="text" placeholder='Rs' />
                        </div>
                    </div>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <div className='flex flex-row justify-center items-center w-full gap-3'>
                            <label className='font-bold w-full' htmlFor="">Quantity:</label>
                            <input className='rounded-lg bg-white w-full px-2 h-10 py-1 outline-4 border-2 border-PrimaryText focus:outline-1 focus:outline-PrimaryText ' id='name' name='name' type="text" placeholder='PCs' />
                        </div>
                        <div className='flex flex-row justify-center items-center w-full gap-3'>
                            <label className='font-bold w-full' htmlFor="">Discount %:</label>
                            <input className='rounded-lg bg-white w-full px-2 h-10 py-1 outline-4 border-2 border-PrimaryText focus:outline-1 focus:outline-PrimaryText   ' id='name' name='name' type="text" placeholder='%' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <button className='py-3 px-4 bg-greenText rounded-2xl font-extrabold text-SecondaryText'>
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
        </div>
    )
}
