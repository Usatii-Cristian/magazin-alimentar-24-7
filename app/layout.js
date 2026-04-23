import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crissval – Magazin alimentar",
  description: "Produse alimentare proaspete, naturale, de la producători locali.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
