"use client";
import Link from "next/link";

const Logo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradB2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradB2)"/>
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

export default function BlogPost2() {
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
            <span style={{fontSize:11,fontWeight:700,color:"#A855F7",textTransform:"uppercase",letterSpacing:"0.06em"}}>Post 2</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>May 2026</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>4 min read</span>
          </div>
          <h1 style={{fontSize:38,fontWeight:800,color:"#14532D",letterSpacing:"-1px",margin:"0 0 16px",lineHeight:1.1}}>How It Happened By Accident</h1>
          <p style={{fontSize:18,color:"#6B7280",lineHeight:1.6,margin:0,fontStyle:"italic"}}>From a cheeky Claude prompt to a real website, with zero coding experience and a lot of adventure.</p>
        </div>

        <div style={{width:"100%",height:4,background:"linear-gradient(90deg,#A855F7,#22C55E)",borderRadius:2,marginBottom:40}}/>

        <div style={{fontSize:16,color:"#374151",lineHeight:1.8}}>

          <p>I should say upfront that I am not a developer. I have never been a developer. In fact, about thirty years ago at university, I lasted precisely two weeks in the Computer Science module before rapidly and decisively opting out. It became very clear, very quickly, that this was not my natural territory. I am a Chartered Accountant. I work in business advisory. I love spreadsheets and strategy and a well-structured process. But actual code? Not my thing. Or so I thought.</p>

          <p>Fast forward to 2026, and I had been playing around with Claude, Anthropic's AI. I am a self-confessed tech geek in the sense that I love exploring new tools, especially ones that solve real problems. I had already used AI for all sorts of things in my work and personal life, and I was curious about how far I could push it.</p>

          <p>So one evening, half out of curiosity and half out of sheer desperation with the Sunday dinner planning problem I described in my last post, I prompted Claude to send me an email each week with a meal planner.</p>

          <p>And it worked.</p>

          <p>Every Sunday, I started getting an email with a full week of meals, shopping list included. I was absolutely delighted. I am not going to pretend it was perfect from the start, there was a lot of tweaking the prompts, a lot of "can you make the recipes faster" and "we don't eat pork" and "can you add the macros". But the core idea worked immediately, and I was hooked.</p>

          <p>I mentioned it to a couple of friends one day. Casually. "Oh I've been using this AI thing that plans all my meals for me." The response was immediate and enthusiastic. They all wanted it. Could I set it up for them too? Could it be a website so they could use it themselves? Could I add their dietary preferences?</p>

          <p>I thought: why not? It was a bit of a project, something to get my teeth into. I genuinely love learning new things, and if it helped a few more people eat better, even better.</p>

          <p>What followed was one of the most entertaining and occasionally maddening building experiences of my life. I used Claude to write every single line of code. I would describe what I wanted, Claude would write it, I would try to deploy it, something would break, I would paste the error back into Claude, and we would fix it together. This is apparently called "vibe coding" and I am fully here for it.</p>

          <p>The website grew feature by feature. A landing page. A planner. A shopping list. A fridge photo scanner (yes, you can photograph your fridge and it tells you what meals you can make from what is already in there). Five supermarkets to shop from. A favourites list. A cooking style picker. Macros per person. Calendar downloads. Every week I would think "wouldn't it be great if..." and then I would build it.</p>

          <p>I built it with no coding experience whatsoever. With a lot of patience, a lot of prompting, and a healthy tolerance for things going slightly wrong before going right. It is genuinely one of the most satisfying things I have ever made.</p>

          <p>It is still my little project. I want everyone to test it, enjoy it, and tell me what would make it better. That spirit has never changed, even as it has grown into something real.</p>

          <p>The next chapter was slightly less serene. Come back for post three if you want to hear about the Stripe saga.</p>

        </div>

        <div style={{marginTop:48,padding:"24px",background:"#FAF5FF",borderRadius:14,border:"1px solid #D8B4FE"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#6B21A8",marginBottom:6}}>Want to see what all the fuss is about?</div>
          <p style={{fontSize:13,color:"#4B5563",margin:"0 0 14px",lineHeight:1.5}}>Try the planner right now. No account needed, no card required. Just tell it what your family likes and let it do the rest.</p>
          <Link href="/app" style={{display:"inline-block",padding:"10px 22px",background:"#A855F7",color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none"}}>Plan my seven dinners →</Link>
        </div>

        <div style={{marginTop:32,display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:24,borderTop:"1px solid #E5E7EB"}}>
          <Link href="/blog/why-i-built-seven-dinners" style={{color:"#6B7280",fontSize:13,textDecoration:"none"}}>← Previous post</Link>
          <Link href="/blog/glitches-panics-and-stripe" style={{color:"#22C55E",fontSize:13,fontWeight:600,textDecoration:"none"}}>Next post →</Link>
        </div>

      </div>
    </div>
  );
}
