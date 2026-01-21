import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "IntervueExp – Real Interview Experiences",
    template: "%s | IntervueExp",
  },
  description:
    "Read and share real interview experiences from top companies. Learn from selected and rejected candidates. No login required.",
  keywords: [
    "interview experiences",
    "company interview questions",
    "fresher interviews",
    "experienced interviews",
    "placement preparation",
  ],
  authors: [{ name: "IntervueExp" }],
  creator: "IntervueExp",
  metadataBase: new URL("https://intervue-exp.vercel.app/"), // change later

  openGraph: {
    title: "IntervueExp – Real Interview Experiences",
    description:
      "Learn from real interview experiences shared by candidates. Selected or rejected, every story helps.",
    url: "https://intervue-exp.vercel.app/",
    siteName: "IntervueExp",
    images: [
      {
        url: "/og-image.png", // optional
        width: 1200,
        height: 630,
        alt: "IntervueExp",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "IntervueExp",
    description:
      "Real interview experiences from freshers & experienced candidates.",
    images: ["/og-image.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
         
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
