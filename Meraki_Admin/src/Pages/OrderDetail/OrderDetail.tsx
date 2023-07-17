import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getOrder } from "../../ApiHandle/OrderAPi"

export const OrderDetail = () => {
    const id = useParams<{ id: string }>().id
    const { data } = useQuery({
        queryKey: ['order', id],
        queryFn: () => getOrder(id),
    })

    return (
        <div>
            

        </div>
    )
}
