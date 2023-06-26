import { Box, Tabs, Tab } from "@mui/material"
import { TabPanel, TabContext } from "@mui/lab"
import React, { useEffect, useState } from "react"
import { FilterComp } from "../../Components/Products/FilterComp";
import { ProductsTable } from "../../Components/Products/ProductsTable";
import { useSearchParams } from "react-router-dom";

export const Order = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState<string>(searchParams.get('orders') || 'active');

    useEffect(() => {
        if (searchParams.get('tab')) {
            setValue(searchParams.get('tab') || 'orders');
        }
    }, [searchParams, value]);

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        setSearchParams({
            tab: newValue,
        });
    };

    const TabItems = [
        {
            title: "Orders",
            params: "orders"
        },
        {
            title: "board",
            params: "board"
        },
        {
            title: "create order",
            params: "createorder"
        },
        {
            title: "Delivered",
            params: "delivered"
        }
    ]


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
                    <TabPanel value={'orders'}>
                        <div className="w-full">
                            <FilterComp />
                            <ProductsTable Tab="ACTIVE" />
                        </div>
                    </TabPanel>
                    <TabPanel value={'createorder'}>
                        <div className="w-full">
                            <FilterComp />
                            <ProductsTable Tab="DRAFT" />
                        </div>
                    </TabPanel>
                    <TabPanel value={'board'}>
                        <div className="w-full">
                            <FilterComp />
                            <ProductsTable Tab="onstocks" />
                        </div>
                    </TabPanel>

                    <TabPanel value={'delivered'}>
                        <FilterComp />
                    </TabPanel>
                </div>
            </TabContext>
        </div>
    )
}
