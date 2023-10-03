'use client';
import React, { FC, PropsWithChildren } from 'react'
import QueryProvider from './QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthProvider from './AuthProvider';
import { SnackbarProvider } from 'notistack';
import { NextUIProvider } from '@nextui-org/react';
import { ScrollShadow } from "@nextui-org/react";

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <NextUIProvider>
            <SnackbarProvider>
                <QueryProvider>
                    <AuthProvider>
                        <ScrollShadow>
                            {children}
                        </ScrollShadow>
                    </AuthProvider >
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryProvider>
            </SnackbarProvider>
        </NextUIProvider>
    )
}

export default Providers