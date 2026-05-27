"use client";
import Link from "next/link";

const Logo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradB5" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradB5)"/>
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

export default function BlogPost5() {
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
            <span style={{fontSize:11,fontWeight:700,color:"#EC4899",textTransform:"uppercase",letterSpacing:"0.06em"}}>Post 5</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>May 2026</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>4 min read</span>
          </div>
          <h1 style={{fontSize:38,fontWeight:800,color:"#14532D",letterSpacing:"-1px",margin:"0 0 16px",lineHeight:1.1}}>Spreading the Healthy Eating Bug</h1>
          <p style={{fontSize:18,color:"#6B7280",lineHeight:1.6,margin:0,fontStyle:"italic"}}>How our family transformed our health, and why I want to help yours do the same.</p>
        </div>

        <div style={{width:"100%",height:4,background:"linear-gradient(90deg,#EC4899,#22C55E)",borderRadius:2,marginBottom:40}}/>

        <div style={{fontSize:16,color:"#374151",lineHeight:1.8}}>

          <p>A few years ago, both my husband and I were carrying around seven or eight kilos more than we are now. We were sleeping badly. We were more stressed. We were drinking more than was good for us, eating convenient food rather than good food, and generally running on empty most of the time. We were not unhealthy in any dramatic sense, just not well. You probably know the feeling.</p>

          <p>What changed everything was not one big dramatic decision. It was a series of small ones that compounded over time. We started reading more about sleep and took it seriously for the first time. We cut alcohol almost entirely. We started strength training three times a week and made it a genuine priority rather than something we squeezed in when nothing else was on. And we started cooking from scratch and paying attention to what we were actually eating.</p>

          <p>The difference was enormous. Within a few months, the weight had shifted without us trying to lose it. The sleep improved. The stress levels dropped. We had more energy. We felt like different people, honestly. It sounds dramatic but it is just true.</p>

          <p>The food piece was crucial. Not dieting, never dieting, just choosing real ingredients over processed ones. Cooking actual meals instead of relying on packet sauces and ready-made shortcuts. It does not have to be complicated or expensive. Last night we had a chicken pasta bake that took less than half an hour from scratch. Chicken breast, passata, garlic, a handful of herbs, pasta. Nothing out of a jar. The whole family ate it and it was genuinely delicious.</p>

          <p>That is what I want more families in the UK to experience. Not the pressure of trying to be perfect, not the guilt of the occasional takeaway, just the knowledge that cooking real food at home is within reach every single week. And that it does not have to be a stressful Sunday evening exercise in creativity.</p>

          <p>Seven Dinners exists to make that possible. You tell it what your family likes, how long you want to cook for, what your budget is, and it does the rest. If you are trying to lose weight, choose the fat loss goal option. If you want more protein, pick high protein. If you have 20 minutes and need something fast, it handles that too. And if you are on a budget, set it to budget mode and I promise you will still eat well.</p>

          <p>The shopping list piece is something I cannot overstate. Being able to click straight through to Sainsbury's, Tesco, Ocado or whichever supermarket you use and add ingredients directly to your basket is genuinely transformative for how I spend my Sunday evenings. What used to be an hour of vague stress is now ten minutes of smooth, organised clicking. It is such a small thing and yet it makes such a difference to the week ahead.</p>

          <p>I am at the marketing stage now. I want to spread this as widely as I can. I want busy parents to use it. I want people who are trying to eat better to use it. I want people who feel overwhelmed by meal planning every week to use it and feel that weight lift.</p>

          <p>If you have read this far, you are my kind of person. Please try it. It is completely free, no sign-up required, and it takes about 30 seconds to get your first week of meals. If it helps you even a little, please share it with someone else who might find it useful. Word of mouth is everything for a little project like this one, and every share genuinely means the world.</p>

          <p>Here's to eating well, sleeping well, and feeling better. And to never again standing in the kitchen at 5.30pm with absolutely no idea what is for dinner.</p>

        </div>

        <div style={{marginTop:48,padding:"28px",background:"linear-gradient(135deg,#F0FDF4 0%,#DCFCE7 100%)",borderRadius:16,border:"1px solid #BBF7D0",textAlign:"center"}}>
          <div style={{fontSize:28,marginBottom:12}}>🥗</div>
          <div style={{fontSize:18,fontWeight:800,color:"#14532D",marginBottom:8}}>Ready to eat better this week?</div>
          <p style={{fontSize:14,color:"#4B5563",marginBottom:20,lineHeight:1.6,maxWidth:420,margin:"0 auto 20px"}}>Plan a full week of healthy, home-cooked meals in 30 seconds. No sign-up, no card, no faff.</p>
          <Link href="/app" style={{display:"inline-block",padding:"13px 30px",background:"#22C55E",color:"white",borderRadius:100,fontSize:15,fontWeight:700,textDecoration:"none",boxShadow:"0 4px 16px rgba(34,197,94,0.3)"}}>Plan my seven dinners →</Link>
          <p style={{fontSize:12,color:"#9CA3AF",marginTop:10}}>Then share it with someone who needs it just as much as you do.</p>
        </div>

        <div style={{marginTop:32,display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:24,borderTop:"1px solid #E5E7EB"}}>
          <Link href="/blog/going-to-market" style={{color:"#6B7280",fontSize:13,textDecoration:"none"}}>← Previous post</Link>
          <Link href="/blog" style={{color:"#22C55E",fontSize:13,fontWeight:600,textDecoration:"none"}}>All posts →</Link>
        </div>

      </div>
    </div>
  );
}
