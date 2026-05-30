// lib/useSubscription.ts
// Tracks user subscription tier and usage limits

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export type Tier = "free" | "premium" | "premiumPlus";

const FREE_PLAN_LIMIT = 3; // plans per week

function getWeekKey() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.floor((now.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return `sd_usage_${now.getFullYear()}_w${weekNum}`;
}

export function useSubscription() {
  const { user, isSignedIn } = useUser();
  const [tier, setTier] = useState<Tier>("free");
  const [plansThisWeek, setPlansThisWeek] = useState(0);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    // Get tier from Clerk public metadata
    const metadata = user.publicMetadata as { subscription?: { status?: string; plan?: string } };
    const sub = metadata?.subscription;

    if (sub?.status === "active") {
      if (sub?.plan === "premiumPlus") {
        setTier("premiumPlus");
      } else if (sub?.plan === "premium") {
        setTier("premium");
      } else {
        setTier("free");
      }
    } else {
      setTier("free");
    }

    // Load usage count from localStorage
    const weekKey = getWeekKey();
    const stored = localStorage.getItem(weekKey);
    setPlansThisWeek(stored ? parseInt(stored, 10) : 0);
  }, [user, isSignedIn]);

  const incrementUsage = () => {
    const weekKey = getWeekKey();
    const current = parseInt(localStorage.getItem(weekKey) || "0", 10);
    const next = current + 1;
    localStorage.setItem(weekKey, String(next));
    setPlansThisWeek(next);
    return next;
  };

  const canGeneratePlan = tier !== "free" || plansThisWeek < FREE_PLAN_LIMIT;
  const plansRemaining = Math.max(0, FREE_PLAN_LIMIT - plansThisWeek);
  const canUseFridge = tier !== "free";
  const canDownloadCalendar = tier !== "free";
  const canExportPDF = tier !== "free";
  const canUseNutritionCoach = tier === "premiumPlus";

  return {
    tier,
    plansThisWeek,
    plansRemaining,
    canGeneratePlan,
    canUseFridge,
    canDownloadCalendar,
    canExportPDF,
    canUseNutritionCoach,
    incrementUsage,
    FREE_PLAN_LIMIT,
  };
}
