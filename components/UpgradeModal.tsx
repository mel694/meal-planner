'use client';

type UpgradeModalProps = {
  reason: "plan_limit" | "fridge" | "calendar" | "pdf" | "nutrition";
  onClose: () => void;
};

const MESSAGES = {
  plan_limit: {
    emoji: "🌟",
    title: "You've used your 3 free plans this week!",
    body: "You're clearly loving Seven Dinners! Upgrade to Premium for unlimited meal plans, fridge scanning, calendar downloads and more.",
  },
  fridge: {
    emoji: "📸",
    title: "Fridge scanning is a Premium feature",
    body: "Upgrade to Premium to scan your fridge and cupboards and get AI-powered recipes from what you already have.",
  },
  calendar: {
    emoji: "📅",
    title: "Calendar download is a Premium feature",
    body: "Upgrade to Premium to add your meal plan directly to your calendar with one click.",
  },
  pdf: {
    emoji: "🖨️",
    title: "PDF export is a Premium feature",
    body: "Upgrade to Premium to print or save your meal plan as a beautiful PDF.",
  },
  nutrition: {
    emoji: "🥗",
    title: "Nutrition coach is a Premium Plus feature",
    body: "Upgrade to Premium Plus to get your personal AI nutrition coach with macro tracking and fitness meal timing.",
  },
};

export default function UpgradeModal({ reason, onClose }: UpgradeModalProps) {
  const msg = MESSAGES[reason];

  const handleUpgrade = (plan: "premium" | "premiumPlus") => {
    fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    })
      .then(res => {
        if (res.status === 401) {
          window.location.href = "/sign-up?redirect=/pricing";
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data?.url) window.location.href = data.url;
      })
      .catch(() => {
        window.location.href = "/sign-up?redirect=/pricing";
      });
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "24px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white", borderRadius: 20, padding: "32px 28px",
          maxWidth: 420, width: "100%", textAlign: "center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: 52, marginBottom: 12 }}>{msg.emoji}</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 12, lineHeight: 1.3 }}>
          {msg.title}
        </h2>
        <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
          {msg.body}
        </p>

        {/* Pricing options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          <button
            onClick={() => handleUpgrade("premium")}
            style={{
              padding: "14px", background: "linear-gradient(135deg,#16A34A,#22C55E)",
              color: "white", border: "none", borderRadius: 12,
              fontSize: 15, fontWeight: 700, cursor: "pointer",
            }}
          >
            Upgrade to Premium — £7.99/month
          </button>
          {reason === "nutrition" ? null : (
            <button
              onClick={() => handleUpgrade("premiumPlus")}
              style={{
                padding: "14px", background: "linear-gradient(135deg,#7C3AED,#A855F7)",
                color: "white", border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 700, cursor: "pointer",
              }}
            >
              Upgrade to Premium Plus — £12.99/month
            </button>
          )}
          {reason === "nutrition" && (
            <button
              onClick={() => handleUpgrade("premiumPlus")}
              style={{
                padding: "14px", background: "linear-gradient(135deg,#7C3AED,#A855F7)",
                color: "white", border: "none", borderRadius: 12,
                fontSize: 15, fontWeight: 700, cursor: "pointer",
              }}
            >
              Upgrade to Premium Plus — £12.99/month
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          style={{
            background: "none", border: "none", color: "#9CA3AF",
            fontSize: 14, cursor: "pointer", textDecoration: "underline",
          }}
        >
          Maybe later
        </button>

        <p style={{ color: "#9CA3AF", fontSize: 12, marginTop: 12 }}>
          🔒 Secure payment via Stripe · Cancel anytime
        </p>
      </div>
    </div>
  );
}
