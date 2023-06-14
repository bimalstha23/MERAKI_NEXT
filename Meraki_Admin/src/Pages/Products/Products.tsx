import { Box, Tabs, Tab } from "@mui/material"
import React, { useState } from "react"
import { FilterComp } from "../../Components/Products/FilterComp";
import { ProductsTable } from "../../Components/Products/ProductsTable";

export const Products = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
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
        <div className="flex flex-col items-center w-full pt-10 px-10">
            <h1 className="text-xl font-bold">Product Management</h1>
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
                        <Tab key={index} label={item.title} />
                    ))}
                </Tabs>
            </Box>
            <div className="w-full">
                <FilterComp />
            </div>
            <div className="w-full mt-5">
                <ProductsTable />
            </div>
        </div>
    )
}
