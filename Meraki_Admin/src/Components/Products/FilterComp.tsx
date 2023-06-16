import { BiSearchAlt } from 'react-icons/bi'
import Select from 'react-select'
import { customStyles } from '../../Utils/custom'

export const FilterComp = () => {




    const options = [
        { value: 'Ring  ', label: 'Ring' },
        { value: 'earrings', label: 'earrings' },
        { value: 'clips', label: 'clips' },
        { value: 'top', label: 'bangles' },
    ]

    const timeOptions = [
        {
            value: 'Ascending', label: 'Ascending',

        }, {
            value: 'Descending', label: 'Descending',
        },
    ]

    return (
        <div className='flex flex-row w-full justify-center items-center py-5'>
            <form action="" className='flex flex-row justify-center items-center w-full gap-5'>
                <div className='flex flex-col justify-center items-start w-1/3'>
                    <label className='font-bold' htmlFor="">Search by ID/ Name</label>
                    <label htmlFor="search" className='relative block text-gray-400 bg-white rounded-[7.29114px] w-full focus-within:text-gray-700 bg-[#E6E6E6] shadow-[inset 0px 0px 5.83291px rgba(0, 0, 0, 0.1)] '>
                        <button type='submit'> <BiSearchAlt size={20} className="pointer-events-none left-1 absolute top-1/2  transform -translate-y-1/2 " /></button>
                        <input className='rounded-xl bg-white w-full px-6 py-1 bg-[#E6E6E6]  focus:outline-none' id='search' name='search' type="text" placeholder='Search' />
                    </label>
                </div>
                <div className='flex flex-col justify-center items-start '>
                    <label className='font-bold' htmlFor="filter">
                        Category
                    </label>
                    <Select options={options} styles={customStyles} />
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <label className='font-bold' htmlFor="filter">
                        Time
                    </label>
                    <Select options={timeOptions} styles={customStyles} />
                </div>
            </form>
        </div>
    )
}
