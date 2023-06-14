import { BiSearchAlt } from 'react-icons/bi'
import Select from 'react-select'

export const FilterComp = () => {


    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            background: '#FFFFFF',
            boxShadow: 'inset 0px 0px 5.83291px rgba(0, 0, 0, 0.1)',
            borderRadius: '7.29114px',
            borderColor: state.isFocused ? '#FB2448' : provided.borderColor,
            '&:hover': {
                borderColor: state.isFocused ? '#FB2448' : provided.borderColor,
            },
            minWidth: '200px', // Set the desired fixed width



        }),
        option: (provided: any, state: any) => ({
            ...provided,
            background: state.isSelected ? '#FB2448' : '#FFFFFF',
            color: state.isSelected ? '#FFFFFF' : '#000000',
            borderColor: state.isFocused ? '#FB2448' : provided.borderColor,
            '&:hover': {
                borderColor: state.isFocused ? '#FB2448' : provided.borderColor,
            },
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: '#000000',
        }),
    };

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
        <div className='flex flex-row w-full justify-center items-center'>
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
