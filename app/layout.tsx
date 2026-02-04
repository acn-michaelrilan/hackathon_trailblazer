//
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // For navigation
import { Activity, UserCircle } from "lucide-react"; // Icons matching your image
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Profile | Trailblazers",
  description: "Manage your account information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          {/* Clickable Logo - Links to Homepage */}
          <Link
            href="/homepage"
            className="flex items-center gap-2 text-green-600 transition-transform duration-300 ease-in-out hover:scale-110 hover:text-green-700 hover:bg-green-100 p-2 rounded-full"
          >
            <Activity size={40} strokeWidth={2.5} color="#7BA63F" />
          </Link>

          {/* Right side Profile Icon */}
          <Link
            href="/userprofile"
            className="text-green-600 transition-transform duration-300 ease-in-out hover:scale-110 hover:text-green-700 hover:bg-green-100 p-2 rounded-full"
          >
            <UserCircle size={40} strokeWidth={2.0} color="#7BA63F" />
          </Link>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen flex flex-col items-center pt-10">
          {children}
        </main>
      </body>
    </html>
  );
}
