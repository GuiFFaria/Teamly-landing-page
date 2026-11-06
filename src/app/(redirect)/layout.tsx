import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = { title: "Teamly", robots: { index: false } };

export default function RedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
