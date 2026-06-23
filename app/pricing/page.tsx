"use client";
import { useState } from "react";
import Link from "next/link";

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradPricing" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradPricing)"/>
    <ellipse cx="30" cy="30" rx="22" ry="4" fill="#6D28D9"/>
    <circle cx="20" cy="22" r="3.5" fill="#22C55E"/>
    <circle cx="26" cy="18" r="3" fill="#FACC15"/>
    <circle cx="33" cy="20" r="3.5" fill="#EF4444"/>
    <circle cx="40" cy="22" r="3" fill="#F97316"/>
    <circle cx="30" cy="14" r="2.5" fill="#16A34A"/>
    <path d="M28 10 Q30 6 32 10 Q31 8 30 8 Q29 8 28 10 Z" fill="#16A34A"/>
    <text x="14" y="32" fontSize="11" fontWeight="900" fill="white" fontFamily="-apple-system,sans-serif">7</text>
  </svg>
);

const FREE_FEATURES = [
  "AI-generated 7-day meal plans",
  "Fridge & cupboard scanning",
  "Smart shopping lists",
  "Supermarket links (Tesco, Sainsbury's, ASDA + more)",
  "Swap any meal in one tap",
  "Dietary & allergy filters",
  "Family portion sizes",
  "Favourite recipes",
  "Save your weekly plans",
  "PDF & calendar export",
  "No account needed",
];

const FITNESS_FEATURES = [
  "AI strength training plans",
  "Workouts built around your meals",
  "Macro & calorie targets",
  "Progress tracking",
  "Everything in the free planner",
];

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div style={{minHeight:"100vh",background:"#F9FAFB",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`*{box-sizing:border-box}@media(max-width:768px){.pricing-grid{grid-template-columns:1fr!important}}`}</style>

      <nav style={{background:"white",borderBottom:"1px solid #E5E7EB",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
          <Logo/>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:"#14532D",lineHeight:1}}>Seven</div>
            <div style={{fontSize:15,fontWeight:800,color:"#22C55E",lineHeight:1}}>Dinners</div>
          </div>
        </Link>
        <div style={{display:"flex",gap:10}}>
          <Link href="/account" style={{padding:"7px 14px",border:"1px solid #E5E7EB",background:"white",color:"#6B7280",borderRadius:100,fontSize:12,fontWeight:600,textDecoration:"none"}}>My Plans</Link>
          <Link href="/app" style={{padding:"7px 14px",background:"#22C55E",color:"white",borderRadius:100,fontSize:12,fontWeight:700,textDecoration:"none"}}>Start planning →</Link>
        </div>
      </nav>

      <div style={{maxWidth:900,margin:"0 auto",padding:"48px 24px 64px"}}>

        <div style={{textAlign:"center",marginBottom:48}}>
          <h1 style={{fontSize:36,fontWeight:800,color:"#14532D",margin:"0 0 12px",letterSpacing:"-1px"}}>Simple, honest pricing</h1>
          <p style={{fontSize:16,color:"#4B5563",margin:0,lineHeight:1.6}}>Everything you need to eat well as a family — free, forever. Fitness coaching coming soon.</p>
        </div>

        <div className="pricing-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,alignItems:"start"}}>

          {/* Free tier */}
          <div style={{background:"white",borderRadius:20,border:"2px solid #22C55E",padding:"32px 28px",boxShadow:"0 4px 24px rgba(34,197,94,0.1)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"#DCFCE7",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🌱</div>
              <div>
                <div style={{fontSize:12,fontWeight:800,color:"#22C55E",letterSpacing:"0.08em",textTransform:"uppercase"}}>Free Forever</div>
                <div style={{fontSize:13,color:"#6B7280",marginTop:1}}>Everything you need, nothing you don't</div>
              </div>
            </div>

            <div style={{marginBottom:24}}>
              <span style={{fontSize:44,fontWeight:800,color:"#14532D",letterSpacing:"-1px"}}>£0</span>
              <span style={{fontSize:14,color:"#6B7280",marginLeft:6}}>forever</span>
            </div>

            <ul style={{listStyle:"none",padding:0,margin:"0 0 28px"}}>
              {FREE_FEATURES.map((f) => (
                <li key={f} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10,fontSize:14,color:"#374151"}}>
                  <span style={{color:"#22C55E",fontWeight:700,flexShrink:0,marginTop:1}}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/app" style={{display:"block",textAlign:"center",padding:"14px",background:"#22C55E",color:"white",borderRadius:12,fontSize:15,fontWeight:700,textDecoration:"none",boxShadow:"0 4px 16px rgba(34,197,94,0.35)"}}>
              Start planning free →
            </Link>
            <p style={{textAlign:"center",fontSize:12,color:"#9CA3AF",margin:"10px 0 0"}}>No account needed · Works in any browser</p>
          </div>

          {/* Fitness tier */}
          <div style={{background:"white",borderRadius:20,border:"2px solid #A855F7",padding:"32px 28px",position:"relative",boxShadow:"0 4px 24px rgba(168,85,247,0.1)"}}>
            <div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#7C3AED,#A855F7)",color:"white",fontSize:11,fontWeight:800,padding:"5px 16px",borderRadius:100,letterSpacing:"0.06em",whiteSpace:"nowrap"}}>COMING SOON</div>

            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <div style={{width:48,height:48,borderRadius:"50%",background:"#F3E8FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>💪</div>
              <div>
                <div style={{fontSize:12,fontWeight:800,color:"#A855F7",letterSpacing:"0.08em",textTransform:"uppercase"}}>Seven Dinners Fitness</div>
                <div style={{fontSize:13,color:"#6B7280",marginTop:1}}>Your meals and workouts, together</div>
              </div>
            </div>

            <div style={{marginBottom:24}}>
              <span style={{fontSize:44,fontWeight:800,color:"#14532D",letterSpacing:"-1px"}}>TBC</span>
              <span style={{fontSize:14,color:"#6B7280",marginLeft:6}}>/ month</span>
            </div>

            <ul style={{listStyle:"none",padding:0,margin:"0 0 28px"}}>
              {FITNESS_FEATURES.map((f) => (
                <li key={f} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10,fontSize:14,color:"#374151"}}>
                  <span style={{color:"#A855F7",fontWeight:700,flexShrink:0,marginTop:1}}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {status === "success" ? (
              <div style={{background:"#F3E8FF",borderRadius:12,padding:"20px",border:"2px solid #D8B4FE",textAlign:"center"}}>
                <div style={{fontSize:22,marginBottom:8}}>🎉</div>
                <p style={{fontSize:14,fontWeight:600,color:"#6B21A8",margin:"0 0 6px",lineHeight:1.5}}>
                  You're in.
                </p>
                <p style={{fontSize:13,color:"#7C3AED",margin:0,lineHeight:1.6}}>
                  You'll be first to hear when Seven Dinners Fitness launches — and you'll get early access before anyone else. In the meantime, your free meal planner is ready and waiting.
                </p>
                <Link href="/app" style={{display:"inline-block",marginTop:14,padding:"10px 20px",background:"#A855F7",color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none"}}>Go to the planner →</Link>
              </div>
            ) : (
              <form onSubmit={handleWaitlist}>
                <p style={{fontSize:13,color:"#6B7280",margin:"0 0 12px",lineHeight:1.5}}>Be first in line. We'll email you when it launches — and you'll get early access before everyone else.</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setErrorMsg(""); }}
                  placeholder="your@email.com"
                  required
                  style={{width:"100%",padding:"12px 14px",border:"2px solid #D8B4FE",borderRadius:10,fontSize:14,color:"#374151",outline:"none",marginBottom:10,fontFamily:"inherit",background:"#FAFAFA"}}
                />
                {status === "error" && (
                  <p style={{fontSize:12,color:"#DC2626",margin:"0 0 8px"}}>{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{width:"100%",padding:"14px",background:status==="loading"?"#C4B5FD":"linear-gradient(135deg,#7C3AED,#A855F7)",color:"white",border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:status==="loading"?"not-allowed":"pointer",transition:"opacity 0.15s"}}
                >
                  {status === "loading" ? "Joining..." : "Join the waitlist →"}
                </button>
              </form>
            )}
          </div>

        </div>

        <div style={{marginTop:40,padding:"20px 24px",background:"white",borderRadius:16,border:"1px solid #E5E7EB",display:"flex",justifyContent:"center",gap:40,flexWrap:"wrap"}}>
          {[
            { icon:"🔒", text:"Your data stays in your browser" },
            { icon:"🚫", text:"No account required" },
            { icon:"💸", text:"Free plan is free forever" },
          ].map((item) => (
            <div key={item.text} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#374151"}}>
              <span>{item.icon}</span>
              <span style={{fontWeight:500}}>{item.text}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
