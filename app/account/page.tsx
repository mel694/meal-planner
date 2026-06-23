"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

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

type SavedPlan = { id: string; plan_text: string; created_at: string };
type Favourite = { id: string; name: string; content: string; savedAt: number };

export default function MyPlansPage() {
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [activeTab, setActiveTab] = useState("saved plans");
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [clearConfirmText, setClearConfirmText] = useState("");
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    try {
      const plans = JSON.parse(localStorage.getItem("sevendinners_saved_plans") || "[]");
      setSavedPlans(plans);
      const favs = JSON.parse(localStorage.getItem("sevendinners_favourites") || "[]");
      setFavourites(favs);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const deletePlan = (planId: string) => {
    const updated = savedPlans.filter(p => p.id !== planId);
    try {
      localStorage.setItem("sevendinners_saved_plans", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setSavedPlans(updated);
    setExpandedPlan(null);
  };

  const clearAllData = () => {
    if (clearConfirmText !== "CLEAR") return;
    localStorage.removeItem("sevendinners_saved_plans");
    localStorage.removeItem("sevendinners_favourites");
    localStorage.removeItem("sevendinners_scheduled");
    setSavedPlans([]);
    setFavourites([]);
    setShowClearConfirm(false);
    setClearConfirmText("");
    setCleared(true);
  };

  const tabs = ["saved plans", "favourites"];

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
        <Link href="/app" style={{padding:"7px 16px",background:"#22C55E",color:"white",borderRadius:100,fontSize:12,fontWeight:700,textDecoration:"none"}}>Plan my week →</Link>
      </nav>

      <div style={{background:"linear-gradient(135deg,#F0FDF4 0%,#DCFCE7 100%)",padding:"32px 24px 48px"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <h1 style={{fontSize:24,fontWeight:800,color:"#14532D",margin:"0 0 4px",letterSpacing:"-0.5px"}}>My Plans</h1>
          <p style={{fontSize:14,color:"#4B5563",margin:0}}>Your saved meal plans and favourite recipes — stored in this browser.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:20}}>
            {[
              { icon:"📅", label:"Saved plans", value: savedPlans.length },
              { icon:"⭐", label:"Favourite recipes", value: favourites.length },
            ].map((stat, i) => (
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

        {activeTab==="saved plans" && (
          <div style={{background:"white",borderRadius:16,padding:"20px",border:"1px solid #E5E7EB"}}>
            <div style={{fontSize:15,fontWeight:700,color:"#14532D",marginBottom:16}}>Your saved meal plans</div>
            {savedPlans.length === 0 ? (
              <div style={{textAlign:"center",padding:"40px 20px"}}>
                <div style={{fontSize:48,marginBottom:12}}>📅</div>
                <div style={{fontSize:15,fontWeight:600,color:"#14532D",marginBottom:8}}>No saved plans yet</div>
                <div style={{fontSize:13,color:"#6B7280",marginBottom:16}}>Generate a meal plan and tap "Save plan" to keep it here</div>
                <Link href="/app" style={{display:"inline-block",padding:"12px 24px",background:"#22C55E",color:"white",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none"}}>Plan my week →</Link>
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {savedPlans.map((plan, i) => (
                  <div key={plan.id} style={{borderRadius:10,border:"1px solid #E5E7EB",overflow:"hidden"}}>
                    <div
                      onClick={() => setExpandedPlan(expandedPlan === plan.id ? null : plan.id)}
                      style={{padding:"12px 14px",background:"#F9FAFB",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}
                    >
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:"#14532D"}}>Meal plan {savedPlans.length - i}</div>
                        <div style={{fontSize:11,color:"#6B7280",marginTop:2}}>{new Date(plan.created_at).toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontSize:11,color:"#22C55E",fontWeight:600,padding:"3px 10px",background:"#F0FDF4",borderRadius:100,border:"1px solid #BBF7D0"}}>saved</span>
                        <span style={{fontSize:16,color:"#6B7280"}}>{expandedPlan === plan.id ? "▲" : "▼"}</span>
                      </div>
                    </div>
                    {expandedPlan === plan.id && (
                      <div style={{padding:"16px",background:"white",borderTop:"1px solid #E5E7EB"}}>
                        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
                          {(plan.plan_text || "").split("##").filter((s: string) => !s.toUpperCase().includes("SHOPPING")).map((section: string, idx: number) => {
                            const lines = section.trim().split("\n").filter(Boolean);
                            const title = lines[0];
                            const body = lines.slice(1).join("\n");
                            if (!title) return null;
                            return (
                              <div key={idx} style={{background:"#F9FAFB",borderRadius:10,padding:"12px 14px",border:"1px solid #E5E7EB"}}>
                                <div style={{fontSize:13,fontWeight:700,color:"#14532D",marginBottom:6}}>🍽️ {title}</div>
                                <div style={{fontSize:12,color:"#4B5563",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{body}</div>
                              </div>
                            );
                          })}
                        </div>
                        <button
                          onClick={() => deletePlan(plan.id)}
                          style={{width:"100%",padding:"10px",background:"#FEF2F2",color:"#DC2626",border:"1px solid #FECACA",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}
                        >
                          🗑️ Delete this plan
                        </button>
                      </div>
                    )}
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
                <div style={{fontSize:13,color:"#6B7280",marginBottom:16}}>Tap the ⭐ on any meal to save it as a favourite</div>
                <Link href="/app" style={{display:"inline-block",padding:"12px 24px",background:"#22C55E",color:"white",borderRadius:10,fontSize:13,fontWeight:700,textDecoration:"none"}}>Generate a meal plan →</Link>
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {favourites.map(fav => (
                  <div key={fav.id} style={{padding:"12px 14px",background:"#FFFBEB",borderRadius:10,border:"1px solid #FEF3C7"}}>
                    <div style={{fontSize:13,fontWeight:600,color:"#92400E"}}>⭐ {fav.name}</div>
                    <div style={{fontSize:11,color:"#B45309",marginTop:2}}>Saved {new Date(fav.savedAt).toLocaleDateString("en-GB")}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{marginTop:24,background:"#FFF5F5",borderRadius:16,padding:"20px",border:"2px solid #FECACA"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#DC2626",marginBottom:4}}>Clear my data</div>
          <p style={{fontSize:13,color:"#6B7280",marginBottom:12,lineHeight:1.5}}>
            Removes all saved plans, favourite recipes, and scheduled meals from this browser. This cannot be undone.
          </p>
          {cleared ? (
            <div style={{textAlign:"center",padding:"16px",background:"#F0FDF4",borderRadius:10,border:"1px solid #BBF7D0"}}>
              <div style={{fontSize:15,fontWeight:600,color:"#14532D"}}>✅ All data cleared</div>
              <div style={{fontSize:12,color:"#4B5563",marginTop:4}}>Your browser storage has been wiped.</div>
            </div>
          ) : !showClearConfirm ? (
            <button onClick={()=>setShowClearConfirm(true)} style={{width:"100%",padding:"12px",background:"white",color:"#DC2626",border:"2px solid #FECACA",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer"}}>
              🗑️ Clear my data
            </button>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{padding:"12px 14px",background:"#FEF2F2",borderRadius:10,border:"1px solid #FECACA"}}>
                <div style={{fontSize:13,fontWeight:600,color:"#DC2626",marginBottom:8}}>Are you sure? Type CLEAR to confirm:</div>
                <input
                  type="text"
                  value={clearConfirmText}
                  onChange={e => setClearConfirmText(e.target.value)}
                  placeholder="Type CLEAR here"
                  style={{width:"100%",padding:"10px 12px",border:"2px solid #FECACA",borderRadius:8,fontSize:14,color:"#374151",outline:"none",boxSizing:"border-box"}}
                />
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                <button onClick={()=>{setShowClearConfirm(false);setClearConfirmText("");}} style={{padding:"11px",background:"white",color:"#6B7280",border:"1px solid #E5E7EB",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}>
                  Cancel
                </button>
                <button
                  onClick={clearAllData}
                  disabled={clearConfirmText !== "CLEAR"}
                  style={{padding:"11px",background:clearConfirmText==="CLEAR"?"#DC2626":"#FCA5A5",color:"white",border:"none",borderRadius:10,fontSize:13,fontWeight:700,cursor:clearConfirmText==="CLEAR"?"pointer":"not-allowed"}}
                >
                  Yes, clear everything
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
