import { useQuery } from "@tanstack/react-query"
import { fetchCategories } from "../../services/categoryApi"
import { CategoryCard } from "./CategoryCard";
import { Skeleton } from "@mui/material";

export const CategoryLists = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories
    })

    return (
        <div className="w-full">
            {!isLoading ? <div className="flex flex-row flex-wrap gap-4 w-full ">
                {
                    data?.categories?.map((item: any, index: number) => (
                        <CategoryCard
                            key={index}
                            id={item?.id}
                            title={item?.name}
                            image={item?.image}
                            numeberOfProducts={item?.products?.length}
                        />
                    ))
                }
            </div> :
                <div className="flex flex-row flex-wrap gap-4 w-full ">
                    {[1, 2, 3, 4].map((i: number) => (
                        <Skeleton key={i} width={350} height={150}>
                        </Skeleton>
                    ))}
                </div>
            }
        </div >
    )
}