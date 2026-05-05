import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/providers";
import { Suspense } from "react";
import { Notifications } from "@/components/shared/notifications";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cool auth",
  description: "Made by nougatcat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      {/* suppressHydrationWarning нужен чтобы работал провайдер темы */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers> {/* //! Если есть проблема с рендером, возможно она из-за Providers */}
          <Suspense>
            <Notifications /> {/* здесь это используется только чтобы вывести тост о том, что почта подтверждена и не делать всю страницу клиентской */}
          </Suspense> {/* //? Suspense нужен чтобы компонент внутри него с useSearchParams не вызывал ошибок при загрузке страницы. Еще в саспенс можно прописать фоллбек для прелоадера */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
