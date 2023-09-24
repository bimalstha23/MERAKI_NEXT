import { Skeleton } from "@mui/material";

const ProductCardSkeletons = (length: number) => Array.from({ length: length }, (_, index) => (
    <div key={index} className='flex flex-col justify-center items-center w-full h-full'>
        <Skeleton variant='rectangular' animation="wave" width={'100%'} height={270} className='lg:h-[270px] h-[150px]' />
        <Skeleton animation="wave" className='w-full' variant='text' />
        <Skeleton animation="wave" className='w-full' variant='text' />
        <Skeleton animation="wave" className='w-full' variant='text' height={"20px"} />
    </div>
));

export default ProductCardSkeletons;