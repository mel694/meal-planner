import Link from "next/link";
import PricingTiers from "../../components/PricingTiers";

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

export default function PricingPage() {
  return (
    <div style={{minHeight:"100vh",background:"#F9FAFB",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`*{box-sizing:border-box}`}</style>

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

        <PricingTiers />

      </div>
    </div>
  );
}
