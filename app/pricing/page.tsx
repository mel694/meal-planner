import Link from "next/link";

// This page is being rebuilt in Step 5 with free + fitness waitlist tiers.
export default function PricingPage() {
  return (
    <div style={{minHeight:"100vh",background:"#F9FAFB",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",textAlign:"center"}}>
      <div style={{fontSize:48,marginBottom:16}}>🚀</div>
      <h1 style={{fontSize:28,fontWeight:800,color:"#14532D",margin:"0 0 12px",letterSpacing:"-0.5px"}}>New pricing coming soon</h1>
      <p style={{fontSize:15,color:"#4B5563",maxWidth:400,lineHeight:1.6,margin:"0 0 28px"}}>
        Seven Dinners is completely free. A fitness coaching tier is on its way — sign up below to be first to hear about it.
      </p>
      <Link href="/app" style={{padding:"14px 32px",background:"#22C55E",color:"white",borderRadius:100,fontSize:15,fontWeight:700,textDecoration:"none",boxShadow:"0 4px 16px rgba(34,197,94,0.3)"}}>
        Start planning for free →
      </Link>
      <Link href="/" style={{marginTop:16,fontSize:13,color:"#6B7280",textDecoration:"none"}}>← Back to home</Link>
    </div>
  );
}
