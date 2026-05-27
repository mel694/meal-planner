"use client";
import Link from "next/link";

const Logo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradB4" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradB4)"/>
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

export default function BlogPost4() {
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
            <span style={{fontSize:11,fontWeight:700,color:"#3B82F6",textTransform:"uppercase",letterSpacing:"0.06em"}}>Post 4</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>May 2026</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>4 min read</span>
          </div>
          <h1 style={{fontSize:38,fontWeight:800,color:"#14532D",letterSpacing:"-1px",margin:"0 0 16px",lineHeight:1.1}}>Going to Market</h1>
          <p style={{fontSize:18,color:"#6B7280",lineHeight:1.6,margin:0,fontStyle:"italic"}}>Asking friends, gathering feedback, and building a tool that actually works for real families.</p>
        </div>

        <div style={{width:"100%",height:4,background:"linear-gradient(90deg,#3B82F6,#22C55E)",borderRadius:2,marginBottom:40}}/>

        <div style={{fontSize:16,color:"#374151",lineHeight:1.8}}>

          <p>There is a specific kind of vulnerability that comes with showing people something you made yourself. It is different from presenting a work project or sharing a professional opinion. When you have built something from scratch, in your own time, out of your own curiosity and enthusiasm, and then you ask someone "what do you think?", you are genuinely putting yourself out there.</p>

          <p>I did that with Seven Dinners. And it was the best decision I made.</p>

          <p>My first testers were friends and neighbours. The kind of people who will tell you if something doesn't work, who won't be polite just to spare your feelings, and who are also busy enough that if your tool genuinely saves them time, they will say so. I sent out the link, held my breath slightly, and waited.</p>

          <p>The feedback was brilliant. Not because everyone said it was perfect, it absolutely wasn't, but because people actually engaged with it. They told me when the shopping list format was confusing. They told me they wanted faster recipes. They told me they wanted to be able to pick a cooking style (slow cooker being the most requested, which I had not anticipated at all). They wanted to be able to save their favourite meals. They wanted macros. They wanted more supermarkets.</p>

          <p>Every single piece of feedback went straight into the build. This is one of the genuine joys of being a solo builder with no committees or sign-off processes. If someone says "can you add X", I can have it live by the next day. That speed of iteration is something bigger companies genuinely cannot replicate, and I love it.</p>

          <p>I also built a feedback form and added it directly to the site. If you use Seven Dinners and you want to tell me something, anything, you can submit it right there and it comes straight to my inbox. I read every single one. I am not saying this because it sounds nice. I genuinely mean it. This is a real person's project and every piece of feedback shapes what it becomes.</p>

          <p>The feedback form itself was another Claude build. I described what I wanted, it wrote the code, I deployed it. It emails me with the person's name, their message, and any suggestions they have included. Simple, direct, effective. No third-party survey tool needed.</p>

          <p>I have been genuinely moved by some of the responses. One friend told me she had been struggling with meal planning for years because of a combination of dietary requirements in her household, and that the dietary filter on Seven Dinners was the first tool that had ever actually handled it properly. Another said her kids were eating vegetables they had never tried before because the recipes introduced them in a way they actually liked.</p>

          <p>That is the whole point. It is not about the technology. It is about real families eating better, stressing less, and enjoying food again. The technology is just the means to get there.</p>

          <p>I am still at the early stages of this. The user base is small but growing. I am asking everyone I know to try it and share it. If you are reading this and you have not tried it yet, please do. And if you have tried it, please tell me what would make it better. I am all ears, always.</p>

          <p>The dream is for this to become something that thousands of families use every single week. We are not there yet. But we are heading in the right direction, one dinner at a time.</p>

        </div>

        <div style={{marginTop:48,padding:"24px",background:"#DBEAFE",borderRadius:14,border:"1px solid #93C5FD"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#1E40AF",marginBottom:6}}>Have feedback for me?</div>
          <p style={{fontSize:13,color:"#4B5563",margin:"0 0 14px",lineHeight:1.5}}>I genuinely want to hear what you think. Try the tool, and if you have ideas or suggestions, the feedback form is right there waiting for you.</p>
          <Link href="/app" style={{display:"inline-block",padding:"10px 22px",background:"#3B82F6",color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none"}}>Try Seven Dinners →</Link>
        </div>

        <div style={{marginTop:32,display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:24,borderTop:"1px solid #E5E7EB"}}>
          <Link href="/blog/glitches-panics-and-stripe" style={{color:"#6B7280",fontSize:13,textDecoration:"none"}}>← Previous post</Link>
          <Link href="/blog/spreading-the-healthy-eating-bug" style={{color:"#22C55E",fontSize:13,fontWeight:600,textDecoration:"none"}}>Next post →</Link>
        </div>

      </div>
    </div>
  );
}
