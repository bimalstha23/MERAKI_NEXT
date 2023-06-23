'use client'
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Category  from '../Category/page'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
 const Categories = () => {
  return (
<div className="flex flex-col justify-center items-center">
    <h1 className="font-black">Categories</h1>
    <div>
              <Carousel>
                  <div className='flex flex-row justify-center items-center gap-3 max-sm:flex-col'>
                  <Category/>
                  <Category/>
                  <Category/>

  
                  </div>
                  <div className='flex flex-row justify-center items-center gap-3 max-sm:flex-col'>
                  <Category/>
                  <Category/>
                  <Category/>
                  </div>
                  <div className='flex flex-row justify-center items-center gap-3 max-sm:flex-col'>
                  <Category/>
                  <Category/>
                  <Category/>
                  </div>
              </Carousel>
            </div>
    <Stack spacing={2}>
      <Pagination
        count={10}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
</div>

  )
}
export default Categories;