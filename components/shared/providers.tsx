'use client'
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';

import { ThemeProvider as NextThemesProvider } from "next-themes"


/** Toaster + NextAuth + NextTopLoader for layout.tsx */
// + NextThemesProvider
export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <>
            {/* SessionProvider нужен для использования useSession */}
            <SessionProvider>
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </NextThemesProvider>
            </SessionProvider>
            <Toaster />
            <NextTopLoader color='black' />
        </>
    );
};