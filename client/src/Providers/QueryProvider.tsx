'use client';
import { queryClient } from '@/services/queryClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC, PropsWithChildren, useState } from 'react'
const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    const [client] = useState(queryClient)
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider