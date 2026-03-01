import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "app/providers";
import { preloadState } from "entity/user";
import type { ReactNode } from "react";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Склад Collapse.by",
  description: "Система для учета склада collapse.by.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const preloadedState = await preloadState();
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased min-h-screen flex`}>
        <Providers preloadedState={preloadedState}>{children}</Providers>
      </body>
    </html>
  );
}
