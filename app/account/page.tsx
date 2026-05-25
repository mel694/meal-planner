"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradAcc" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradAcc)"/>
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

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [savedPlans, setSavedPlans] = useState<any[]>([]);
  const [favourites, setFavourites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Ensure profile exists
      await supabase.from("profiles").upsert({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.fullName || "",
      }, { onConflict: "id" });

      // Load saved plans
      const { data: plans } = await supabase
        .from("meal_plans")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);
      setSavedPlans(plans || []);

      // Load favourites
      const { data: favs } = await supabase
        .from("favourites")
        .select("*")
        .eq("user_id", user.id)
        .order("saved_at", { ascending: false });
      setFavourites(favs || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  if (!isLoaded || loading) {
    return (
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#F9FAFB"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>🍽️</div>
          <div style={{color:"#22C55E",fontWeight:600}}>Loading your account...</div>
        </div>
      </div>
    );
  }

  const tabs = ["overview","meal plans","favourites","settings"];

  return (
    <div style={{minHeight:"100vh",background:"#F9FAFB",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <nav style={{background:"white",borderBottom:"1px solid #E5E7EB",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
          <Logo/>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:"#14532D",lineHeight:1}}>Seven</div>
            <div style={{fontSize:15,fontWeight:800,color:"#22C55E",lineHeight:1}}>Dinners</div>
          </div>
        </Link>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <Link href="/app" style={{padding:"7px 16px",background:"#22C55E",color:"white",borderRadius:100,fontSize:12,fontWeight:700,textDecoration:"none"}}>Plan my week →</Link>
          <button onClick={()=>signOut()} style={{padding:"7px 14px",border:"1px solid #E5E7EB",background:"white",color:"#6B7280",borderRadius:100,fontSize:12,cursor:"pointer",fontWeight:500}}>Sign out</button>
        </div>
      </nav>

      <div style={{background:"linear-gradient(135deg,#F0FDF4 0%,#DCFCE7 100%)",padding:"32px 24px 48px"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:16}}>
            {user?.imageUrl && (
              <img src={user.imageUrl} alt="" style={{width:56,height:56,borderRadius:"50%",border:"3px solid white",boxShadow:"0 4px 12px rgba(0,0,0,0.1)"}}/>
            )}
            <div>
              <h1 style={{fontSize:24,fontWeight:800,color:"#14532D",margin:0,letterSpacing:"-0.5px"}}>
                Welcome back{user?.firstName ? `, ${user.firstName}` : ""}! 👋
              </h1>
              <p style={{fontSize:14,color:"#4B5563",margin:"4px 0 0"}}>{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginTop:24}}>
            {[
              { icon:"📅", label:"Meal plans saved", value:savedPlans.length },
              { icon:"⭐", label:"Favourite recipes", value:favourites.length },
              { icon:"🥗", label:"Account type", value:"Free" },
            ].map((stat,i) => (
              <div key={i} style={{background:"white",borderRadius:14,padding:"16px",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:"1px solid #E5E7EB"}}>
                <div style={{fontSize:24,marginBottom:4}}>{stat.icon}</div>
                <div style={{fontSize:22,fontWeight:800,color:"#14532D"}}>{stat.value}</div>
                <div style={{fontSize:11,color:"#6B7280",marginTop:2}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:680,margin:"-20px auto 0",padding:"0 16px 48px",position:"relative",zIndex:1}}>

        <div style={{background:"white",borderRadius:16,padding:"4px",border:"1px solid #E5E7EB",display:"flex",gap:4,marginBottom:16,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
          {tabs.map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{flex:1,padding:"9px",borderRadius:12,border:"none",cursor:"pointer",fontSize:12,fontWeight:activeTab===tab?700:500,background:activeTab===tab?"#22C55E":"transparent",color:activeTab===tab?"white":"#6B7280",textTransform:"capitalize",transition:"all 0.15s"}}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab==="overview" && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{background:"white",borderRadius:16,padding:"20px",border:"1px solid #E5E7EB"}}>
              <div style={{fontSize:15,fontWeight:700,color:"#14532D",marginBottom:16}}>Quick actions</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[
                  { icon:"🍽️", label:"Plan this week's dinners", href:"/app", color:"#22C55E", bg:"#F0FDF4" },
                  { icon:"⭐", label:"View saved favourites", action:()=>setActiveTab("favourites"), color:"#F59E0B", bg:"#FEF3C7" },
                  { icon:"📅", label:"View meal plan history", action:()=>setActiveTab("meal plans"), color:"#3B82F6", bg:"#DBEAFE" },
                  { icon:"⚙️", label:"Account settings", action:()=>setActiveTab("settings"), color:"#8B5CF6", bg:"#F3E8FF" },
                ].map((item,i) => (
                  item.href ? (
                    <Link key={i} href={item.href} style={{display:"flex",alignItems:"center",gap:10,padding:"14px",background:item.bg,borderRadius:12,textDecoration:"none",border:`1px solid ${item.color}20`}}>
                      <span style={{fontSize:22}}>{item.icon}</span>
                      <span style={{fontSize:13,fontWeight:600,color:item.color,lineHeight:1.3}}>{item.label}</span>
                    </Link>
                  ) : (
                    <button key={i} onClick={item.action} style={{display:"flex",alignItems:"center",gap:10,padding:"14px",background:item.bg,borderRadius:12,border:`1px solid ${item.color}20`,cursor:"pointer",textAlign:"left"}}>
                      <span style={{fontSize:22}}>{item.icon}</span>
                      <span style={{fontSize:13,fontWeight:600,color:item.color,lineHeight:1.3}}>{item.label}</span>
                    </button>
                  )
                ))}
              </div>
            </div>

            <div style={{background:"linear-gradient(135deg,#F3E8FF 0%,#EDE9FE 100%)",borderRadius:16,padding:"20px",border:"1px solid #D8B4FE"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                <span style={{fontSize:28}}>⭐</span>
                <div>
                  <div style={{fontSize:15,fontWeight:700,color:"#6B21A8"}}>Upgrade to Premium</div>
                  <div style={{fontSize:12,color:"#9333EA"}}>£5.99/month · 30 day free trial</div>
                </div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
                {["Unlimited AI meal planning","Auto-generated shopping lists","Fitness & health goals","Priority support"].map(f=>(
                  <div key={f} style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:"#6B21A8"}}>
                    <span style={{color:"#22C55E",fontWeight:700}}>✓</span>{f}
                  </div>
                ))}
              </div>
              <button style={{width:"100%",padding:"12px",background:"#A855F7",color:"white",border:"none",borderRadius:10,fontSize:14,fontWeight:700,cursor:"pointer"}}>
                Start free trial — coming soon
              </button>
            </div>
          </div>
        )}

        {activeTab==="meal plans" && (
          <div style={{background:"white",borderRadius:16,padding:"20px",border:"1px solid #E5E7EB"}}>
            <div style={{fontSize:15,fontWeight:700,color:"#14532D",marginBottom:16}}>Your saved meal plans</div>
            {savedPlans.length === 0 ? (
              <div style={{textAlign:"center",padding:"40px 20px"}}>
                <div style={{fontSize:48,marginBottom:12}}>📅</div>
                <div style={{fontSize:15,fontWeight:600,color:"#14532D",marginBottom:8}}>No saved plans yet</div>
                <div style={{fontSize:13,color:"#6B7280",marginBottom:16}}>Generate your first meal plan and it will appear here</div>
                <Link href="/app" style={{display:"inline-block",padding:"12px 24px",background:"#22C55E",color:"white",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none"}}>Plan my week →</Link>
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {savedPlans.map((plan,i) => (
                  <div key={plan.id} style={{padding:"12px 14px",background:"#F9FAFB",borderRadius:10,border:"1px solid #E5E7EB",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:"#14532D"}}>Meal plan {savedPlans.length - i}</div>
                      <div style={{fontSize:11,color:"#6B7280",marginTop:2}}>{new Date(plan.created_at).toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
                    </div>
                    <span style={{fontSize:11,color:"#22C55E",fontWeight:600,padding:"3px 10px",background:"#F0FDF4",borderRadius:100,border:"1px solid #BBF7D0"}}>saved</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab==="favourites" && (
          <div style={{background:"white",borderRadius:16,padding:"20px",border:"1px solid #E5E7EB"}}>
            <div style={{fontSize:15,fontWeight:700,color:"#14532D",marginBottom:16}}>Your favourite recipes</div>
            {favourites.length === 0 ? (
              <div style={{textAlign:"center",padding:"40px 20px"}}>
                <div style={{fontSize:48,marginBottom:12}}>⭐</div>
                <div style={{fontSize:15,fontWeight:600,color:"#14532D",marginBottom:8}}>No favourites saved yet</div>
                <div style={{fontSize:13,color:"#6B7280",marginBottom:16}}>Star recipes you love and they'll appear here</div>
                <Link href="/app" style={{display:"inline-block",padding:"12px 24px",background:"#22C55E",color:"white",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none"}}>Generate a meal plan →</Link>
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {favourites.map(fav => (
                  <div key={fav.id} style={{padding:"12px 14px",background:"#FFFBEB",borderRadius:10,border:"1px solid #FEF3C7",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:"#92400E"}}>⭐ {fav.name}</div>
                      <div style={{fontSize:11,color:"#B45309",marginTop:2}}>Saved {new Date(fav.saved_at).toLocaleDateString("en-GB")}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab==="settings" && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{background:"white",borderRadius:16,padding:"20px",border:"1px solid #E5E7EB"}}>
              <div style={{fontSize:15,fontWeight:700,color:"#14532D",marginBottom:16}}>Account details</div>
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                <div style={{padding:"12px 14px",background:"#F9FAFB",borderRadius:10,border:"1px solid #E5E7EB"}}>
                  <div style={{fontSize:11,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4}}>Name</div>
                  <div style={{fontSize:14,fontWeight:600,color:"#14532D"}}>{user?.fullName || "Not set"}</div>
                </div>
                <div style={{padding:"12px 14px",background:"#F9FAFB",borderRadius:10,border:"1px solid #E5E7EB"}}>
                  <div style={{fontSize:11,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4}}>Email</div>
                  <div style={{fontSize:14,fontWeight:600,color:"#14532D"}}>{user?.emailAddresses[0]?.emailAddress}</div>
                </div>
                <div style={{padding:"12px 14px",background:"#F9FAFB",borderRadius:10,border:"1px solid #E5E7EB"}}>
                  <div style={{fontSize:11,color:"#6B7280",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4}}>Plan</div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{fontSize:14,fontWeight:600,color:"#14532D"}}>Free</div>
                    <span style={{fontSize:11,padding:"3px 10px",background:"#F0FDF4",color:"#22C55E",borderRadius:100,fontWeight:600,border:"1px solid #BBF7D0"}}>active</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{background:"white",borderRadius:16,padding:"20px",border:"1px solid #E5E7EB"}}>
              <div style={{fontSize:15,fontWeight:700,color:"#14532D",marginBottom:12}}>Danger zone</div>
              <button onClick={()=>signOut()} style={{width:"100%",padding:"12px",background:"white",color:"#DC2626",border:"2px solid #FECACA",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer"}}>
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
