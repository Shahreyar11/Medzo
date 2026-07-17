import type { Metadata } from "next";
import "@/app/globals.css"; 
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Medzo | Clinic & Hospital Software",
  description: "Every patient, in order. Every record, in place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#F4F7F6]">
        {children}
        <Toaster 
          position="top-right" 
        />
      </body>
    </html>
  );
}