import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css"; // Or import from a CSS module
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";

const UrbanistSans = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Store",
  description: "Store",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" className={UrbanistSans.className}>
      <body>
        <ModalProvider/>
        <ToastProvider/>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}