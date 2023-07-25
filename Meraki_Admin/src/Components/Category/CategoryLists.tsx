import { useQuery } from "@tanstack/react-query"
import { fetchCategories } from "../../ApiHandle/categoryApi"
import { CategoryCard } from "./CategoryCard";

export const CategoryLists = () => {
    const { data } = useQuery({
        queryKey: ["category"],
        queryFn: fetchCategories
    })


    return (
        <div className="flex flex-row flex-wrap w-full ">
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
        </div>
    )
}
