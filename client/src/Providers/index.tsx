'use client';

import React, { FC, PropsWithChildren } from 'react'
import QueryProvider from './QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthProvider from './AuthProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <QueryProvider>
            <AuthProvider>
                {children}
            </AuthProvider >
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
    )
}

export default Providers