import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seven Dinners — Healthy eating made simple",
  description: "AI meal planning, smart shopping lists and delicious recipes for your family. No ultra-processed food, cooked from scratch.",
  keywords: "meal planner, family meals, healthy eating, AI recipes, shopping list, weekly dinner plan",
  openGraph: {
    title: "Seven Dinners — Healthy eating made simple",
    description: "AI meal planning, smart shopping lists and delicious recipes for your family.",
    url: "https://www.sevendinners.co.uk",
    siteName: "Seven Dinners",
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
        {children}
      </body>
    </html>
  );
}
