import React, { PropsWithChildren, Suspense } from 'react'

export const RouteWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            {children}
        </Suspense>
    )
}
