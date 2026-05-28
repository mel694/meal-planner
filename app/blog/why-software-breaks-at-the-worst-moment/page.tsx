"use client";
import Link from "next/link";

const Logo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradB7" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradB7)"/>
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

export default function BlogPost7() {
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
            <span style={{fontSize:11,fontWeight:700,color:"#8B5CF6",textTransform:"uppercase",letterSpacing:"0.06em"}}>Post 7</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>May 2026</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>4 min read</span>
          </div>
          <h1 style={{fontSize:38,fontWeight:800,color:"#14532D",letterSpacing:"-1px",margin:"0 0 16px",lineHeight:1.1}}>Why Software Breaks at the Worst Moment</h1>
          <p style={{fontSize:18,color:"#6B7280",lineHeight:1.6,margin:0,fontStyle:"italic"}}>Everything worked perfectly last night. This morning, nothing. A lesson in why you have to test constantly.</p>
        </div>

        <div style={{width:"100%",height:4,background:"linear-gradient(90deg,#8B5CF6,#22C55E)",borderRadius:2,marginBottom:40}}/>

        <div style={{fontSize:16,color:"#374151",lineHeight:1.8}}>

          <p>I went to bed one evening feeling very pleased with myself. Seven Dinners was looking great. The pricing plans were on the page, the buttons were working, the whole thing felt polished and ready. I had tested everything. I had clicked every button. All good.</p>

          <p>I woke up the next morning, made a cup of tea, opened the site on my phone, and clicked the Premium sign up button.</p>

          <p>Nothing happened.</p>

          <p>I clicked it again. Nothing. I tried the Premium Plus button. Also nothing. I tried on my laptop. Still nothing. The buttons were there, they looked exactly as they should, but clicking them produced absolutely no response whatsoever. It was as if they had decided, sometime overnight, to simply stop working.</p>

          <p>This is one of the more baffling experiences of building software without a traditional coding background. Things break for reasons that are not immediately obvious. You did not change the buttons. You did not touch that part of the code. You made a change somewhere else entirely, something that seemed completely unrelated, and somehow it broke something three pages away that you were not even thinking about.</p>

          <p>I have since learned that this is entirely normal. Developers have a phrase for it: regression. You fix one thing and break another. It happens to professional engineers working on the largest software products in the world. It certainly happens to a Chartered Accountant building a meal planner in her spare time with the help of an AI.</p>

          <p>The Stripe buttons had stopped working because of a code change I had made to the navigation the previous evening. I had been tidying up the mobile nav, removing some duplicate text, and somewhere in the process I had inadvertently altered the structure of the component in a way that broke the checkout flow. The two things were not obviously connected. But in code, everything is connected in ways you cannot always see.</p>

          <p>The fix took about twenty minutes once I understood what had happened. But those twenty minutes came after an hour of confusion, testing different things, and gradually narrowing down what had changed between last night when it worked and this morning when it didn't.</p>

          <p>What this experience taught me, and what I now do religiously, is to test the whole site every single time I make a change. Not just the thing I changed. Everything. The homepage buttons, the sign up flow, the meal plan generation, the shopping list, the account page. A quick run through the whole user journey every time I push an update.</p>

          <p>It takes about five minutes. It has saved me from embarrassing broken experiences for real users more times than I would like to admit.</p>

          <p>The other thing it taught me is to make smaller changes. When I first started building Seven Dinners, I would sometimes make ten different changes in one session and push them all at once. When something broke, I had no idea which of the ten changes had caused it. Now I make one change at a time, test it, push it, and only then move on to the next thing. Slower, but so much less stressful.</p>

          <p>Building software is a lesson in humility. You think you understand what you have built. Then it breaks in a way you did not anticipate, for a reason you did not foresee, at a moment you did not expect. And then you fix it, and you understand it a little better than you did before.</p>

          <p>I genuinely love it. Even the breaking bits. Especially the breaking bits, actually, because those are the moments where you learn the most.</p>

          <p>Just maybe not first thing in the morning before the tea has kicked in.</p>

        </div>

        <div style={{marginTop:48,padding:"24px",background:"#F5F3FF",borderRadius:14,border:"1px solid #DDD6FE"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#6D28D9",marginBottom:6}}>The buttons work now, promise.</div>
          <p style={{fontSize:13,color:"#4B5563",margin:"0 0 14px",lineHeight:1.5}}>Thoroughly tested, this morning and every morning. Give Seven Dinners a try and let me know if anything breaks — I genuinely want to know!</p>
          <Link href="/app" style={{display:"inline-block",padding:"10px 22px",background:"#22C55E",color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none"}}>Try it free →</Link>
        </div>

        <div style={{marginTop:32,display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:24,borderTop:"1px solid #E5E7EB"}}>
          <Link href="/blog/the-moment-i-realised-ai-is-not-free" style={{color:"#6B7280",fontSize:13,textDecoration:"none"}}>← Previous post</Link>
          <Link href="/blog" style={{color:"#22C55E",fontSize:13,fontWeight:600,textDecoration:"none"}}>All posts →</Link>
        </div>

      </div>
    </div>
  );
}
