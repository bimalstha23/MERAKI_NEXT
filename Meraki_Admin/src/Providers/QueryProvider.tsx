import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import queryClient from '../API/ReactQuery'


const QueryProvider = ({ children }: React.PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider
