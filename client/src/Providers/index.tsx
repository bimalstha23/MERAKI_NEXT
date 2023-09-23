'use client';

import React, { FC, PropsWithChildren } from 'react'
import QueryProvider from './QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <QueryProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>

    )
}

export default Providers