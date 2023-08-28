'use client';

import React, { FC, PropsWithChildren } from 'react'
import QueryProvider from './QueryProvider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>

    )
}

export default Providers