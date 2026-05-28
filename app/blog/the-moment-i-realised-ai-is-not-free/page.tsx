"use client";
import Link from "next/link";

const Logo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradB6" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradB6)"/>
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

export default function BlogPost6() {
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
            <span style={{fontSize:11,fontWeight:700,color:"#EF4444",textTransform:"uppercase",letterSpacing:"0.06em"}}>Post 6</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>May 2026</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>4 min read</span>
          </div>
          <h1 style={{fontSize:38,fontWeight:800,color:"#14532D",letterSpacing:"-1px",margin:"0 0 16px",lineHeight:1.1}}>The Moment I Realised AI Is Not Free</h1>
          <p style={{fontSize:18,color:"#6B7280",lineHeight:1.6,margin:0,fontStyle:"italic"}}>A panic-inducing email, a very fast lesson in API costs, and a complete rethink of the pricing strategy.</p>
        </div>

        <div style={{width:"100%",height:4,background:"linear-gradient(90deg,#EF4444,#F97316)",borderRadius:2,marginBottom:40}}/>

        <div style={{fontSize:16,color:"#374151",lineHeight:1.8}}>

          <p>There is a specific kind of panic that comes from receiving an unexpected email about money when you are in the middle of excitedly showing your new project to friends and family. It is the kind that makes you put down your cup of tea very carefully and read the email again just to make sure you understood it correctly.</p>

          <p>That email arrived from Anthropic, the company behind Claude, the AI that powers Seven Dinners. The subject line was cheerful enough. Something along the lines of: your free credits have been used up, would you like to add more?</p>

          <p>Free credits. I had not really thought much about the free credits. When I started building Seven Dinners I had been given $5 of free API usage to get going. Five dollars felt like plenty. I was just testing things out. How much could it possibly cost?</p>

          <p>Quite a lot, as it turned out, when you have twelve enthusiastic friends and family members all trying your new meal planner at the same time, each generating full weekly meal plans with shopping lists, some of them generating two or three plans in a row because they wanted to see different options. Every single one of those generations was a call to the Claude API. Every single one cost a small amount of money. And those small amounts had quietly added up to five dollars before I had noticed what was happening.</p>

          <p>I sat with the email for a moment. Then I opened a spreadsheet. I am a Chartered Accountant, after all. When in doubt, build a model.</p>

          <p>The numbers were actually reassuring once I looked at them properly. Each meal plan generation costs roughly 2 to 3 pence in API fees. At that rate, even a thousand generations a month would cost around £25 to £30. That is entirely manageable. The panic was disproportionate to the actual numbers, which is often the case with financial panics.</p>

          <p>But it did force me to think seriously about the business model for the first time. Up to that point, Seven Dinners had been a free tool I was sharing with friends. The API costs were negligible at that scale. But what if it grew? What if hundreds of people started using it? What if thousands did?</p>

          <p>At scale, those 2 to 3 pence per generation start to matter. A free user who generates a new meal plan every day costs me nearly a pound a month in AI fees alone, before you factor in hosting, domain costs, or any of the other running costs of a live website. That is fine if they eventually convert to a paying subscriber. It is less fine if they never do.</p>

          <p>This is when I properly thought through the pricing tiers. Free users would get a limited number of generations per week. Premium subscribers would get unlimited access along with all the extra features. The pricing needed to cover costs comfortably and leave something over for the work that goes into building and maintaining the tool.</p>

          <p>I topped up my Anthropic credits, adjusted my thinking, and got back to building. The panic email turned out to be one of the most useful things that happened during the development of Seven Dinners. It forced me to stop thinking of it as a hobby project and start thinking of it as something real.</p>

          <p>Which, it turns out, it is. Funny how a £3.20 top-up can reframe an entire project.</p>

        </div>

        <div style={{marginTop:48,padding:"24px",background:"#FEF2F2",borderRadius:14,border:"1px solid #FECACA"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#DC2626",marginBottom:6}}>The good news for you?</div>
          <p style={{fontSize:13,color:"#4B5563",margin:"0 0 14px",lineHeight:1.5}}>Seven Dinners is completely free to try. No card required, no hidden costs. Generate your first week of meals right now and see if it works for your family.</p>
          <Link href="/app" style={{display:"inline-block",padding:"10px 22px",background:"#22C55E",color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none"}}>Try it free →</Link>
        </div>

        <div style={{marginTop:32,display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:24,borderTop:"1px solid #E5E7EB"}}>
          <Link href="/blog/spreading-the-healthy-eating-bug" style={{color:"#6B7280",fontSize:13,textDecoration:"none"}}>← Previous post</Link>
          <Link href="/blog/why-software-breaks-at-the-worst-moment" style={{color:"#22C55E",fontSize:13,fontWeight:600,textDecoration:"none"}}>Next post →</Link>
        </div>

      </div>
    </div>
  );
}
