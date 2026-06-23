// lib/useSubscription.ts
// Tracks user subscription tier and usage limits

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export type Tier = "free" | "trial" | "premium" | "premiumPlus";

// Set to false to give all users full access with no limits.
// Set back to true to re-enable subscription gating.
const PAYWALL_ENABLED = false;

const FREE_PLAN_LIMIT = 3; // plans per week
const TRIAL_DAYS = 14;

function getWeekKey() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.floor((now.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000));
  return `sd_usage_${now.getFullYear()}_w${weekNum}`;
}

export function getTrialDaysRemaining(trialStartDate: string | undefined): number {
  if (!trialStartDate) return 0;
  const start = new Date(trialStartDate);
  const now = new Date();
  const daysUsed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, TRIAL_DAYS - daysUsed);
}

export function useSubscription() {
  const { user, isSignedIn } = useUser();
  const [tier, setTier] = useState<Tier>("free");
  const [plansThisWeek, setPlansThisWeek] = useState(0);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState(0);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    const metadata = user.publicMetadata as {
      subscription?: { status?: string; plan?: string };
      trialStartDate?: string;
    };
    const sub = metadata?.subscription;
    const trialStartDate = metadata?.trialStartDate;

    if (sub?.status === "active") {
      if (sub?.plan === "premiumPlus") {
        setTier("premiumPlus");
      } else if (sub?.plan === "premium") {
        setTier("premium");
      } else {
        setTier("free");
      }
      setTrialDaysRemaining(0);
    } else {
      // Check trial
      const daysRemaining = getTrialDaysRemaining(trialStartDate);
      if (daysRemaining > 0) {
        setTier("trial");
        setTrialDaysRemaining(daysRemaining);
      } else {
        setTier("free");
        setTrialDaysRemaining(0);
      }
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

  const isTrialOrPaid = tier === "trial" || tier === "premium" || tier === "premiumPlus";

  const canGeneratePlan = isTrialOrPaid || plansThisWeek < FREE_PLAN_LIMIT;
  const plansRemaining = Math.max(0, FREE_PLAN_LIMIT - plansThisWeek);
  const canUseFridge = isTrialOrPaid;
  const canDownloadCalendar = isTrialOrPaid;
  const canExportPDF = isTrialOrPaid;
  const canUseNutritionCoach = tier === "premiumPlus";

  // When PAYWALL_ENABLED is false, override everything to give full access.
  if (!PAYWALL_ENABLED) {
    return {
      tier: "premiumPlus" as Tier,
      plansThisWeek: 0,
      plansRemaining: Infinity,
      trialDaysRemaining: 0,
      canGeneratePlan: true,
      canUseFridge: true,
      canDownloadCalendar: true,
      canExportPDF: true,
      canUseNutritionCoach: true,
      incrementUsage,
      FREE_PLAN_LIMIT,
      TRIAL_DAYS,
    };
  }

  return {
    tier,
    plansThisWeek,
    plansRemaining,
    trialDaysRemaining,
    canGeneratePlan,
    canUseFridge,
    canDownloadCalendar,
    canExportPDF,
    canUseNutritionCoach,
    incrementUsage,
    FREE_PLAN_LIMIT,
    TRIAL_DAYS,
  };
}
