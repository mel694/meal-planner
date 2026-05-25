import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import GoogleAnalytics from "../components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seven Dinners — Healthy eating made simple",
  description: "AI meal planning, smart shopping lists and delicious recipes for your family. No ultra-processed food, cooked from scratch.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body style={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
          <GoogleAnalytics />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
