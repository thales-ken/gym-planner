import type { Metadata } from "next";
import "./globals.css";
import "./material-icons.css";
import { Lexend } from 'next/font/google'
import BottomNav from "@/components/bottom-nav";
import { AuthProvider } from "@/lib/auth-context";

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300','400','500','600','700']
})

export const metadata: Metadata = {
  title: "Gym Planner",
  description: "Your personal gym workout planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${lexend.className} antialiased bg-background-light dark:bg-background-dark text-foreground pb-24`}
      >
        <AuthProvider>
          {children}
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
