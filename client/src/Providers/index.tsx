'use client';

import React, { FC, PropsWithChildren } from 'react'
import QueryProvider from './QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthProvider from './AuthProvider';
import { SnackbarProvider } from 'notistack';

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <SnackbarProvider>
            <QueryProvider>
                <AuthProvider>
                    {children}
                </AuthProvider >
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryProvider>
        </SnackbarProvider>
    )
}

export default Providers