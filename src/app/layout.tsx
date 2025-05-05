import type { Metadata, Viewport } from "next";
import { Lato, Roboto } from "next/font/google";

import ReduxProvider from "@/providers/redux-provider";

import { Toaster } from "@/components/ui/sonner";

import { GetPageMetadata } from "@/utils/meta-data";

// STYLE SHEETS SOURCE
import "../styles/globals.css";
import "../styles/includes.css";
import "../styles/animations.css";

// FONT CONFIGURATIONS
const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

// WEBSITE METADATA AND VIEWPORT
export const metadata: Metadata = GetPageMetadata();
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  interactiveWidget: "resizes-visual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lato.variable} ${roboto.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
