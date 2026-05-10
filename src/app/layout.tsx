import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TryOnix | Virtual Try-On for the Future of Retail",
  description: "Experience the future of fashion with TryOnix. Our AI-powered virtual try-on technology eliminates the fear of buying clothes online. See how it fits before you buy.",
  keywords: ["Virtual Try-On", "AI Fashion", "TryOnix", "E-commerce Tech", "Fashion Tech", "Online Shopping"],
  openGraph: {
    title: "TryOnix | Virtual Try-On",
    description: "Eliminating the fear of online shopping with AI-powered virtual try-on.",
    url: "https://tryonix-nine.vercel.app/",
    siteName: "TryOnix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TryOnix | Virtual Try-On",
    description: "AI-powered virtual try-on technology for the future of retail.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
