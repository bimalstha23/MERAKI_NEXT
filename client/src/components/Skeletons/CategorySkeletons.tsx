import { Skeleton } from "@mui/material";

export const loadingSkeletons = (length: number) => Array.from({ length: length }, (_, index) => (
    <div key={index} className='flex flex-col justify-center items-center w-full h-full'>
        <Skeleton variant='rectangular' animation="wave" width={'100%'} height={200} className='h-[200px] lg:h-[300px]' />
    </div>
));
