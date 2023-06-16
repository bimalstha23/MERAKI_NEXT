import { Box, Tabs, Tab } from "@mui/material"
import { TabPanel, TabContext } from "@mui/lab"
import React, { useState } from "react"
import { FilterComp } from "../../Components/Products/FilterComp";
import { ProductsTable } from "../../Components/Products/ProductsTable";
import { AddProducts } from "../../Components/Products/AddProducts";

export const Products = () => {
    const [value, setValue] = useState('0');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const TabItems = [
        {
            title: "Drafts",
        },
        {
            title: "On Stocks",
        }, {
            title: "Add Product",
        }, {
            title: "Out of Stocks",
        }, {
            title: "Archived",
        },
    ]

    return (
        <div className="flex flex-col items-center w-full  px-10">
            <h1 className="text-xl font-bold">Product Management</h1>

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
                            <Tab key={index} label={item.title} value={`${index}`} />
                        ))}
                    </Tabs>
                </Box>

                <div className="w-full">
                    <TabPanel value={'0'}>
                        <div className="w-full">
                            <FilterComp />
                            <ProductsTable />
                        </div>
                    </TabPanel>
                    <TabPanel value={'1'}>
                        <div className="w-full">
                            <FilterComp />
                            <ProductsTable />
                        </div>
                    </TabPanel>
                    <TabPanel value={'2'}>
                        <AddProducts />
                    </TabPanel>
                    <TabPanel value={'1'}>
                        <ProductsTable />
                    </TabPanel>
                </div>
            </TabContext>
        </div>
    )
}
