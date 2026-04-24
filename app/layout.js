import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Crissval – Magazin alimentar",
  description: "Produse alimentare proaspete, naturale, de la producători locali.",
};

export default async function RootLayout({ children }) {
  const h = await headers();
  const pathname = h.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="ro" className={`${geistSans.variable} h-full antialiased`}>
      <body className={`min-h-full flex flex-col ${isAdmin ? "bg-gray-100" : "bg-gray-50 text-gray-900"}`}>
        {!isAdmin && <Navbar />}
        <div className="flex-1">{children}</div>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
