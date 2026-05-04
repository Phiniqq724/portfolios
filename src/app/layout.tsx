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
  title: "SANDY.",
  description: "Archive.",
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
