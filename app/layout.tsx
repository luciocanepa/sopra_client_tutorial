import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { App as AntdApp } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ThemeProvider from "@/components/ThemeProvider";
import "@/styles/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student XX-XXX-XXX",
  description: "sopra-fs26-template-client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <ThemeProvider>
            <AntdApp>{children}</AntdApp>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
