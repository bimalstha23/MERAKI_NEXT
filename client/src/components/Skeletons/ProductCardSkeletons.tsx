import { Skeleton } from "@nextui-org/react";

const ProductCardSkeletons = (length: number) => Array.from({ length: length }, (_, index) => (
    <div key={index} className='flex flex-col gap-2 justify-center items-center w-full h-full'>
        <Skeleton className='lg:h-[270px] h-[150px] w-full'>
            <div className="w-full h-full  "></div>
        </Skeleton>
        <Skeleton className='w-full  h-[20px]' >
            <div className="w-full h-full  "></div>
        </Skeleton>
        <Skeleton className='w-full h-[20px]' >
            <div className="w-full h-full  "></div>
        </Skeleton>
        <Skeleton className='w-full h-[20px]' >
            <div className="w-full h-full  "></div></Skeleton>
    </div>
));

export default ProductCardSkeletons;