"use client";
import { useState } from "react";

const DIETARY_OPTIONS = ["Vegetarian","Vegan","Gluten-free","Dairy-free","Nut-free","No pork","No shellfish"];
const TIME_OPTIONS = ["20 mins","30 mins","45 mins","1 hour","No limit"];
const BUDGET_OPTIONS = ["Budget","Medium","Premium"];

const DAY_STYLES = {
  Monday:    { bg:"#FF6B35", emoji:"🍗" },
  Tuesday:   { bg:"#FFB347", emoji:"🐟" },
  Wednesday: { bg:"#4CAF7D", emoji:"🥩" },
  Thursday:  { bg:"#8B5CF6", emoji:"🌶️" },
  Friday:    { bg:"#FF6B35", emoji:"🌮", special: true },
  Saturday:  { bg:"#EC4899", emoji:"🥗" },
  Sunday:    { bg:"#F59E0B", emoji:"🍖" },
};

const SHORT_DAYS = {
  Monday:"MON", Tuesday:"TUE", Wednesday:"WED", Thursday:"THU",
  Friday:"FRI", Saturday:"SAT", Sunday:"SUN"
};

export default function SevenDinners() {
  const [step, setStep] = useState("prefs");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [mealPlan, setMealPlan] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState({});
  const [prefs, setPrefs] = useState({
    adults: 2, children: 2,
    likes: "chicken, salmon, beef, pasta, roasted vegetables",
    dislikes: "pork, blue cheese, very spicy food",
    dietary: []as string[], cookingTime: "45 mins", budget: "Medium",
  });

  const toggleDietary = (opt: string) =>
    setPrefs((p) => ({
      ...p,
      dietary: p.dietary.includes(opt)
        ? p.dietary.filter((x) => x !== opt)
        : [...p.dietary, opt],
    }));

  const generatePlan = async () => {
    setLoading(true); setError(""); setMealPlan(""); setChecked({});
    const msgs = [
      "Finding the perfect recipes for your family...",
      "Matching meals to your tastes...",
      "Building your seven dinners...",
      "Compiling your shopping list...",
    ];
    let i = 0; setLoadingMsg(msgs[0]);
    const interval = setInterval(() => { i=(i+1)%msgs.length; setLoadingMsg(msgs[i]); }, 3000);
    try {
      const res = await fetch("/api/mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMealPlan(data.mealPlan);
      setStep("plan");
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setStep("prefs");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const formatPlan = (text) => {
    const lines = text.split("\n");
    const result = [];
    let olBuffer = [];
    let inShoppingList = false;
    let currentCategory = null;
    let categoryItems = [];
    let categories = {};

    const flushOl = (key: string | number) => {
      if (olBuffer.length > 0) {
        result.push(
          <ol key={`ol-${key}`} style={{padding:"0 0 0 20px",margin:"4px 0 8px"}}>
            {olBuffer}
          </ol>
        );
        olBuffer = [];
      }
    };

    const flushCategory = () => {
      if (currentCategory && categoryItems.length > 0) {
        categories[currentCategory] = [...categoryItems];
      }
      categoryItems = [];
    };

    lines.forEach((line, i) => {
      if (line.includes("SHOPPING LIST") || line.includes("Shopping List") || line.includes("Shopping list")) {
        flushOl(i);
        inShoppingList = true;
        return;
      }

      if (inShoppingList) {
        if (line.startsWith("**") && line.endsWith("**")) {
          flushCategory();
          currentCategory = line.replace(/\*\*/g, "");
        } else if (line.match(/^- .+\| Sainsburys:.+\| Ocado:.+/)) {
          const parts = line.replace("- ", "").split(" | ");
          const sainsburysUrl = parts[1]?.replace("Sainsburys: ", "").trim();
          const ocadoUrl = parts[2]?.replace("Ocado: ", "").trim();
          if (currentCategory) {
            categoryItems.push({ name: parts[0], sainsburysUrl, ocadoUrl });
          }
        }
        return;
      }

      if (line.startsWith("## ")) {
        flushOl(i);
        const dayName = line.replace("## ", "").trim();
        const dayKey = Object.keys(DAY_STYLES).find(d => dayName.includes(d));
        const ds = dayKey ? DAY_STYLES[dayKey] : { bg:"#FF6B35", emoji:"🍽️" };
        const shortDay = dayKey ? SHORT_DAYS[dayKey] : dayName.slice(0,3).toUpperCase();
        result.push(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,margin:"24px 0 10px"}}>
            <div style={{background:ds.bg,color:"white",borderRadius:8,padding:"5px 10px",fontSize:11,fontWeight:700,minWidth:36,textAlign:"center",letterSpacing:"0.02em"}}>{shortDay}</div>
            <div style={{height:1,flex:1,background:"#FFE8DC"}}/>
            <div style={{fontSize:18}}>{ds.emoji}</div>
          </div>
        );
      } else if (line.startsWith("### ")) {
        flushOl(i);
        result.push(
          <div key={i} style={{background:"#FFF8F5",border:"1px solid #FFE0CC",borderRadius:10,padding:"10px 14px",margin:"8px 0 4px"}}>
            <div style={{fontSize:14,fontWeight:700,color:"#CC4400"}}>{line.replace("### ","")}</div>
          </div>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        flushOl(i);
        result.push(
          <div key={i} style={{fontSize:13,fontWeight:700,color:"#FF6B35",margin:"10px 0 4px",textTransform:"uppercase",letterSpacing:"0.04em"}}>{line.replace(/\*\*/g,"")}</div>
        );
      } else if (line.includes("|") && !line.startsWith("-") && !line.startsWith("#")) {
        flushOl(i);
        const parts = line.split("|").map(s => s.trim()).filter(Boolean);
        result.push(
          <div key={i} style={{display:"flex",flexWrap:"wrap",gap:6,margin:"6px 0 10px"}}>
            {parts.map((p,j) => (
              <span key={j} style={{fontSize:12,padding:"3px 10px",background:"#FFF0E8",border:"1px solid #FFD4C0",borderRadius:100,color:"#CC4400",fontWeight:500}}>{p}</span>
            ))}
          </div>
        );
      } else if (line.startsWith("- ")) {
        flushOl(i);
        result.push(
          <li key={i} style={{fontSize:14,margin:"3px 0",marginLeft:16,color:"#444",lineHeight:1.5}}>{line.replace("- ","")}</li>
        );
      } else if (line.match(/^\d+\. /)) {
        olBuffer.push(
          <li key={i} style={{fontSize:14,margin:"4px 0",color:"#444",lineHeight:1.55}}>{line.replace(/^\d+\. /,"")}</li>
        );
      } else if (line.trim() === "") {
        flushOl(i);
        result.push(<div key={i} style={{height:6}}/>);
      } else {
        flushOl(i);
        result.push(
          <p key={i} style={{fontSize:14,margin:"3px 0",lineHeight:1.65,color:"#444"}}>{line}</p>
        );
      }
    });

    flushOl("end");
    flushCategory();

    const catEmojis = {
      "Meat & Fish":"🥩", "Fruit & Veg":"🥦", "Dairy & Eggs":"🥛",
      "Tins & Pantry":"🥫", "Bakery":"🍞", "Other":"🛒"
    };

    if (Object.keys(categories).length > 0) {
      const totalItems = Object.values(categories).flat().length;
      const checkedCount = Object.values(checked).filter(Boolean).length;
      result.push(
        <div key="shopping" style={{marginTop:28}}>
          <div style={{background:"#FF6B35",borderRadius:14,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div>
              <div style={{color:"white",fontSize:15,fontWeight:700}}>Shopping list</div>
              <div style={{color:"#FFD4C0",fontSize:12,marginTop:2}}>{totalItems} items · {checkedCount} ticked off</div>
            </div>
            <div style={{fontSize:28}}>🛒</div>
          </div>
          {Object.entries(categories).map(([cat, items]) => items.length > 0 && (
            <div key={cat} style={{marginBottom:10,background:"white",borderRadius:12,border:"1px solid #FFE8DC",overflow:"hidden"}}>
              <div style={{padding:"8px 14px",background:"#FFF8F5",borderBottom:"1px solid #FFE8DC",fontSize:12,fontWeight:700,color:"#CC4400",display:"flex",alignItems:"center",gap:6}}>
                <span>{catEmojis[cat] || "🛒"}</span>
                <span>{cat}</span>
              </div>
              {items.map((item, idx) => {
                const key = `${cat}-${idx}`;
                const isChecked = checked[key];
                return (
                  <div key={idx} style={{padding:"9px 14px",borderBottom:idx<items.length-1?"1px solid #FFF5F0":"none",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,flex:1,minWidth:0}}>
                      <input type="checkbox" checked={!!isChecked} onChange={()=>setChecked(p=>({...p,[key]:!p[key]}))} style={{accentColor:"#FF6B35",width:16,height:16,cursor:"pointer",flexShrink:0}}/>
                      <span style={{fontSize:13,color:isChecked?"#ccc":"#333",textDecoration:isChecked?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</span>
                    </div>
                    <div style={{display:"flex",gap:5,flexShrink:0}}>
                      <a href={item.sainsburysUrl} target="_blank" rel="noopener noreferrer" style={{fontSize:11,padding:"3px 9px",background:isChecked?"#F5F5F5":"#FFF0E8",color:isChecked?"#bbb":"#CC4400",borderRadius:100,textDecoration:"none",whiteSpace:"nowrap",fontWeight:500}}>Sainsbury's ↗</a>
                      <a href={item.ocadoUrl} target="_blank" rel="noopener noreferrer" style={{fontSize:11,padding:"3px 9px",background:isChecked?"#F5F5F5":"#E8F5EE",color:isChecked?"#bbb":"#1A6B40",borderRadius:100,textDecoration:"none",whiteSpace:"nowrap",fontWeight:500}}>Ocado ↗</a>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      );
    }

    return result;
  };

  return (
    <div style={{minHeight:"100vh",background:"#FFF8F5",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>

      <div style={{background:"#FF6B35",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:38,height:38,background:"white",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🍽️</div>
          <div>
            <div style={{color:"white",fontSize:17,fontWeight:700,letterSpacing:"-0.3px"}}>Seven Dinners</div>
            <div style={{color:"#FFD4C0",fontSize:11}}>your family's weekly menu</div>
          </div>
        </div>
        {step==="plan" ? (
          <button onClick={()=>setStep("prefs")} style={{background:"rgba(255,255,255,0.2)",color:"white",border:"1px solid rgba(255,255,255,0.3)",padding:"7px 14px",borderRadius:100,fontSize:12,cursor:"pointer",fontWeight:500}}>← edit</button>
        ) : (
          <div style={{color:"#FFD4C0",fontSize:12,fontWeight:500}}>7 dinners · sorted</div>
        )}
      </div>

      <div style={{background:"#FF6B35",padding:"24px 24px 44px"}}>
        <div style={{display:"inline-block",background:"rgba(255,255,255,0.2)",color:"white",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:100,marginBottom:10,letterSpacing:"0.05em"}}>POWERED BY AI</div>
        <div style={{color:"white",fontSize:26,fontWeight:700,lineHeight:1.2,marginBottom:8,letterSpacing:"-0.5px"}}>
          {step==="prefs" ? "Seven dinners.\nSorted in seconds." : "Your seven dinners\nare ready! 🎉"}
        </div>
        <div style={{color:"#FFD4C0",fontSize:13,lineHeight:1.6}}>
          {step==="prefs"
            ? "Tell us what your family loves. We'll plan a full week of wholesome, delicious dinners."
            : `Planned for ${prefs.adults} adult${prefs.adults!==1?"s":""} & ${prefs.children} child${prefs.children!==1?"ren":""} · max ${prefs.cookingTime} · ${prefs.budget} budget`
          }
        </div>
      </div>

      <div style={{maxWidth:680,margin:"-20px auto 0",padding:"0 16px 48px",position:"relative",zIndex:1}}>

        {step==="prefs" && !loading && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {["adults","children"].map((key)=>(
                <div key={key} style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 4px 16px rgba(255,107,53,0.12)",border:"1px solid #FFE8DC"}}>
                  <div style={{fontSize:11,color:"#FF6B35",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>{key === "adults" ? "👨‍👩 Adults" : "👧👦 Children"}</div>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <button onClick={()=>setPrefs((p)=>({...p,[key]:Math.max(key==="children"?0:1,p[key]-1)}))} style={{width:32,height:32,borderRadius:"50%",border:"2px solid #FFD4C0",background:"#FFF0E8",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",color:"#FF6B35",fontWeight:700}}>−</button>
                    <span style={{fontSize:26,fontWeight:700,color:"#333",minWidth:24,textAlign:"center"}}>{prefs[key]}</span>
                    <button onClick={()=>setPrefs((p)=>({...p,[key]:p[key]+1}))} style={{width:32,height:32,borderRadius:"50%",border:"2px solid #FFD4C0",background:"#FFF0E8",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",color:"#FF6B35",fontWeight:700}}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 4px 16px rgba(255,107,53,0.12)",border:"1px solid #FFE8DC"}}>
              <div style={{fontSize:11,color:"#FF6B35",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>❤️ Foods we love</div>
              <textarea value={prefs.likes} onChange={(e)=>setPrefs((p)=>({...p,likes:e.target.value}))} rows={2} placeholder="e.g. chicken, salmon, pasta..." style={{width:"100%",fontSize:13,padding:"10px 12px",border:"2px solid #FFE8DC",borderRadius:10,resize:"vertical",boxSizing:"border-box",fontFamily:"inherit",color:"#333",background:"#FFFAF8",outline:"none"}}/>
              <div style={{fontSize:11,color:"#888",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",margin:"12px 0 8px"}}>🚫 Foods to avoid</div>
              <textarea value={prefs.dislikes} onChange={(e)=>setPrefs((p)=>({...p,dislikes:e.target.value}))} rows={2} placeholder="e.g. pork, shellfish..." style={{width:"100%",fontSize:13,padding:"10px 12px",border:"2px solid #FFE8DC",borderRadius:10,resize:"vertical",boxSizing:"border-box",fontFamily:"inherit",color:"#333",background:"#FFFAF8",outline:"none"}}/>
            </div>

            <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 4px 16px rgba(255,107,53,0.12)",border:"1px solid #FFE8DC"}}>
              <div style={{fontSize:11,color:"#FF6B35",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>🥗 Dietary requirements</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {DIETARY_OPTIONS.map((opt)=>(
                  <button key={opt} onClick={()=>toggleDietary(opt)} style={{padding:"6px 14px",borderRadius:100,fontSize:12,border:"2px solid",cursor:"pointer",background:prefs.dietary.includes(opt)?"#FF6B35":"white",borderColor:prefs.dietary.includes(opt)?"#FF6B35":"#FFE0CC",color:prefs.dietary.includes(opt)?"white":"#888",fontWeight:prefs.dietary.includes(opt)?700:400,transition:"all 0.15s"}}>
                    {prefs.dietary.includes(opt)?"✓ ":""}{opt}
                  </button>
                ))}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 4px 16px rgba(255,107,53,0.12)",border:"1px solid #FFE8DC"}}>
                <div style={{fontSize:11,color:"#FF6B35",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>⏱️ Max cooking time</div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {TIME_OPTIONS.map((t)=>(
                    <button key={t} onClick={()=>setPrefs((p)=>({...p,cookingTime:t}))} style={{padding:"7px 10px",borderRadius:8,fontSize:12,border:"2px solid",cursor:"pointer",textAlign:"left",background:prefs.cookingTime===t?"#FFF0E8":"white",borderColor:prefs.cookingTime===t?"#FF6B35":"#FFE8DC",color:prefs.cookingTime===t?"#CC4400":"#666",fontWeight:prefs.cookingTime===t?700:400}}>
                      {prefs.cookingTime===t?"✓ ":""}{t}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 4px 16px rgba(255,107,53,0.12)",border:"1px solid #FFE8DC"}}>
                <div style={{fontSize:11,color:"#FF6B35",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>💰 Budget</div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {BUDGET_OPTIONS.map((b)=>(
                    <button key={b} onClick={()=>setPrefs((p)=>({...p,budget:b}))} style={{padding:"7px 10px",borderRadius:8,fontSize:12,border:"2px solid",cursor:"pointer",textAlign:"left",background:prefs.budget===b?"#FFF0E8":"white",borderColor:prefs.budget===b?"#FF6B35":"#FFE8DC",color:prefs.budget===b?"#CC4400":"#666",fontWeight:prefs.budget===b?700:400}}>
                      {prefs.budget===b?"✓ ":""}{b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div style={{background:"#FFF0F0",border:"2px solid #FFB0B0",borderRadius:12,padding:"12px 16px",color:"#CC0000",fontSize:13,fontWeight:500}}>{error}</div>
            )}

            <button onClick={generatePlan} style={{width:"100%",padding:"16px",fontSize:16,fontWeight:700,background:"#FF6B35",color:"white",border:"none",borderRadius:14,cursor:"pointer",boxShadow:"0 6px 20px rgba(255,107,53,0.4)",letterSpacing:"-0.2px"}}>
              Plan my seven dinners →
            </button>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {["🥗 No UPF","🚫 No pork","⏱️ Quick meals","🛒 Shopping list","🇬🇧 British friendly","✨ AI powered"].map((tag,i)=>(
                <div key={i} style={{background:"white",borderRadius:10,padding:"8px 10px",fontSize:11,color:"#888",textAlign:"center",border:"1px solid #FFE8DC",fontWeight:500}}>{tag}</div>
              ))}
            </div>

          </div>
        )}

        {loading && (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 24px",gap:16}}>
            <div style={{fontSize:48,animation:"bounce 1s infinite"}}>🍽️</div>
            <div style={{position:"relative",width:48,height:48}}>
              <div style={{position:"absolute",inset:0,border:"3px solid #FFE8DC",borderRadius:"50%"}}/>
              <div style={{position:"absolute",inset:0,border:"3px solid transparent",borderTopColor:"#FF6B35",borderRadius:"50%",animation:"spin 0.9s linear infinite"}}/>
            </div>
            <p style={{color:"#FF6B35",fontSize:14,fontWeight:600,textAlign:"center",maxWidth:240,lineHeight:1.6}}>{loadingMsg}</p>
            <p style={{color:"#FFB090",fontSize:12,textAlign:"center"}}>This takes about 30 seconds</p>
          </div>
        )}

        {step==="plan" && !loading && mealPlan && (
          <div>
            <div style={{background:"white",borderRadius:16,padding:"20px",boxShadow:"0 4px 16px rgba(255,107,53,0.12)",border:"1px solid #FFE8DC"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,gap:8,flexWrap:"wrap"}}>
                <div style={{fontSize:15,fontWeight:700,color:"#333"}}>This week's seven dinners</div>
                <button onClick={generatePlan} style={{fontSize:12,padding:"7px 14px",borderRadius:100,border:"2px solid #FFE8DC",background:"#FFF8F5",color:"#FF6B35",cursor:"pointer",fontWeight:600}}>↻ new plan</button>
              </div>
              <div>{formatPlan(mealPlan)}</div>
            </div>
            <div style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button onClick={()=>setStep("prefs")} style={{padding:"13px",fontSize:13,borderRadius:12,border:"2px solid #FFE8DC",background:"white",cursor:"pointer",color:"#666",fontWeight:600}}>← edit preferences</button>
              <button onClick={generatePlan} style={{padding:"13px",fontSize:13,fontWeight:700,borderRadius:12,border:"none",background:"#FF6B35",color:"white",cursor:"pointer",boxShadow:"0 4px 12px rgba(255,107,53,0.3)"}}>↻ regenerate</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
