import type { Metadata } from "next";
import "./globals.css";
import Providers from "./provider";
import { AuthProvider } from "@/context/authProvider";
import { Outfit, Comic_Neue } from "next/font/google";
import NavBar from "@/components/ui/NavBar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "YPPR",
  description: "Yap yourself!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="font-outfit">
        <Providers>
          <AuthProvider>
            <div className="min-h-screen w-full flex justify-center bg-linear-to-bl/longer from-yellow-200 via-orange-200 to-indigo-300">
              <div className="w-full md:w-10/12 lg:w-1/2">
                <NavBar />
                {children}
              </div>
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
