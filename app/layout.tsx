import { Noto_Serif } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`p-5 ${noto.className}`}
      >
        {children}
      </body>
    </html >
  );
}
