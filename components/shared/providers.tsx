'use client'
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader'; 

/** Toaster + NextAuth + NextTopLoader for layout.tsx */
export const Providers: React.FC<React.PropsWithChildren> = ({children}) => {
    return (
        <>
        {/* SessionProvider нужен для использования useSession */}
            <SessionProvider>
                {children}
            </SessionProvider>
            <Toaster />
            <NextTopLoader color='black' />
        </>
    );
};