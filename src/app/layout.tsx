import type { Metadata } from "next";
import { Manrope, Inter, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import SmoothWrapper from "@/components/utils/smoothScrollWrapper";
import LoadingWrapper from "@/components/utils/loadingWrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { CursorWrapper } from "@/components/cursor";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mustpikek.dev"),
  title: {
    default: "Fahrell Sandy | Portfolio",
    template: "%s | Fahrell Sandy",
  },
  description:
    "Portfolio and archive of Fahrell Sandy, showcasing projects, skills, and experience.",
  keywords: [
    "Fahrell Sandy",
    "Portfolio",
    "Software Engineer",
    "Frontend Developer",
    "Fullstack Developer",
    "Next.js",
    "React",
    "Web Development",
  ],
  authors: [{ name: "Fahrell Sandy" }],
  creator: "Fahrell Sandy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mustpikek.dev",
    title: "Fahrell Sandy | Portfolio",
    description:
      "Portfolio and archive of Fahrell Sandy, showcasing projects, skills, and experience.",
    siteName: "Fahrell Sandy Portfolio",
    images: [
      {
        url: "/favicon.ico", // TODO: Add an og-image.png to your public folder
        width: 1200,
        height: 630,
        alt: "Fahrell Sandy Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahrell Sandy | Portfolio",
    description:
      "Portfolio and archive of Fahrell Sandy, showcasing projects, skills, and experience.",
    images: ["/og-image.png"], // TODO: Add an og-image.png to your public folder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <LoadingWrapper>
            <CursorWrapper>
              <Navbar />
              <SmoothWrapper>
                <main className="mx-auto max-w-full xl:max-w-360">
                  {children}
                </main>
                <Footer />
              </SmoothWrapper>
            </CursorWrapper>
            <Toaster />
          </LoadingWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
