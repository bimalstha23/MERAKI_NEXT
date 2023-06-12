import { Sidebar } from '../../Components/Sidebar'
import { Outlet } from 'react-router-dom'

export const DashBoard = () => {
    return (
        <div className='flex flex-row'>
            <Sidebar />
            <Outlet />
        </div>
    )
}
