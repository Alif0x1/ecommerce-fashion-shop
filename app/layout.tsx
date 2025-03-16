// layout.tsx - This remains a Server Component
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import QueryWrapper from "@/providers/query-provider";

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
        <QueryWrapper>
          <ModalProvider />
          <ToastProvider />
          <Navbar />
          {children}
          <Footer />
        </QueryWrapper>
      </body>
    </html>
  );
}