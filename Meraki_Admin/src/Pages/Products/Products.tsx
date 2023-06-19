import { Box, Tabs, Tab } from "@mui/material"
import { TabPanel, TabContext } from "@mui/lab"
import React, { useEffect, useState } from "react"
import { FilterComp } from "../../Components/Products/FilterComp";
import { ProductsTable } from "../../Components/Products/ProductsTable";
import { AddProducts } from "../../Components/Products/AddProducts";
import { useSearchParams } from "react-router-dom";

export const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState<string>(searchParams.get('tab') || 'drafts');

    useEffect(() => {
        if (searchParams.get('tab')) {
            setValue(searchParams.get('tab') || 'drafts');
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
            title: "Drafts",
            params: "drafts"
        },
        {
            title: "On Stocks",
            params: "onstocks"

        }, {
            title: "Add Product",
            params: 'addproduct'
        }, {
            title: "Out of Stocks",
            params: 'outofstocks'
        }, {
            title: "Archived",
            params: 'archived'
        }
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
                            <Tab key={index} label={item.title} value={item.params} />
                        ))}
                    </Tabs>
                </Box>

                <div className="w-full">
                    <TabPanel value={'drafts'}>
                        <div className="w-full">
                            <FilterComp />
                            <ProductsTable />
                        </div>
                    </TabPanel>
                    <TabPanel value={'onstocks'}>
                        <div className="w-full">
                            <FilterComp />
                            <ProductsTable />
                        </div>
                    </TabPanel>
                    <TabPanel value={'addproduct'}>
                        <AddProducts />
                    </TabPanel>
                    <TabPanel value={'outofstocks'}>
                        <FilterComp />
                        <ProductsTable />
                    </TabPanel>
                    <TabPanel value={'archived'}>
                        <FilterComp />
                        <ProductsTable />
                    </TabPanel>
                </div>
            </TabContext>
        </div>
    )
}
