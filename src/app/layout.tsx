import type { Metadata } from "next";
import "./globals.css";
import Providers from "./provider";
import { AuthProvider } from "@/context/authProvider";
/* import { Outfit, Comic_Neue } from "next/font/google"; */
import NavBar from "@/components/ui/NavBar";
import Feed from "@/components/feed/Feed";
import { ToastContainer } from "react-toastify";

/* const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});
 */
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
    <html lang="en">
      <body className="font-primary">
        <Providers>
          <AuthProvider>
            <ToastContainer />
            {/*  <ToastContainer /> */}
            <div className="min-h-screen w-full flex justify-center bg-linear-to-bl/longer from-yellow-200 via-orange-200 to-indigo-300">
              <div className="w-full md:w-3/4 lg:w-1/2">
                <NavBar />
                <Feed />

                {children}
              </div>
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
