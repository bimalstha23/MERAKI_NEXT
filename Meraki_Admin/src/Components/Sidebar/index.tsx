import { SideBarItems } from "./SidebarItems"
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {

    return (
        <div className='w-64 h-screen bg-background text-SecondaryText ' >
            <div className=" flex flex-col justify-between py-4  h-full bg-gray-50 rounded dark:bg-gray-800">
                <h1 className=" text-center text-5xl font-extrabold text-primary">
                    Meraki
                </h1>

                <div className=" flex flex-col justify-center items-start   h-full gap-10">
                    {
                        SideBarItems.map((item: ISidebarItems, index: number) => (
                            <NavLink
                                to={item.path}
                                style={({ isActive }: { isActive: boolean, isPending: boolean }) => ({ color: isActive ? '#121212' : '#FFFFFF', backgroundColor: isActive ? '#FFBA98' : '#121212' })}
                                key={index} className="flex items-center gap-5 text-xl  px-10 py-2 font-semibold w-full hover:text-PrimaryText hover:bg-primary">
                                {item.icon}
                                <span > {item.title}</span >
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}