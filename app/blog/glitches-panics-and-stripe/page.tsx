"use client";
import Link from "next/link";

const Logo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradB3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradB3)"/>
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

export default function BlogPost3() {
  return (
    <div style={{minHeight:"100vh",background:"#F9FAFB",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>

      <nav style={{padding:"14px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"white",borderBottom:"1px solid #F3F4F6",position:"sticky",top:0,zIndex:10}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
          <Logo size={38}/>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:"#14532D",lineHeight:1}}>Seven</div>
            <div style={{fontSize:16,fontWeight:800,color:"#22C55E",lineHeight:1}}>Dinners</div>
          </div>
        </Link>
        <div style={{display:"flex",gap:16,alignItems:"center"}}>
          <Link href="/blog" style={{color:"#6B7280",fontSize:14,textDecoration:"none",fontWeight:500}}>← All posts</Link>
          <Link href="/app" style={{padding:"8px 20px",background:"#22C55E",color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none"}}>Try it free</Link>
        </div>
      </nav>

      <div style={{maxWidth:680,margin:"0 auto",padding:"48px 24px"}}>

        <div style={{marginBottom:32}}>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:16,flexWrap:"wrap"}}>
            <span style={{fontSize:11,fontWeight:700,color:"#F59E0B",textTransform:"uppercase",letterSpacing:"0.06em"}}>Post 3</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>May 2026</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>5 min read</span>
          </div>
          <h1 style={{fontSize:38,fontWeight:800,color:"#14532D",letterSpacing:"-1px",margin:"0 0 16px",lineHeight:1.1}}>Glitches, Panics and Stripe</h1>
          <p style={{fontSize:18,color:"#6B7280",lineHeight:1.6,margin:0,fontStyle:"italic"}}>The less glamorous side of building a product: security, legal policies and a very stressful chat limit.</p>
        </div>

        <div style={{width:"100%",height:4,background:"linear-gradient(90deg,#F59E0B,#EF4444)",borderRadius:2,marginBottom:40}}/>

        <div style={{fontSize:16,color:"#374151",lineHeight:1.8}}>

          <p>Right, this is the honest post. The one where I tell you that building Seven Dinners was not all smooth sailing and exciting features. There were moments of genuine panic. There were bugs that made no sense. There were days where I thought I had broken everything beyond repair. And there was Stripe.</p>

          <p>Let me tell you about Stripe.</p>

          <p>At some point during the build, it occurred to me that this tool might actually be useful to more than just my immediate circle of friends. If people were genuinely getting value from it, perhaps there was something here worth monetising. Nothing greedy, just enough to cover the running costs and, one day, maybe a little more.</p>

          <p>Stripe is the payment platform most online businesses use. It is technically brilliant. It is also quite involved to integrate properly, especially if you are building a subscription-based product with different pricing tiers. I had Premium and Premium Plus plans to set up, webhooks to configure so the system knew when someone had actually paid, and user account states to manage in the database.</p>

          <p>I was working through this with Claude, building piece by piece, and then it happened. The chat reached its limit.</p>

          <p>If you have not experienced this, Claude conversations have a context window. When you have been going back and forth for hours building a complex project, eventually you hit the limit and have to start a new chat. The new chat has no memory of what you built. None. It does not know your file structure, your environment variables, your database schema, or the fact that you spent three sessions getting the authentication working.</p>

          <p>I want to be honest: this was painful. I had to reconstruct the context from scratch, paste in code snippets, explain what I had already done, and hope that the new conversation could pick up where the old one left off. Sometimes it did. Sometimes it took a while to get back on track. I learned very quickly to keep notes, save files obsessively, and write down anything important before the chat timed out.</p>

          <p>We got there in the end. The Stripe integration works. You can subscribe, your account upgrades, the whole thing functions as it should. But it was a proper palaver and I will not pretend otherwise.</p>

          <p>Then came the legal side. I had not really thought about this until Claude flagged it. To run a website that collects personal data and takes payments, you need several things: a Privacy Policy, a Cookie Policy, Terms and Conditions, and registration with the ICO (the UK's Information Commissioner's Office). The ICO registration costs £40 a year. The policies need to cover specific things. The cookie banner needs to work properly.</p>

          <p>None of this is wildly complicated once you know what you need, but I had to learn it all from scratch. Claude walked me through every step, which was incredibly helpful. I used a tool called Termly to generate the legal documents, got them up on the site, configured the cookie consent banner, and registered with the ICO.</p>

          <p>Claude tells me it is all now secure and legally compliant. I believe it. But I will not pretend that part of the journey was anything other than a genuine learning experience. There were moments where I was not sure I had done it right, moments where I worried I had missed something important, and one memorable evening where I realised the cookie banner was in the wrong place in the code and causing a build error that took me an hour to track down.</p>

          <p>All of it was worth it. Every glitch, every panic, every moment of staring at an error message and having absolutely no idea what it meant. Each time I fixed something, I understood the whole thing a little better. And the product got stronger for it.</p>

          <p>If you are thinking about building something yourself, please don't be put off by any of this. The tools available today are extraordinary. You do not need to know how to code. You need patience, curiosity, and a willingness to learn. The rest is just problem solving.</p>

        </div>

        <div style={{marginTop:48,padding:"24px",background:"#FEF3C7",borderRadius:14,border:"1px solid #FCD34D"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#92400E",marginBottom:6}}>The good news?</div>
          <p style={{fontSize:13,color:"#4B5563",margin:"0 0 14px",lineHeight:1.5}}>All that security and legal groundwork means Seven Dinners is safe to use. Your data is protected, and the tool is exactly what it says it is.</p>
          <Link href="/app" style={{display:"inline-block",padding:"10px 22px",background:"#F59E0B",color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none"}}>Try it for yourself →</Link>
        </div>

        <div style={{marginTop:32,display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:24,borderTop:"1px solid #E5E7EB"}}>
          <Link href="/blog/how-it-happened-by-accident" style={{color:"#6B7280",fontSize:13,textDecoration:"none"}}>← Previous post</Link>
          <Link href="/blog/going-to-market" style={{color:"#22C55E",fontSize:13,fontWeight:600,textDecoration:"none"}}>Next post →</Link>
        </div>

      </div>
    </div>
  );
}
