"use client";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

const Logo = () => (
  <svg width="44" height="44" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradSU" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradSU)"/>
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

export default function SignUpPage() {
  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#F0FDF4 0%,#DCFCE7 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",marginBottom:32}}>
        <Logo/>
        <div>
          <div style={{fontSize:20,fontWeight:800,color:"#14532D",lineHeight:1,letterSpacing:"-0.3px"}}>Seven</div>
          <div style={{fontSize:20,fontWeight:800,color:"#22C55E",lineHeight:1,letterSpacing:"-0.3px"}}>Dinners</div>
        </div>
      </Link>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{background:"#22C55E",color:"white",borderRadius:100,padding:"6px 16px",fontSize:12,fontWeight:700,display:"inline-block",marginBottom:12}}>
          🎉 14 Day Free Trial — No card required
        </div>
        <h1 style={{fontSize:26,fontWeight:800,color:"#14532D",margin:"0 0 6px",letterSpacing:"-0.5px"}}>Start planning better meals today</h1>
        <p style={{fontSize:14,color:"#6B7280",margin:0}}>Get full access to every feature free for 14 days</p>
        <div style={{display:"flex",justifyContent:"center",gap:12,marginTop:12,flexWrap:"wrap"}}>
          {["✓ Full Premium access","✓ No card required","✓ Cancel anytime"].map(t => (
            <span key={t} style={{fontSize:12,color:"#22C55E",fontWeight:600}}>{t}</span>
          ))}
        </div>
      </div>
      <SignUp
        appearance={{
          elements: {
            rootBox: { width: "100%", maxWidth: "420px" },
            card: { borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", border: "1px solid #E5E7EB" },
            headerTitle: { color: "#14532D", fontWeight: "800" },
            headerSubtitle: { color: "#6B7280" },
            socialButtonsBlockButton: { border: "2px solid #E5E7EB", borderRadius: "10px", fontWeight: "600" },
            formButtonPrimary: { backgroundColor: "#22C55E", borderRadius: "10px", fontWeight: "700" },
            footerActionLink: { color: "#22C55E", fontWeight: "600" },
          }
        }}
      />
      <p style={{marginTop:20,fontSize:13,color:"#6B7280",textAlign:"center"}}>
        Already have an account?{" "}
        <Link href="/sign-in" style={{color:"#22C55E",fontWeight:700,textDecoration:"none"}}>Log in →</Link>
      </p>
    </div>
  );
}
