import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import GoogleAnalytics from "../components/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "Seven Dinners — AI Meal Planner for Families | Healthy Weekly Dinners",
  description: "Plan 7 healthy family dinners in seconds with AI. Get smart shopping lists for Sainsbury's, Tesco & Ocado. No ultra-processed food, cooked from scratch. Free to try.",
  keywords: "meal planner, family meal planning, AI meal planner, healthy family dinners, weekly meal plan, shopping list, healthy eating, meal prep UK",
  verification: {
    google: "R13KSH4Dm9RMgN0yGGCCut-tkYsqje3nNRZNl4gyxSM",
  },
  openGraph: {
    title: "Seven Dinners — AI Meal Planner for Families",
    description: "Plan 7 healthy family dinners in seconds. Smart shopping lists, no ultra-processed food, cooked from scratch.",
    url: "https://www.sevendinners.co.uk",
    siteName: "Seven Dinners",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seven Dinners — AI Meal Planner for Families",
    description: "Plan 7 healthy family dinners in seconds. Smart shopping lists, no ultra-processed food, cooked from scratch.",
  },
  alternates: {
    canonical: "https://www.sevendinners.co.uk",
  },
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
