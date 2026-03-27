import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishabh Kumar — The Story",
  description: "Portfolio of Rishabh Kumar — Pre-final year CS student at NIT Srinagar. Software Developer. ML Enthusiast. Problem Solver.",
  openGraph: {
    title: "Rishabh Kumar — The Story",
    description: "Software Developer & ML Enthusiast at National Institute of Technology Srinagar",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-ink text-parchment antialiased">
        {children}
      </body>
    </html>
  );
}
