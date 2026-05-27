"use client";
import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const Logo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGrad)"/>
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

export default function Home() {
  const { user, isSignedIn } = useUser();
  const [cookieAccepted, setCookieAccepted] = React.useState(true);
  React.useEffect(() => {
    const accepted = localStorage.getItem("sd_cookie_consent");
    if (!accepted) setCookieAccepted(false);
  }, []);
  const acceptCookies = () => {
    localStorage.setItem("sd_cookie_consent", "true");
    setCookieAccepted(true);
  };

  const features = [
    { icon: "📅", color: "#22C55E", bg: "#DCFCE7", label: "AI Meal Planning" },
    { icon: "🛒", color: "#A855F7", bg: "#F3E8FF", label: "Smart Shopping Lists" },
    { icon: "📷", color: "#F59E0B", bg: "#FEF3C7", label: "Photo Upload" },
    { icon: "🥫", color: "#EF4444", bg: "#FEE2E2", label: "Pantry Tracking" },
    { icon: "🍴", color: "#06B6D4", bg: "#CFFAFE", label: "Allergy Filtering" },
    { icon: "🎯", color: "#3B82F6", bg: "#DBEAFE", label: "Fitness Goals" },
  ];

  const recipes = [
    { name: "Creamy Garlic Chicken", time: "30 mins", emoji: "🍗", bg: "#FEF3C7" },
    { name: "Veggie Stir Fry", time: "25 mins", emoji: "🥦", bg: "#DCFCE7" },
    { name: "Salmon & Avocado Bowl", time: "20 mins", emoji: "🐟", bg: "#DBEAFE" },
    { name: "One-Pot Pasta", time: "35 mins", emoji: "🍝", bg: "#FED7AA" },
    { name: "Turkey Meatballs", time: "30 mins", emoji: "🍖", bg: "#FECACA" },
  ];

  const plans = [
    {
      name: "FREE",
      tagline: "Get started with AI",
      price: "£0",
      period: "/month",
      subprice: "Forever free",
      icon: "🌱",
      iconBg: "#DCFCE7",
      iconColor: "#22C55E",
      features: [
        "AI generated recipes (limited)",
        "Basic shopping list (manual)",
        "Save up to 3 recipes",
        "Access to free recipes",
        "Community support",
      ],
      buttonText: "Get Started Free",
      buttonStyle: "outline",
      href: "/app",
    },
    {
      name: "PREMIUM",
      tagline: "Everything you need",
      price: "£5.99",
      period: "/month",
      subprice: "Billed monthly",
      icon: "👨‍🍳",
      iconBg: "#F3E8FF",
      iconColor: "#A855F7",
      badge: "MOST POPULAR",
      features: [
        "AI meal planning",
        "Family preferences",
        "Fitness goals",
        "Auto-generated shopping lists",
        "Photo upload for recipes",
        "Pantry tracking",
        "Allergy filtering",
        "Priority support",
      ],
      buttonText: "Sign Up Today",
      buttonStyle: "filled",
      href: "#signup",
    },
    {
      name: "PREMIUM PLUS",
      tagline: "AI nutrition coach",
      price: "£10.99",
      period: "/month",
      subprice: "Billed monthly",
      icon: "⭐",
      iconBg: "#DCFCE7",
      iconColor: "#22C55E",
      badge: "BEST VALUE",
      features: [
        "Everything in Premium",
        "AI nutrition coach chatbot",
        "Ask unlimited nutrition questions",
        "Personalised advice & tips",
        "Advanced goal tracking",
        "Priority support",
      ],
      buttonText: "Sign Up Today",
      buttonStyle: "outline-green",
      href: "#signup",
    },
  ];

  const supermarkets = [
    { name: "Tesco", color: "#005EB8" },
    { name: "Sainsbury's", color: "#F06C00" },
    { name: "ASDA", color: "#78BE20" },
    { name: "Ocado", color: "#722F8F" },
    { name: "Morrisons", color: "#FFD200" },
  ];

  return (
    <div style={{minHeight:"100vh",background:"white",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",color:"#1F2937"}}>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .heart-doodle{display:inline-block;color:#A855F7;font-size:0.8em;margin-left:6px;vertical-align:middle}
        *{box-sizing:border-box}
        @media(max-width:768px){
          .nav-links{display:none!important}
          .hero-grid{grid-template-columns:1fr!important}
          .hero-image{display:none!important}
          .hero-text h1{font-size:36px!important}
          .plans-grid{grid-template-columns:1fr!important}
          .features-grid{grid-template-columns:1fr 1fr!important}
          .recipes-grid{grid-template-columns:1fr 1fr!important}
          .testimonial-grid{grid-template-columns:1fr!important}
          .trust-grid{grid-template-columns:1fr 1fr!important}
          .supermarkets-row{gap:20px!important}
          .closing-row{flex-direction:column!important;gap:16px!important;text-align:center!important}
          .nav-pad{padding:14px 16px!important}
          .nav-text{display:inline}
          .nav-icon-only{display:none}
          @media(max-width:640px){
            .nav-text{display:none!important}
            .nav-icon-only{display:inline!important}
            .nav-right{gap:6px!important}
            .nav-right a,.nav-right button{padding:7px 10px!important;font-size:11px!important}
          }
          .hero-pad{padding:32px 16px 48px!important}
          .section-pad{padding:40px 16px!important}
        }
      `}</style>

      <nav style={{padding:"18px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid #F3F4F6",position:"sticky",top:0,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(8px)",zIndex:50}} className="nav-pad">
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Logo size={42}/>
          <div>
            <div style={{fontSize:18,fontWeight:800,color:"#14532D",lineHeight:1,letterSpacing:"-0.3px"}}>Seven</div>
            <div style={{fontSize:18,fontWeight:800,color:"#22C55E",lineHeight:1,letterSpacing:"-0.3px"}}>Dinners</div>
          </div>
        </div>
        <div style={{display:"flex",gap:32,alignItems:"center"}} className="nav-links">
          {["How It Works","Recipes","Plans"].map(item=>(
            <a key={item} href={`#${item.toLowerCase().replace(/ /g,"-")}`} style={{color:"#374151",fontSize:14,fontWeight:500,textDecoration:"none"}}>{item}</a>
          ))}

        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}} className="nav-right">
          <Link href="/blog" style={{color:"#374151",fontSize:13,fontWeight:500,textDecoration:"none",padding:"7px 12px",borderRadius:100,border:"1px solid #E5E7EB"}}>Blog</Link>
          <Link href="/feedback" style={{color:"#374151",fontSize:13,fontWeight:500,textDecoration:"none",padding:"7px 12px",borderRadius:100,border:"1px solid #E5E7EB"}}>💬 Feedback</Link>
          {isSignedIn ? (
            <Link href="/account" style={{display:"flex",alignItems:"center",gap:6,padding:"7px 14px",border:"none",background:"#22C55E",color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none"}}>
              {user?.imageUrl && <img src={user.imageUrl} alt="" style={{width:20,height:20,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.5)"}}/>}
              <span>Account</span>
            </Link>
          ) : (
            <>
              <Link href="/sign-in" style={{padding:"7px 14px",border:"2px solid #22C55E",background:"white",color:"#22C55E",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none",display:"inline-block"}}>Log in</Link>
              <Link href="/sign-up" style={{padding:"7px 14px",border:"none",background:"#22C55E",color:"white",borderRadius:100,fontSize:13,fontWeight:700,textDecoration:"none",display:"inline-block"}}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <section style={{padding:"60px 32px 80px",maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center",position:"relative"}} className="hero-grid hero-pad">
        <div className="hero-text">
          <h1 style={{fontSize:56,fontWeight:800,color:"#14532D",lineHeight:1.05,letterSpacing:"-1.5px",margin:0}}>
            Healthy eating<br/>
            <span style={{color:"#22C55E"}}>made simple</span>
            <span className="heart-doodle">♡</span>
          </h1>
          <p style={{fontSize:17,color:"#4B5563",lineHeight:1.6,margin:"20px 0 28px",maxWidth:480}}>
            AI meal planning, smart shopping lists and delicious recipes — all in one place.
          </p>
          <Link href="/app" style={{display:"inline-block",padding:"16px 36px",background:"#22C55E",color:"white",borderRadius:12,fontSize:16,fontWeight:700,textDecoration:"none",boxShadow:"0 8px 20px rgba(34,197,94,0.3)"}}>
            Start Your Free Plan
          </Link>
          <div style={{marginTop:14,fontSize:13,color:"#6B7280",display:"flex",alignItems:"center",gap:6}}>
            <span style={{color:"#22C55E",fontSize:16}}>✓</span>
            No card required · Cancel anytime
          </div>
        </div>

        <div className="hero-image" style={{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",minHeight:420}}>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 60% 50%, #DCFCE7 0%, transparent 60%)"}}/>
          <div style={{position:"relative",width:380,height:380,borderRadius:"50%",background:"linear-gradient(135deg,#F0FDF4 0%,#DCFCE7 100%)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",boxShadow:"0 20px 60px rgba(34,197,94,0.15)"}}>
            <div style={{fontSize:140,animation:"float 4s ease-in-out infinite"}}>🥗</div>
          </div>

          <div style={{position:"absolute",top:30,right:50,color:"#A855F7",fontSize:24}}>✨</div>
          <div style={{position:"absolute",bottom:60,right:30,color:"#A855F7",fontSize:32}}>♡</div>
        </div>
      </section>

      <section style={{padding:"40px 32px 80px",maxWidth:1100,margin:"0 auto"}} id="plans">
        <h2 style={{textAlign:"center",fontSize:32,fontWeight:800,color:"#14532D",marginBottom:6,letterSpacing:"-0.5px"}}>
          Choose the plan that's right for you<span className="heart-doodle">♡</span>
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:20,marginTop:40}} className="plans-grid">
          {plans.map((plan,i)=>(
            <div key={i} style={{background:"white",borderRadius:20,border:plan.badge==="MOST POPULAR"?"2px solid #A855F7":plan.badge==="BEST VALUE"?"2px solid #22C55E":"1px solid #E5E7EB",padding:"28px 24px",position:"relative",boxShadow:plan.badge?"0 8px 24px rgba(0,0,0,0.08)":"none"}}>
              {plan.badge && (
                <div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:plan.badge==="MOST POPULAR"?"#A855F7":"#22C55E",color:"white",fontSize:11,fontWeight:800,padding:"5px 14px",borderRadius:100,letterSpacing:"0.05em"}}>{plan.badge}</div>
              )}
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                <div style={{width:48,height:48,borderRadius:"50%",background:plan.iconBg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{plan.icon}</div>
                <div>
                  <div style={{fontSize:14,fontWeight:800,color:plan.iconColor,letterSpacing:"0.05em"}}>{plan.name}</div>
                  <div style={{fontSize:13,color:"#6B7280"}}>{plan.tagline}</div>
                </div>
              </div>
              <div style={{marginBottom:20}}>
                <span style={{fontSize:36,fontWeight:800,color:"#14532D"}}>{plan.price}</span>
                <span style={{fontSize:14,color:"#6B7280",marginLeft:4}}>{plan.period}</span>
                <div style={{fontSize:12,color:"#6B7280",marginTop:2}}>{plan.subprice}</div>
              </div>
              <ul style={{listStyle:"none",padding:0,margin:"0 0 24px"}}>
                {plan.features.map((f,j)=>(
                  <li key={j} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:10,fontSize:13,color:"#374151"}}>
                    <span style={{color:"#22C55E",fontWeight:700,flexShrink:0,marginTop:1}}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {plan.buttonStyle==="filled" ? (
                <Link href="/sign-up" style={{display:"block",textAlign:"center",padding:"13px",background:"#A855F7",color:"white",borderRadius:10,fontSize:14,fontWeight:700,textDecoration:"none"}}>{plan.buttonText}</Link>
              ) : plan.buttonStyle==="outline-green" ? (
                <Link href="/sign-up" style={{display:"block",textAlign:"center",padding:"13px",background:"white",color:"#22C55E",border:"2px solid #22C55E",borderRadius:10,fontSize:14,fontWeight:700,textDecoration:"none"}}>{plan.buttonText}</Link>
              ) : (
                <Link href="/app" style={{display:"block",textAlign:"center",padding:"13px",background:"white",color:"#22C55E",border:"2px solid #22C55E",borderRadius:10,fontSize:14,fontWeight:700,textDecoration:"none"}}>{plan.buttonText}</Link>
              )}
            </div>
          ))}
        </div>

        <div style={{marginTop:32,padding:"20px 24px",background:"#F9FAFB",borderRadius:16,display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:16}} className="trust-grid">
          {[
            { icon:"🔒", title:"Billed monthly", desc:"No card required" },
            { icon:"🔄", title:"Cancel anytime", desc:"No commitments" },
            { icon:"🛡️", title:"Your data is safe", desc:"Secure & private" },
            { icon:"🆕", title:"Brand new", desc:"Be an early member" },
          ].map((item,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{fontSize:22}}>{item.icon}</div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#14532D"}}>{item.title}</div>
                <div style={{fontSize:12,color:"#6B7280"}}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:"60px 32px",background:"#F9FAFB",position:"relative",overflow:"hidden"}} id="how-it-works">
        <div style={{position:"absolute",top:0,left:0,fontSize:80,opacity:0.1}}>🍅🥦🌶️</div>
        <div style={{position:"absolute",top:0,right:0,fontSize:80,opacity:0.1}}>🧄🌿</div>
        <h2 style={{textAlign:"center",fontSize:32,fontWeight:800,color:"#14532D",marginBottom:40,letterSpacing:"-0.5px"}}>
          Smart tools to<br/>simplify every meal<span className="heart-doodle">♡</span>
        </h2>
        <div style={{maxWidth:900,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:24}} className="features-grid">
          {features.map((f,i)=>(
            <div key={i} style={{textAlign:"center"}}>
              <div style={{width:80,height:80,borderRadius:"50%",background:f.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 12px"}}>{f.icon}</div>
              <div style={{fontSize:13,fontWeight:700,color:"#14532D"}}>{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:"60px 32px",maxWidth:1280,margin:"0 auto"}} id="recipes">
        <h2 style={{textAlign:"center",fontSize:32,fontWeight:800,color:"#14532D",marginBottom:6,letterSpacing:"-0.5px"}}>Delicious recipes you'll love</h2>
        <p style={{textAlign:"center",fontSize:15,color:"#6B7280",marginBottom:40}}>Hundreds of wholesome, family-friendly recipes.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:16,maxWidth:1100,margin:"0 auto"}} className="recipes-grid">
          {recipes.map((r,i)=>(
            <div key={i} style={{background:"white",borderRadius:16,overflow:"hidden",border:"1px solid #F3F4F6",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
              <div style={{height:120,background:r.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:48}}>{r.emoji}</div>
              <div style={{padding:"12px 14px"}}>
                <div style={{fontSize:13,fontWeight:700,color:"#14532D",marginBottom:4}}>{r.name}</div>
                <div style={{fontSize:11,color:"#6B7280"}}>{r.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:24}}>
          <Link href="/app" style={{color:"#22C55E",fontSize:14,fontWeight:700,textDecoration:"none"}}>Explore all recipes →</Link>
        </div>
      </section>

      <section style={{padding:"60px 32px",background:"#FAF5FF",maxWidth:1280,margin:"0 auto",borderRadius:24}}>
        <div style={{textAlign:"center",maxWidth:600,margin:"0 auto"}}>
          <div style={{fontSize:56,marginBottom:16}}>👨‍👩‍👧</div>
          <h2 style={{fontSize:30,fontWeight:800,color:"#14532D",lineHeight:1.2,marginBottom:16,letterSpacing:"-0.5px"}}>
            Be one of our first members<span className="heart-doodle">♡</span>
          </h2>
          <p style={{fontSize:16,color:"#4B5563",lineHeight:1.7,marginBottom:28}}>
            Seven Dinners is brand new and we&apos;re looking for families who want to eat better, waste less and spend less time stressing about dinner. Try it completely free — no card required.
          </p>
          <a href="/app" style={{display:"inline-block",padding:"14px 32px",background:"#22C55E",color:"white",borderRadius:100,fontSize:15,fontWeight:700,textDecoration:"none",boxShadow:"0 4px 16px rgba(34,197,94,0.3)"}}>
            Start planning for free →
          </a>
          <p style={{fontSize:13,color:"#9CA3AF",marginTop:12}}>Takes 30 seconds · No sign up needed to try</p>
        </div>
      </section>

      <section style={{padding:"40px 32px",borderTop:"1px solid #F3F4F6",borderBottom:"1px solid #F3F4F6"}}>
        <div style={{textAlign:"center",fontSize:15,fontWeight:600,color:"#6B7280",marginBottom:24}}>We integrate with your favourite supermarkets</div>
        <div style={{display:"flex",justifyContent:"center",gap:40,flexWrap:"wrap",alignItems:"center"}} className="supermarkets-row">
          {supermarkets.map(s=>(
            <div key={s.name} style={{fontSize:18,fontWeight:800,color:s.color,letterSpacing:"-0.3px"}}>{s.name}</div>
          ))}
        </div>
      </section>

      <section style={{padding:"60px 32px",maxWidth:1280,margin:"0 auto",position:"relative",overflow:"hidden"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:40,padding:"40px",background:"linear-gradient(135deg,#F0FDF4 0%,#DCFCE7 100%)",borderRadius:24}} className="closing-row">
          <div style={{fontSize:80}}>🥑</div>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:22,fontWeight:700,color:"#14532D",lineHeight:1.4}}>
              Good for you.<br/>
              Good for your family.<br/>
              <span style={{color:"#22C55E"}}>Good for the planet.</span>
            </div>
          </div>
          <div style={{fontSize:80}}>🥦</div>
        </div>
      </section>

      <footer style={{padding:"40px 32px",background:"#14532D",color:"white",textAlign:"center"}}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:10,marginBottom:12}}>
          <Logo size={32}/>
          <div style={{fontSize:18,fontWeight:800}}>Seven Dinners</div>
        </div>
        <div style={{fontSize:13,opacity:0.8}}>Healthy eating made simple · real food · no UPF · cooked from scratch</div>
        <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:16,flexWrap:"wrap"}}>
          <Link href="/privacy-policy" style={{color:"#86EFAC",fontSize:12,textDecoration:"none"}}>Privacy Policy</Link>
          <Link href="/cookie-policy" style={{color:"#86EFAC",fontSize:12,textDecoration:"none"}}>Cookie Policy</Link>
          <Link href="/terms" style={{color:"#86EFAC",fontSize:12,textDecoration:"none"}}>Terms & Conditions</Link>
          <a href="mailto:hello@sevendinners.co.uk" style={{color:"#86EFAC",fontSize:12,textDecoration:"none"}}>hello@sevendinners.co.uk</a>
        </div>
        <div style={{fontSize:12,opacity:0.6,marginTop:12}}>© 2026 Seven Dinners · All rights reserved · We may earn commission from supermarket links</div>
      </footer>

      {!cookieAccepted && (
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"white",borderTop:"2px solid #E5E7EB",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap",zIndex:1000,boxShadow:"0 -4px 20px rgba(0,0,0,0.08)"}}>
          <div style={{flex:1,minWidth:240}}>
            <div style={{fontSize:13,fontWeight:700,color:"#14532D",marginBottom:4}}>🍪 We use cookies</div>
            <div style={{fontSize:12,color:"#6B7280",lineHeight:1.5}}>We use cookies to keep you signed in and to understand how you use Seven Dinners so we can improve it. See our <Link href="/cookie-policy" style={{color:"#22C55E"}}>Cookie Policy</Link> and <Link href="/privacy-policy" style={{color:"#22C55E"}}>Privacy Policy</Link>.</div>
          </div>
          <div style={{display:"flex",gap:8,flexShrink:0}}>
            <button onClick={acceptCookies} style={{padding:"9px 20px",background:"#22C55E",color:"white",border:"none",borderRadius:100,fontSize:13,fontWeight:700,cursor:"pointer"}}>Accept all</button>
            <button onClick={acceptCookies} style={{padding:"9px 20px",background:"white",color:"#6B7280",border:"1px solid #E5E7EB",borderRadius:100,fontSize:13,fontWeight:500,cursor:"pointer"}}>Necessary only</button>
          </div>
        </div>
      )}
    </div>
  );
}
