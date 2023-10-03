import { Skeleton } from "@nextui-org/react";

export const loadingSkeletons = (length: number) => Array.from({ length: length }, (_, index) => (
    <Skeleton key={index} className='h-[200px] lg:h-[300px] w-full rounded-xl' >
        <div className="w-full h-full rounded-xl "></div>
    </Skeleton>
));
