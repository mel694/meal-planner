"use client";
import { useState } from "react";

const DIETARY_OPTIONS = ["Vegetarian","Vegan","Gluten-free","Dairy-free","Nut-free","No pork","No shellfish"];
const TIME_OPTIONS = ["20 mins","30 mins","45 mins","1 hour","No limit"];
const BUDGET_OPTIONS = ["Budget","Medium","Premium"];

const SUPERMARKETS = [
  { id:"sainsburys", name:"Sainsbury's", color:"#F06C00", bg:"#FFF0E8", search:"https://www.sainsburys.co.uk/gol-ui/SearchResults/" },
  { id:"tesco", name:"Tesco", color:"#005BA3", bg:"#E8F0FB", search:"https://www.tesco.com/groceries/en-GB/search?query=" },
  { id:"asda", name:"Asda", color:"#78BE20", bg:"#EFF8E4", search:"https://groceries.asda.com/search/" },
  { id:"morrisons", name:"Morrisons", color:"#FFD700", bg:"#FFFBE8", textColor:"#333", search:"https://groceries.morrisons.com/search?entry=" },
  { id:"ocado", name:"Ocado", color:"#5DAC45", bg:"#E8F5EE", search:"https://www.ocado.com/search?entry=" },
];

const DAY_STYLES = {
  Monday:    { bg:"#FF6B35", emoji:"🍗" },
  Tuesday:   { bg:"#FFB347", emoji:"🐟" },
  Wednesday: { bg:"#4CAF7D", emoji:"🥩" },
  Thursday:  { bg:"#8B5CF6", emoji:"🌶️" },
  Friday:    { bg:"#FF6B35", emoji:"🌮", special: true },
  Saturday:  { bg:"#EC4899", emoji:"🥗" },
  Sunday:    { bg:"#F59E0B", emoji:"🍖" },
};

const SHORT_DAYS = { Monday:"MON", Tuesday:"TUE", Wednesday:"WED", Thursday:"THU", Friday:"FRI", Saturday:"SAT", Sunday:"SUN" };
const REPLACE_OPTIONS = ["🍕 Takeaway", "🍽️ Meal out", "✈️ Holiday", "🥡 Leftovers"];
const CAT_EMOJIS = { "Meat & Fish":"🥩", "Fruit & Veg":"🥦", "Dairy & Eggs":"🥛", "Tins & Pantry":"🥫", "Bakery":"🍞", "Other":"🛒" };

type FridgePhoto = { data: string; mediaType: string; preview: string };

export default function SevenDinners() {
  const [step, setStep] = useState("prefs");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [mealPlan, setMealPlan] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState<Record<string,boolean>>({});
  const [selectedSupermarket, setSelectedSupermarket] = useState("sainsburys");
  const [deletedDays, setDeletedDays] = useState<Record<string,string>>({});
  const [swapping, setSwapping] = useState<string|null>(null);

  const [fridgePhotos, setFridgePhotos] = useState<FridgePhoto[]>([]);
  const [alreadyHave, setAlreadyHave] = useState("");
  const [analysing, setAnalysing] = useState(false);

  const [prefs, setPrefs] = useState({
    adults: 2, children: 2,
    likes: "chicken, salmon, beef, pasta, roasted vegetables",
    dislikes: "pork, blue cheese, very spicy food",
    dietary: [] as string[], cookingTime: "45 mins", budget: "Medium",
  });

  const sm = SUPERMARKETS.find(s => s.id === selectedSupermarket) || SUPERMARKETS[0];

  const toggleDietary = (opt: string) =>
    setPrefs((p) => ({ ...p, dietary: p.dietary.includes(opt) ? p.dietary.filter((x) => x !== opt) : [...p.dietary, opt] }));

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      if (fridgePhotos.length >= 3) break;
      const reader = new FileReader();
      await new Promise<void>((resolve) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(",")[1];
          setFridgePhotos(prev => [...prev, { data: base64, mediaType: file.type, preview: result }]);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    e.target.value = "";
  };

  const removePhoto = (idx: number) => {
    setFridgePhotos(prev => prev.filter((_, i) => i !== idx));
    setAlreadyHave("");
  };

  const analyseFridge = async () => {
    if (fridgePhotos.length === 0) return;
    setAnalysing(true);
    try {
      const res = await fetch("/api/mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "analyse_fridge",
          fridgePhotos: fridgePhotos.map(p => ({ data: p.data, mediaType: p.mediaType })),
        }),
      });
      const data = await res.json();
      if (data.ingredients) setAlreadyHave(data.ingredients);
    } catch (e) { console.error(e); }
    setAnalysing(false);
  };

  const generatePlan = async () => {
    setLoading(true); setError(""); setMealPlan(""); setChecked({}); setDeletedDays({});
    const msgs = alreadyHave
      ? ["Checking what's in your fridge...","Matching meals to ingredients you have...","Building your seven dinners...","Building a smart shopping list..."]
      : ["Finding the perfect recipes...","Matching meals to your tastes...","Building your seven dinners...","Adding macros and shopping list..."];
    let i = 0; setLoadingMsg(msgs[0]);
    const interval = setInterval(() => { i=(i+1)%msgs.length; setLoadingMsg(msgs[i]); }, 3000);
    try {
      const res = await fetch("/api/mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prefs, alreadyHave }),
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

  const swapMeal = async (dayName: string) => {
    setSwapping(dayName);
    try {
      const res = await fetch("/api/mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prefs, swapDay: dayName, currentPlan: mealPlan }),
      });
      const data = await res.json();
      if (data.mealPlan) {
        setMealPlan(prev => {
          const lines = prev.split("\n");
          const dayIndex = lines.findIndex(l => l.includes(`## ${dayName}`));
          const nextDayIndex = lines.findIndex((l, i) => i > dayIndex && l.startsWith("## ") && !l.includes(dayName));
          if (dayIndex === -1) return prev;
          const end = nextDayIndex === -1 ? lines.length : nextDayIndex;
          return [...lines.slice(0, dayIndex), ...data.mealPlan.split("\n"), ...lines.slice(end)].join("\n");
        });
      }
    } catch (e) { console.error(e); }
    setSwapping(null);
  };

  const handlePrint = () => window.print();

  const parseMealPlan = (text: string) => {
    const lines = text.split("\n");
    const days: Array<{name:string, lines:string[]}> = [];
    const shoppingLines: string[] = [];
    let currentDay: {name:string, lines:string[]} | null = null;
    let inShopping = false;

    lines.forEach(line => {
      if (line.includes("SHOPPING LIST") || line.includes("Shopping List") || line.includes("Shopping list")) {
        if (currentDay) days.push(currentDay);
        currentDay = null; inShopping = true; return;
      }
      if (inShopping) { shoppingLines.push(line); return; }
      if (line.startsWith("## ")) {
        if (currentDay) days.push(currentDay);
        currentDay = { name: line.replace("## ","").trim(), lines: [] };
      } else if (currentDay) {
        currentDay.lines.push(line);
      }
    });
    if (currentDay) days.push(currentDay);

    const categories: Record<string, Array<{name:string}>> = {};
    let currentCat = "";
    shoppingLines.forEach(line => {
      if (line.startsWith("**") && line.endsWith("**")) {
        currentCat = line.replace(/\*\*/g,"");
        if (!categories[currentCat]) categories[currentCat] = [];
      } else if (line.match(/^- .+\| Sainsburys:.+\| Ocado:.+/)) {
        const parts = line.replace("- ","").split(" | ");
        if (currentCat) categories[currentCat].push({ name: parts[0] });
      }
    });

    return { days, categories };
  };

  const renderDayLines = (lines: string[]) => {
    const result: React.ReactNode[] = [];
    let olBuffer: React.ReactNode[] = [];
    let olKey = 0;

    const flushOl = () => {
      if (olBuffer.length > 0) { result.push(<ol key={`ol-${olKey++}`} style={{padding:"0 0 0 20px",margin:"4px 0 8px"}}>{olBuffer}</ol>); olBuffer = []; }
    };

    lines.forEach((line, i) => {
      if (line.startsWith("### ")) {
        flushOl();
        result.push(<div key={i} style={{background:"#FFF8F5",border:"1px solid #FFE0CC",borderRadius:8,padding:"8px 12px",margin:"8px 0 4px"}}><span style={{fontSize:14,fontWeight:700,color:"#CC4400"}}>{line.replace("### ","")}</span></div>);
      } else if (line.startsWith("**") && line.endsWith("**")) {
        flushOl();
        result.push(<div key={i} style={{fontSize:12,fontWeight:700,color:"#FF6B35",margin:"10px 0 4px",textTransform:"uppercase",letterSpacing:"0.04em"}}>{line.replace(/\*\*/g,"")}</div>);
      } else if (line.includes("Calories:") || line.includes("Protein:") || line.includes("Carbs:") || line.includes("Fat:")) {
        flushOl();
        const macros = line.split("|").map(s => s.trim()).filter(Boolean);
        result.push(
          <div key={i} style={{display:"flex",flexWrap:"wrap",gap:6,margin:"8px 0"}}>
            {macros.map((m,j) => <span key={j} style={{fontSize:11,padding:"3px 10px",background:"#F0EEFF",border:"1px solid #D0C8FF",borderRadius:100,color:"#5040A0",fontWeight:600}}>{m}</span>)}
          </div>
        );
      } else if (line.includes("|") && !line.startsWith("-") && !line.startsWith("#")) {
        flushOl();
        const parts = line.split("|").map(s => s.trim()).filter(Boolean);
        result.push(
          <div key={i} style={{display:"flex",flexWrap:"wrap",gap:6,margin:"6px 0 10px"}}>
            {parts.map((p,j) => <span key={j} style={{fontSize:12,padding:"3px 10px",background:"#FFF0E8",border:"1px solid #FFD4C0",borderRadius:100,color:"#CC4400",fontWeight:500}}>{p}</span>)}
          </div>
        );
      } else if (line.startsWith("- ")) {
        flushOl();
        result.push(<li key={i} style={{fontSize:14,margin:"3px 0",marginLeft:16,color:"#444",lineHeight:1.5}}>{line.replace("- ","")}</li>);
      } else if (line.match(/^\d+\. /)) {
        olBuffer.push(<li key={i} style={{fontSize:14,margin:"4px 0",color:"#444",lineHeight:1.55}}>{line.replace(/^\d+\. /,"")}</li>);
      } else if (line.trim()==="") {
        flushOl();
        result.push(<div key={i} style={{height:4}}/>);
      } else {
        flushOl();
        result.push(<p key={i} style={{fontSize:14,margin:"3px 0",lineHeight:1.65,color:"#444"}}>{line}</p>);
      }
    });
    flushOl();
    return result;
  };

  const { days, categories } = step === "plan" && mealPlan ? parseMealPlan(mealPlan) : { days: [], categories: {} };
  const totalItems = Object.values(categories).flat().length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const ingredientsList = alreadyHave ? alreadyHave.split(",").map(s => s.trim()).filter(Boolean) : [];

  return (
    <div style={{minHeight:"100vh",background:"#FFF8F5",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .meal-card { break-inside: avoid; page-break-inside: avoid; border: 1px solid #ddd !important; margin-bottom: 16px !important; }
          .shopping-section { break-before: page; }
        }
      `}</style>

      <div className="no-print" style={{background:"#FF6B35",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:38,height:38,background:"white",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🍽️</div>
          <div>
            <div style={{color:"white",fontSize:17,fontWeight:700,letterSpacing:"-0.3px"}}>Seven Dinners</div>
            <div style={{color:"#FFD4C0",fontSize:11}}>your family's weekly menu</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {step==="plan" && <button onClick={handlePrint} style={{background:"rgba(255,255,255,0.2)",color:"white",border:"1px solid rgba(255,255,255,0.3)",padding:"7px 14px",borderRadius:100,fontSize:12,cursor:"pointer",fontWeight:500}}>🖨️ Print / PDF</button>}
          {step==="plan" && <button onClick={()=>setStep("prefs")} style={{background:"rgba(255,255,255,0.15)",color:"white",border:"1px solid rgba(255,255,255,0.2)",padding:"7px 14px",borderRadius:100,fontSize:12,cursor:"pointer",fontWeight:500}}>← edit</button>}
        </div>
      </div>

      <div className="print-only" style={{display:"none",padding:"20px 40px 10px",borderBottom:"3px solid #FF6B35"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <span style={{fontSize:28}}>🍽️</span>
          <div>
            <div style={{fontSize:22,fontWeight:700,color:"#FF6B35"}}>Seven Dinners</div>
            <div style={{fontSize:13,color:"#666"}}>Weekly meal plan · {new Date().toLocaleDateString("en-GB", {weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
          </div>
        </div>
      </div>

      <div style={{background:"#FF6B35",padding:"24px 24px 44px"}} className="no-print">
        <div style={{display:"inline-block",background:"rgba(255,255,255,0.2)",color:"white",fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:100,marginBottom:10,letterSpacing:"0.05em"}}>POWERED BY AI</div>
        <div style={{color:"white",fontSize:26,fontWeight:700,lineHeight:1.2,marginBottom:8,letterSpacing:"-0.5px"}}>
          {step==="prefs" ? "Seven dinners.\nSorted in seconds." : "Your seven dinners\nare ready! 🎉"}
        </div>
        <div style={{color:"#FFD4C0",fontSize:13,lineHeight:1.6}}>
          {step==="prefs" ? "Tell us what your family loves. We'll plan a full week of wholesome, delicious dinners." : `Planned for ${prefs.adults} adult${prefs.adults!==1?"s":""} & ${prefs.children} child${prefs.children!==1?"ren":""} · max ${prefs.cookingTime} · ${prefs.budget} budget`}
        </div>
      </div>

      <div style={{maxWidth:680,margin:"-20px auto 0",padding:"0 16px 48px",position:"relative",zIndex:1}}>

        {step==="prefs" && !loading && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>

            <div style={{background:"linear-gradient(135deg,#FFF0E8 0%,#FFE8DC 100%)",borderRadius:16,padding:"16px",border:"2px solid #FF6B35",boxShadow:"0 4px 20px rgba(255,107,53,0.15)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{fontSize:24}}>📸</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:14,fontWeight:700,color:"#CC4400"}}>Snap your fridge or cupboard</div>
                  <div style={{fontSize:11,color:"#883300"}}>Optional · we'll skip ingredients you already have</div>
                </div>
                <span style={{background:"#FF6B35",color:"white",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:100}}>NEW</span>
              </div>

              {fridgePhotos.length > 0 && (
                <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
                  {fridgePhotos.map((photo, idx) => (
                    <div key={idx} style={{position:"relative",width:70,height:70,borderRadius:10,overflow:"hidden",border:"2px solid white",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>
                      <img src={photo.preview} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                      <button onClick={()=>removePhoto(idx)} style={{position:"absolute",top:2,right:2,width:20,height:20,borderRadius:"50%",border:"none",background:"rgba(0,0,0,0.7)",color:"white",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {fridgePhotos.length < 3 && (
                  <label style={{flex:1,minWidth:140,padding:"10px 14px",background:"white",border:"2px dashed #FF6B35",borderRadius:10,fontSize:12,color:"#FF6B35",cursor:"pointer",textAlign:"center",fontWeight:600}}>
                    📷 {fridgePhotos.length === 0 ? "Add photos" : "Add another"}
                    <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} style={{display:"none"}}/>
                  </label>
                )}
                {fridgePhotos.length > 0 && !alreadyHave && (
                  <button onClick={analyseFridge} disabled={analysing} style={{flex:1,minWidth:140,padding:"10px 14px",background:"#FF6B35",color:"white",border:"none",borderRadius:10,fontSize:12,cursor:"pointer",fontWeight:700,opacity:analysing?0.6:1}}>
                    {analysing ? "🔍 Scanning..." : "✨ Scan ingredients"}
                  </button>
                )}
              </div>

              {alreadyHave && (
                <div style={{marginTop:10,padding:"10px 12px",background:"white",borderRadius:10,border:"1px solid #FFD4C0"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#CC4400",marginBottom:6,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span>✓ FOUND {ingredientsList.length} INGREDIENTS</span>
                    <button onClick={()=>{setAlreadyHave("");setFridgePhotos([])}} style={{background:"none",border:"none",color:"#888",fontSize:11,cursor:"pointer"}}>clear</button>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                    {ingredientsList.slice(0,15).map((ing, i) => (
                      <span key={i} style={{fontSize:11,padding:"2px 8px",background:"#FFF0E8",borderRadius:100,color:"#CC4400"}}>{ing}</span>
                    ))}
                    {ingredientsList.length > 15 && <span style={{fontSize:11,padding:"2px 8px",color:"#888"}}>+ {ingredientsList.length - 15} more</span>}
                  </div>
                  <div style={{fontSize:11,color:"#888",marginTop:8,lineHeight:1.4}}>These won't appear on your shopping list 🛒</div>
                </div>
              )}
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {["adults","children"].map((key)=>(
                <div key={key} style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 4px 16px rgba(255,107,53,0.12)",border:"1px solid #FFE8DC"}}>
                  <div style={{fontSize:11,color:"#FF6B35",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>{key==="adults"?"👨‍👩 Adults":"👧👦 Children"}</div>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <button onClick={()=>setPrefs((p)=>({...p,[key]:Math.max(key==="children"?0:1,(p as any)[key]-1)}))} style={{width:32,height:32,borderRadius:"50%",border:"2px solid #FFD4C0",background:"#FFF0E8",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",color:"#FF6B35",fontWeight:700}}>−</button>
                    <span style={{fontSize:26,fontWeight:700,color:"#333",minWidth:24,textAlign:"center"}}>{(prefs as any)[key]}</span>
                    <button onClick={()=>setPrefs((p)=>({...p,[key]:(p as any)[key]+1}))} style={{width:32,height:32,borderRadius:"50%",border:"2px solid #FFD4C0",background:"#FFF0E8",cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",color:"#FF6B35",fontWeight:700}}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 4px 16px rgba(255,107,53,0.12)",border:"1px solid #FFE8DC"}}>
              <div style={{fontSize:11,color:"#FF6B35",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>❤️ Foods we love</div>
              <textarea value={prefs.likes} onChange={(e)=>setPrefs((p)=>({...p,likes:e.target.value}))} rows={2} style={{width:"100%",fontSize:13,padding:"10px 12px",border:"2px solid #FFE8DC",borderRadius:10,resize:"vertical",boxSizing:"border-box",fontFamily:"inherit",color:"#333",background:"#FFFAF8",outline:"none"}}/>
              <div style={{fontSize:11,color:"#888",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",margin:"12px 0 8px"}}>🚫 Foods to avoid</div>
              <textarea value={prefs.dislikes} onChange={(e)=>setPrefs((p)=>({...p,dislikes:e.target.value}))} rows={2} style={{width:"100%",fontSize:13,padding:"10px 12px",border:"2px solid #FFE8DC",borderRadius:10,resize:"vertical",boxSizing:"border-box",fontFamily:"inherit",color:"#333",background:"#FFFAF8",outline:"none"}}/>
            </div>

            <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 4px 16px rgba(255,107,53,0.12)",border:"1px solid #FFE8DC"}}>
              <div style={{fontSize:11,color:"#FF6B35",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>🥗 Dietary requirements</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {DIETARY_OPTIONS.map((opt)=>(
                  <button key={opt} onClick={()=>toggleDietary(opt)} style={{padding:"6px 14px",borderRadius:100,fontSize:12,border:"2px solid",cursor:"pointer",background:prefs.dietary.includes(opt)?"#FF6B35":"white",borderColor:prefs.dietary.includes(opt)?"#FF6B35":"#FFE0CC",color:prefs.dietary.includes(opt)?"white":"#888",fontWeight:prefs.dietary.includes(opt)?700:400}}>
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

            {error && <div style={{background:"#FFF0F0",border:"2px solid #FFB0B0",borderRadius:12,padding:"12px 16px",color:"#CC0000",fontSize:13,fontWeight:500}}>{error}</div>}

            <button onClick={generatePlan} style={{width:"100%",padding:"16px",fontSize:16,fontWeight:700,background:"#FF6B35",color:"white",border:"none",borderRadius:14,cursor:"pointer",boxShadow:"0 6px 20px rgba(255,107,53,0.4)"}}>
              Plan my seven dinners →
            </button>
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
              <div className="no-print" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,gap:8,flexWrap:"wrap"}}>
                <div style={{fontSize:15,fontWeight:700,color:"#333"}}>This week's seven dinners</div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={handlePrint} style={{fontSize:12,padding:"7px 14px",borderRadius:100,border:"2px solid #FF6B35",background:"#FFF0E8",color:"#FF6B35",cursor:"pointer",fontWeight:600}}>🖨️ Print / Save PDF</button>
                  <button onClick={generatePlan} style={{fontSize:12,padding:"7px 14px",borderRadius:100,border:"2px solid #FFE8DC",background:"#FFF8F5",color:"#FF6B35",cursor:"pointer",fontWeight:600}}>↻ new plan</button>
                </div>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {days.map((day, idx) => {
                  const dayKey = Object.keys(DAY_STYLES).find(d => day.name.includes(d));
                  const ds = dayKey ? (DAY_STYLES as any)[dayKey] : { bg:"#FF6B35", emoji:"🍽️" };
                  const shortDay = dayKey ? (SHORT_DAYS as any)[dayKey] : day.name.slice(0,3).toUpperCase();
                  const isDeleted = deletedDays[day.name];
                  const isSwapping = swapping === day.name;
                  return (
                    <div key={idx} className="meal-card" style={{border:"1px solid #FFE8DC",borderRadius:14,overflow:"hidden",background:"white"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#FFF8F5",borderBottom:"1px solid #FFE8DC"}}>
                        <div style={{background:ds.bg,color:"white",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700,minWidth:34,textAlign:"center"}}>{shortDay}</div>
                        <div style={{flex:1,fontSize:14,fontWeight:600,color:"#333"}}>{day.name}</div>
                        <div className="no-print" style={{display:"flex",gap:6}}>
                          <button onClick={()=>swapMeal(day.name)} disabled={isSwapping} style={{fontSize:11,padding:"4px 10px",borderRadius:100,border:"1px solid #FFE8DC",background:"white",color:"#FF6B35",cursor:"pointer",fontWeight:600,opacity:isSwapping?0.5:1}}>
                            {isSwapping?"⏳":"↻"} swap
                          </button>
                          <select onChange={(e)=>{if(e.target.value)setDeletedDays(p=>({...p,[day.name]:e.target.value}))}} value={isDeleted||""} style={{fontSize:11,padding:"4px 10px",borderRadius:100,border:"1px solid #FFE8DC",background:"white",color:"#888",cursor:"pointer"}}>
                            <option value="">🗑️ replace</option>
                            {REPLACE_OPTIONS.map(o=><option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      </div>
                      {isDeleted ? (
                        <div style={{padding:"20px",textAlign:"center"}}>
                          <div style={{fontSize:32,marginBottom:8}}>{isDeleted.split(" ")[0]}</div>
                          <div style={{fontSize:15,fontWeight:600,color:"#333"}}>{isDeleted}</div>
                          <button onClick={()=>setDeletedDays(p=>{const n={...p};delete n[day.name];return n;})} className="no-print" style={{marginTop:10,fontSize:12,padding:"5px 14px",borderRadius:100,border:"1px solid #FFE8DC",background:"white",color:"#FF6B35",cursor:"pointer"}}>restore meal</button>
                        </div>
                      ) : (
                        <div style={{padding:"12px 14px"}}>{renderDayLines(day.lines)}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="shopping-section" style={{marginTop:16,background:"white",borderRadius:16,border:"1px solid #FFE8DC",overflow:"hidden",boxShadow:"0 4px 16px rgba(255,107,53,0.12)"}}>
              <div style={{background:"#FF6B35",padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <div style={{color:"white",fontSize:15,fontWeight:700}}>Shopping list</div>
                  <div style={{color:"#FFD4C0",fontSize:12,marginTop:2}}>{totalItems} items · {checkedCount} ticked off{alreadyHave?" · "+ingredientsList.length+" excluded":""}</div>
                </div>
                <div style={{fontSize:28}}>🛒</div>
              </div>

              <div className="no-print" style={{padding:"12px 16px",borderBottom:"1px solid #FFE8DC"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#FF6B35",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>Choose your supermarket</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {SUPERMARKETS.map(s=>(
                    <button key={s.id} onClick={()=>setSelectedSupermarket(s.id)} style={{padding:"5px 12px",borderRadius:100,fontSize:12,fontWeight:600,border:"2px solid",cursor:"pointer",background:selectedSupermarket===s.id?s.color:"white",borderColor:selectedSupermarket===s.id?s.color:"#FFE8DC",color:selectedSupermarket===s.id?"white":(s as any).textColor||s.color}}>
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              {Object.entries(categories).map(([cat, items]) => items.length > 0 && (
                <div key={cat}>
                  <div style={{padding:"8px 16px",background:"#FFF8F5",borderBottom:"1px solid #FFE8DC",fontSize:12,fontWeight:700,color:"#CC4400",display:"flex",alignItems:"center",gap:6}}>
                    <span>{(CAT_EMOJIS as any)[cat]||"🛒"}</span><span>{cat}</span>
                  </div>
                  {items.map((item, idx) => {
                    const key = `${cat}-${idx}`;
                    const isChecked = checked[key];
                    const searchUrl = `${sm.search}${encodeURIComponent(item.name.split("(")[0].trim())}`;
                    return (
                      <div key={idx} style={{padding:"9px 16px",borderBottom:idx<items.length-1?"1px solid #FFF5F0":"none",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                        <div style={{display:"flex",alignItems:"center",gap:10,flex:1,minWidth:0}}>
                          <input type="checkbox" checked={!!isChecked} onChange={()=>setChecked(p=>({...p,[key]:!p[key]}))} style={{accentColor:"#FF6B35",width:16,height:16,cursor:"pointer",flexShrink:0}}/>
                          <span style={{fontSize:13,color:isChecked?"#ccc":"#333",textDecoration:isChecked?"line-through":"none"}}>{item.name}</span>
                        </div>
                        <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="no-print" style={{fontSize:11,padding:"3px 10px",background:isChecked?"#F5F5F5":sm.bg,color:isChecked?"#bbb":sm.color,borderRadius:100,textDecoration:"none",whiteSpace:"nowrap",fontWeight:600,flexShrink:0}}>
                          {sm.name} ↗
                        </a>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="no-print" style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button onClick={()=>setStep("prefs")} style={{padding:"13px",fontSize:13,borderRadius:12,border:"2px solid #FFE8DC",background:"white",cursor:"pointer",color:"#666",fontWeight:600}}>← edit preferences</button>
              <button onClick={generatePlan} style={{padding:"13px",fontSize:13,fontWeight:700,borderRadius:12,border:"none",background:"#FF6B35",color:"white",cursor:"pointer",boxShadow:"0 4px 12px rgba(255,107,53,0.3)"}}>↻ regenerate</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
