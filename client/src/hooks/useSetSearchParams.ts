import { useSearchParams } from "next/navigation"
import { useCallback } from "react"


const useSetSearchParams = () => {
    const searchParams = useSearchParams()

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
        console.log(params.toString())
        return params.toString()
    }, [searchParams])

    return createQueryString
}

export default useSetSearchParams