'use client'
import React from 'react';
// import { Toaster } from 'react-hot-toast';
// import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader'; 

/** Toaster + NextAuth + NextTopLoader for layout.tsx */
export const Providers: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <>
            {/* //TODO <SessionProvider>
                {children}
            </SessionProvider> */
            } 
            {children}
            {/* //TODO <Toaster /> */}
            <NextTopLoader color='black' />
        </>
    );
};