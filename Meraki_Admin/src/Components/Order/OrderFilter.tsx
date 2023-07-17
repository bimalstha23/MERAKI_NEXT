import { BiSearchAlt } from 'react-icons/bi'
import Select from 'react-select'
import { customStyles } from '../../Utils/custom'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../Hooks/utilityHooks/useDebounce'
// import { useQuery } from '@tanstack/react-query'
// import { fetchCategories } from '../../ApiHandle/categoryApi'
// import { enqueueSnackbar } from 'notistack'
// import { Category } from '../../globalTypes'
import { useOrder } from '../../Hooks/ProviderHooks/useOrder'

export const OrderFilter = () => {
    const { setorderFilters, orderFilters } = useOrder()
    const timeOptions = [
        {
            value: 'All',
            label: 'All'
        },

        {
            value: 'last2days',
            label: 'Last 2 days'
        }, {

        },
        {
            value: 'last7days',
            label: 'last7days'
        }, {
            value: "last1month",
            label: "last 1 month"
        },
        {
            value: 'last6month',
            label: 'last 6 month'
        },
        {
            value: 'last1year',
            label: 'Last Year'
        }
    ]
    // const [category, setCategory] = useState<any>()
    const [time, setTime] = useState<any>(timeOptions[0].value)
    const [search, setSearch] = useState<any>('')
    const [debouncedValue] = useDebounce(search, 1000)

    // const { data: options } = useQuery({
    //     queryKey: ['categories'],
    //     queryFn: fetchCategories,
    //     select: (data) => {
    //         return data.categories.map((category: Category) => {
    //             return {
    //                 value: category.id,
    //                 label: category.name,
    //             }
    //         })
    //     },
    //     onError: (data: any) => {
    //         enqueueSnackbar(data.message, { variant: 'error' })
    //     }
    // })


    useEffect(() => {
        setorderFilters({ ...orderFilters, filter: time })
    }, [
        time
    ])

    useEffect(() => {
        setorderFilters({ ...orderFilters, searchTerm: debouncedValue })
    }, [debouncedValue])

    const handleChange = (selectedOption: any) => {
        setTime(selectedOption.value)
    }

    return (
        <div className='flex flex-row w-full justify-center items-center py-5 shadow-2xl'>
            <form action="" className='flex flex-row justify-center items-center w-full gap-5'>
                <div className='flex flex-col justify-center items-start w-1/3'>
                    <label className='font-bold' htmlFor="">Search by Customer ID/ Name</label>
                    <label htmlFor="search" className='relative block text-gray-400  rounded-[7.29114px] w-full focus-within:text-gray-700 bg-[#E6E6E6] shadow-[inset 0px 0px 5.83291px rgba(0, 0, 0, 0.1)] '>
                        <button type='submit'> <BiSearchAlt size={20} className="pointer-events-none left-1 absolute top-1/2  transform -translate-y-1/2 " /></button>
                        <input onChange={(e) => setSearch(e.target.value)} className='rounded-xl w-full px-6 py-1 bg-[#E6E6E6]  focus:outline-none' id='search' name='search' type="text" placeholder='Search' />
                    </label>
                </div>
                {/* <div className='flex flex-col justify-center items-start '>
                    <label className='font-bold' htmlFor="filter">
                        Category
                    </label>
                    <Select onChange={(e) => setCategory(e?.value)} value={category} options={options} styles={customStyles} className='z-50' />
                </div> */}
                <div className='flex flex-col justify-center items-start'>
                    <label className='font-bold' htmlFor="filter">
                        Time
                    </label>
                    <Select options={timeOptions} defaultValue={timeOptions[0]} onChange={handleChange} styles={customStyles} className='z-50' />
                </div>
            </form>
        </div>
    )
}
