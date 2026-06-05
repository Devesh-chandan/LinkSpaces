import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkSpaces | Personal Dashboard",
  description: "Modern, lightweight link management and scheduling hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-50 antialiased selection:bg-cyan-500/30">
        {children}
      </body>
    </html>
  );
}