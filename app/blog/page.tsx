"use client";
import Link from "next/link";

const Logo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradBlog" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradBlog)"/>
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

const posts = [
  {
    slug: "why-i-built-seven-dinners",
    title: "Why I Built Seven Dinners",
    subtitle: "A busy mum, a hungry household, and one too many Sunday evenings staring at an empty meal plan",
    date: "May 2026",
    readTime: "4 min read",
    emoji: "🍽️",
    bg: "#DCFCE7",
  },
  {
    slug: "how-it-happened-by-accident",
    title: "How It Happened By Accident",
    subtitle: "From a cheeky Claude prompt to a real website, with zero coding experience and a lot of adventure",
    date: "May 2026",
    readTime: "4 min read",
    emoji: "✨",
    bg: "#F3E8FF",
  },
  {
    slug: "glitches-panics-and-stripe",
    title: "Glitches, Panics and Stripe",
    subtitle: "The less glamorous side of building a product: security, legal policies and a very stressful chat limit",
    date: "May 2026",
    readTime: "5 min read",
    emoji: "😅",
    bg: "#FEF3C7",
  },
  {
    slug: "going-to-market",
    title: "Going to Market",
    subtitle: "Asking friends, gathering feedback, and building a tool that actually works for real families",
    date: "May 2026",
    readTime: "4 min read",
    emoji: "🚀",
    bg: "#DBEAFE",
  },
  {
    slug: "spreading-the-healthy-eating-bug",
    title: "Spreading the Healthy Eating Bug",
    subtitle: "How our family transformed our health, and why I want to help yours do the same",
    date: "May 2026",
    readTime: "4 min read",
    emoji: "💪",
    bg: "#FEE2E2",
  },
];

export default function BlogIndex() {
  return (
    <div style={{minHeight:"100vh",background:"#F9FAFB",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>

      <nav style={{padding:"14px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"white",borderBottom:"1px solid #F3F4F6",position:"sticky",top:0,zIndex:10}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
          <Logo size={38}/>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:"#14532D",lineHeight:1,letterSpacing:"-0.3px"}}>Seven</div>
            <div style={{fontSize:16,fontWeight:800,color:"#22C55E",lineHeight:1,letterSpacing:"-0.3px"}}>Dinners</div>
          </div>
        </Link>
        <div style={{display:"flex",gap:16,alignItems:"center"}}>
          <Link href="/" style={{color:"#6B7280",fontSize:14,textDecoration:"none",fontWeight:500}}>Home</Link>
          <Link href="/app" style={{padding:"8px 20px",background:"#22C55E",color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none"}}>Try it free</Link>
        </div>
      </nav>

      <div style={{maxWidth:800,margin:"0 auto",padding:"48px 24px"}}>
        <div style={{marginBottom:40}}>
          <h1 style={{fontSize:40,fontWeight:800,color:"#14532D",letterSpacing:"-1px",margin:"0 0 12px"}}>The Blog</h1>
          <p style={{fontSize:16,color:"#6B7280",lineHeight:1.6,margin:0}}>The honest story of building Seven Dinners. The why, the how, the panic, and the joy of it all.</p>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{textDecoration:"none"}}>
              <div style={{background:"white",borderRadius:16,border:"1px solid #E5E7EB",padding:"24px",display:"flex",gap:20,alignItems:"flex-start",transition:"box-shadow 0.2s",cursor:"pointer"}}>
                <div style={{width:72,height:72,borderRadius:14,background:post.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,flexShrink:0}}>
                  {post.emoji}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:6,flexWrap:"wrap"}}>
                    <span style={{fontSize:11,fontWeight:700,color:"#22C55E",textTransform:"uppercase",letterSpacing:"0.06em"}}>Post {i + 1}</span>
                    <span style={{fontSize:11,color:"#9CA3AF"}}>{post.date}</span>
                    <span style={{fontSize:11,color:"#9CA3AF"}}>{post.readTime}</span>
                  </div>
                  <h2 style={{fontSize:20,fontWeight:800,color:"#14532D",margin:"0 0 8px",letterSpacing:"-0.3px"}}>{post.title}</h2>
                  <p style={{fontSize:14,color:"#6B7280",margin:0,lineHeight:1.5}}>{post.subtitle}</p>
                </div>
                <div style={{fontSize:20,color:"#22C55E",flexShrink:0,alignSelf:"center"}}>→</div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{marginTop:48,padding:"28px",background:"linear-gradient(135deg,#F0FDF4 0%,#DCFCE7 100%)",borderRadius:16,border:"1px solid #BBF7D0",textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:10}}>🍽️</div>
          <div style={{fontSize:18,fontWeight:800,color:"#14532D",marginBottom:8}}>Want to try it for yourself?</div>
          <p style={{fontSize:14,color:"#4B5563",marginBottom:20,lineHeight:1.6}}>Seven Dinners is completely free to use. No sign-up needed to get started.</p>
          <Link href="/app" style={{display:"inline-block",padding:"12px 28px",background:"#22C55E",color:"white",borderRadius:100,fontSize:14,fontWeight:700,textDecoration:"none"}}>Plan my seven dinners →</Link>
        </div>
      </div>
    </div>
  );
}
