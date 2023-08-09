import { Sidebar } from '../../Components/Sidebar'
import { Outlet } from 'react-router-dom'

export const DashBoard = () => {
    return (
        <div className='flex flex-row justify-center items-center'>
            <Sidebar />
            <div className='w-full h-screen overflow-auto'>
                <Outlet />
            </div>
        </div>
    )
}
