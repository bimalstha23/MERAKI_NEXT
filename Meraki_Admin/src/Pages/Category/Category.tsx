import { TabContext, TabPanel } from "@mui/lab"
import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CategoryLists } from "../../Components/Category/CategoryLists";
import { AddCategory } from "../../Components/Category/AddCategory";

export const Category = () => {
    const TabItems = [
        {
            title: 'All Categories',
            params: 'categories'
        }, {
            title: 'Add Category',
            params: 'addcategory'
        }
    ]

    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState<string>(searchParams.get('orders') || 'categories');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        setSearchParams({
            tab: newValue,
        });
    };

    return (
        <div className="flex flex-col items-center w-full  px-10">
            <h1 className="text-xl font-bold">Order Management</h1>
            <TabContext value={value}>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <Tabs value={value} onChange={handleChange} sx={{
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#FB2448",
                            height: "3px",
                            color: "#FB2448"
                        },
                        "& .MuiTab-root": {
                            color: "#121212",
                            fontWeight: "bold",
                            fontSize: "14px",
                            "&.Mui-selected": {
                                color: "#FB2448",
                            }
                        }
                    }}
                        TabIndicatorProps={{
                            style: { background: '#FB2448', color: '#FB2448' },
                            color: ""
                        }}
                        style={{
                            height: "3px"
                        }}
                        centered>
                        {TabItems.map((item, index) => (
                            <Tab key={index} label={item.title} value={item.params} />
                        ))}
                    </Tabs>
                </Box>
                <div className="w-full">
                    <TabPanel
                        sx={{
                            width: "100%"
                        }}
                        value="categories">
                        <CategoryLists />
                    </TabPanel>
                    <TabPanel
                        sx={{
                            width: "100%"
                        }}
                        value="addcategory">
                        <AddCategory />
                    </TabPanel>
                </div>
            </TabContext>
        </div>
    )
}
