import { Noto_Serif } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import TopBar from "@/components/TopBar";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS

export const metadata: Metadata = {
  title: "legit.",
  description: "A legitimate Latin reader.",
};
//
const noto = Noto_Serif({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${noto.className}`}
      >
        <TopBar />
        {children}
      </body>
    </html >
  );
}
