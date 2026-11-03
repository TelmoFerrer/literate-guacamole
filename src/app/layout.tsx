import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MyFinance",
    template: "%s · MyFinance",
  },
  description: "A clear, consolidated view of your financial life.",
  applicationName: "MyFinance",
};

export const viewport: Viewport = {
  themeColor: "#090d14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
