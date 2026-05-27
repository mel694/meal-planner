"use client";
import Link from "next/link";

const Logo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradB1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradB1)"/>
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

export default function BlogPost1() {
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
            <span style={{fontSize:11,fontWeight:700,color:"#22C55E",textTransform:"uppercase",letterSpacing:"0.06em"}}>Post 1</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>May 2026</span>
            <span style={{fontSize:11,color:"#9CA3AF"}}>4 min read</span>
          </div>
          <h1 style={{fontSize:38,fontWeight:800,color:"#14532D",letterSpacing:"-1px",margin:"0 0 16px",lineHeight:1.1}}>Why I Built Seven Dinners</h1>
          <p style={{fontSize:18,color:"#6B7280",lineHeight:1.6,margin:0,fontStyle:"italic"}}>A busy mum, a hungry household, and one too many Sunday evenings staring at an empty meal plan.</p>
        </div>

        <div style={{width:"100%",height:4,background:"linear-gradient(90deg,#22C55E,#A855F7)",borderRadius:2,marginBottom:40}}/>

        <div style={{fontSize:16,color:"#374151",lineHeight:1.8}}>

          <p>If you have ever stood in the kitchen at 5.30pm, absolutely shattered, staring into the fridge as though inspiration might just materialise out of nowhere, then this post is for you. Because that was me. Every single day.</p>

          <p>My household is a busy one. Two kids, a husband, a career, a fitness routine I genuinely care about, and roughly seventeen things on the go at any one time. Sound familiar? The one thing I never seemed to get on top of was dinner. Not making it, I love cooking. It was the thinking about it that was killing me.</p>

          <p>Every Sunday, I would sit down to do the weekly Sainsbury's order and feel this creeping dread. What are we eating this week? My mind would go completely blank. I would scroll back through my memory, realise we had the same pasta bake three weeks running, and just... give up and order the same pasta bake again. Because at least it was safe, I knew we had the ingredients, and nobody would complain.</p>

          <p>The other thing driving me absolutely mad was the fridge situation. My family, bless them, are fridge grazers. They open the door, peer in, close it again, and immediately ask "what can I eat?" as if I have been standing there invisibly cataloguing the contents at all times. They could be looking directly at a full shelf of ingredients for a beautiful meal and still not see a single option. (If this happens in your house too, you are not alone and I am very sorry.)</p>

          <p>The healthy eating piece matters to me a lot. A few years ago, our family made a real shift. We cut out a lot of ultra-processed food, started cooking from scratch, got serious about sleep and exercise, and genuinely felt the difference. But eating well consistently takes planning. And planning takes time and mental energy that, by Sunday evening, I simply did not have.</p>

          <p>I wanted something that would just tell me what to cook. Not a recipe blog that sends me fifteen ingredients I have never heard of. Not a meal kit that costs a fortune and leaves me with half a bunch of coriander I have no use for. I wanted a tool that understood my family, knew we like chicken and salmon, knew my kids don't eat blue cheese (fair enough), knew I wanted something on the table in under 45 minutes on a Tuesday, and could produce a proper shopping list at the end of it.</p>

          <p>I also wanted to stop buying random things at the supermarket and then discovering I had everything needed for a really good meal already in the cupboard. The amount of food waste in our house was genuinely embarrassing. Not through laziness, just through lack of organisation.</p>

          <p>So that is where Seven Dinners came from. Not from a grand entrepreneurial vision. Not from market research or a business plan. It came from a tired mum standing in a kitchen on a Sunday, thinking there had to be a better way.</p>

          <p>Turns out there was. And the best bit? I built it myself, completely by accident. But that is a story for the next post.</p>

        </div>

        <div style={{marginTop:48,padding:"24px",background:"#F0FDF4",borderRadius:14,border:"1px solid #BBF7D0"}}>
          <div style={{fontSize:14,fontWeight:700,color:"#14532D",marginBottom:6}}>Ready to stop staring at the fridge?</div>
          <p style={{fontSize:13,color:"#4B5563",margin:"0 0 14px",lineHeight:1.5}}>Seven Dinners gives you a full week of healthy recipes and a ready-made shopping list in about 30 seconds. No sign-up needed.</p>
          <Link href="/app" style={{display:"inline-block",padding:"10px 22px",background:"#22C55E",color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none"}}>Plan my seven dinners →</Link>
        </div>

        <div style={{marginTop:32,display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:24,borderTop:"1px solid #E5E7EB"}}>
          <Link href="/blog" style={{color:"#6B7280",fontSize:13,textDecoration:"none"}}>← Back to blog</Link>
          <Link href="/blog/how-it-happened-by-accident" style={{color:"#22C55E",fontSize:13,fontWeight:600,textDecoration:"none"}}>Next post →</Link>
        </div>

      </div>
    </div>
  );
}
