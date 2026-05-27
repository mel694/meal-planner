"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { trackEvent } from "../../components/GoogleAnalytics";

const DIETARY_OPTIONS = ["Vegetarian","Vegan","Gluten-free","Dairy-free","Nut-free","No pork","No shellfish"];
const TIME_OPTIONS = ["20 mins","30 mins","45 mins","1 hour","No limit"];
const BUDGET_OPTIONS = ["Budget","Medium","Premium"];
const COOKING_STYLES = [
  { id:"any", label:"🍳 Any style", desc:"Mix of methods" },
  { id:"slowcooker", label:"🍲 Slow cooker", desc:"Set & forget" },
  { id:"onepot", label:"🥘 One pot", desc:"Minimal washing up" },
  { id:"airfryer", label:"♨️ Air fryer", desc:"Quick & healthy" },
];
const MEAL_GOALS = [
  { id:"balanced", label:"🍽️ Balanced", desc:"Great all-rounder", color:"#22C55E", bg:"#F0FDF4" },
  { id:"highprotein", label:"💪 High protein", desc:"Build muscle", color:"#3B82F6", bg:"#DBEAFE" },
  { id:"fatloss", label:"🔥 Fat loss", desc:"Lower calorie meals", color:"#F59E0B", bg:"#FEF3C7" },
  { id:"quick", label:"⚡ 20-min meals", desc:"When time is short", color:"#A855F7", bg:"#F3E8FF" },
  { id:"toddler", label:"👶 Baby & toddler", desc:"Kid-friendly portions", color:"#EC4899", bg:"#FCE7F3" },
  { id:"plantbased", label:"🌱 Plant-forward", desc:"Mostly veg & legumes", color:"#16A34A", bg:"#DCFCE7" },
];
const DAYS_OF_WEEK = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const SUPERMARKETS = [
  { id:"sainsburys", name:"Sainsbury's", color:"#F06C00", bg:"#FFF0E8", search:"https://www.sainsburys.co.uk/gol-ui/SearchResults/" },
  { id:"tesco", name:"Tesco", color:"#005BA3", bg:"#E8F0FB", search:"https://www.tesco.com/groceries/en-GB/search?query=" },
  { id:"asda", name:"Asda", color:"#78BE20", bg:"#EFF8E4", search:"https://groceries.asda.com/search/" },
  { id:"morrisons", name:"Morrisons", color:"#FFD700", bg:"#FFFBE8", textColor:"#333", search:"https://groceries.morrisons.com/search?entry=" },
  { id:"ocado", name:"Ocado", color:"#5DAC45", bg:"#E8F5EE", search:"https://www.ocado.com/search?entry=" },
];

const DAY_STYLES = {
  Monday:    { bg:"#22C55E" }, Tuesday:   { bg:"#16A34A" },
  Wednesday: { bg:"#A855F7" }, Thursday:  { bg:"#8B5CF6" },
  Friday:    { bg:"#F59E0B" }, Saturday:  { bg:"#EC4899" },
  Sunday:    { bg:"#3B82F6" },
};
const SHORT_DAYS: Record<string,string> = { Monday:"MON", Tuesday:"TUE", Wednesday:"WED", Thursday:"THU", Friday:"FRI", Saturday:"SAT", Sunday:"SUN" };
const REPLACE_OPTIONS = ["🍕 Takeaway", "🍽️ Meal out", "✈️ Holiday", "🥡 Leftovers"];
const CAT_EMOJIS: Record<string,string> = { "Meat & Fish":"🥩", "Fruit & Veg":"🥦", "Dairy & Eggs":"🥛", "Tins & Pantry":"🥫", "Bakery":"🍞", "Other":"🛒" };

type FridgePhoto = { data: string; mediaType: string; preview: string };
type Favourite = { id: string; name: string; content: string; savedAt: number };
type Scheduled = Record<string, string>;

const Logo = ({ size = 44 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradApp" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradApp)"/>
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

export default function PlannerApp() {
  const [step, setStep] = useState("prefs");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [loadingSeconds, setLoadingSeconds] = useState(0);
  const [mealPlan, setMealPlan] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState<Record<string,boolean>>({});
  const [selectedSupermarket, setSelectedSupermarket] = useState("sainsburys");
  const [deletedDays, setDeletedDays] = useState<Record<string,string>>({});
  const [swapping, setSwapping] = useState<string|null>(null);
  const [swapMenuDay, setSwapMenuDay] = useState<string|null>(null);
  const [swapStyle, setSwapStyle] = useState("any");
  const [swapProtein, setSwapProtein] = useState("any");
  const [macrosPerPerson, setMacrosPerPerson] = useState(false);
  const [dayServings, setDayServings] = useState<Record<string,number>>({});

  const [fridgePhotos, setFridgePhotos] = useState<FridgePhoto[]>([]);
  const [alreadyHave, setAlreadyHave] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const [fridgeRecipe, setFridgeRecipe] = useState("");
  const [generatingFridgeRecipe, setGeneratingFridgeRecipe] = useState(false);
  const [fridgeRecipeDay, setFridgeRecipeDay] = useState("");
  const [fridgeRecipeAdded, setFridgeRecipeAdded] = useState(false);

  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [scheduled, setScheduled] = useState<Scheduled>({});
  const [showFavourites, setShowFavourites] = useState(false);
  const [savedToast, setSavedToast] = useState("");

  const [prefs, setPrefs] = useState({
    adults: 2, children: 2,
    likes: "chicken, salmon, beef, pasta, roasted vegetables",
    dislikes: "pork, blue cheese, very spicy food",
    dietary: [] as string[], cookingTime: "45 mins", budget: "Medium",
    cookingStyle: "any", mealGoal: "balanced",
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sevendinners_favourites");
      if (saved) setFavourites(JSON.parse(saved));
      const sched = localStorage.getItem("sevendinners_scheduled");
      if (sched) setScheduled(JSON.parse(sched));
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    try { localStorage.setItem("sevendinners_favourites", JSON.stringify(favourites)); } catch (e) {}
  }, [favourites]);

  useEffect(() => {
    try { localStorage.setItem("sevendinners_scheduled", JSON.stringify(scheduled)); } catch (e) {}
  }, [scheduled]);

  const { user, isSignedIn } = useUser();
  const sm = SUPERMARKETS.find(s => s.id === selectedSupermarket) || SUPERMARKETS[0];
  const totalPeople = prefs.adults + prefs.children;

  const toggleDietary = (opt: string) =>
    setPrefs((p) => ({ ...p, dietary: p.dietary.includes(opt) ? p.dietary.filter((x) => x !== opt) : [...p.dietary, opt] }));

  const showToast = (msg: string) => {
    setSavedToast(msg);
    setTimeout(()=>setSavedToast(""), 2500);
  };

  const saveFavourite = (dayName: string, dayLines: string[]) => {
    const mealNameLine = dayLines.find(l => l.includes("|"));
    const mealName = mealNameLine ? mealNameLine.split("|")[0].trim() : dayName;
    const id = `fav-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const content = `## ${dayName}\n${dayLines.join("\n")}`;
    const newFav: Favourite = { id, name: mealName, content, savedAt: Date.now() };
    setFavourites(prev => {
      if (prev.some(f => f.name === mealName)) {
        showToast("⚠️ Already in favourites");
        return prev;
      }
      showToast(`⭐ Saved "${mealName}"`);
      trackEvent("favourite_saved", { meal_name: mealName });
      return [newFav, ...prev];
    });
  };

  const removeFavourite = (id: string) => {
    setFavourites(prev => prev.filter(f => f.id !== id));
    setScheduled(prev => {
      const newSched = { ...prev };
      Object.keys(newSched).forEach(d => { if (newSched[d] === id) delete newSched[d]; });
      return newSched;
    });
  };

  const scheduleFavourite = (favId: string, day: string) => {
    setScheduled(prev => ({ ...prev, [day]: favId }));
    showToast(`📅 Scheduled for ${day}`);
  };

  const unscheduleDay = (day: string) => {
    setScheduled(prev => { const n = { ...prev }; delete n[day]; return n; });
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    for (const file of files) {
      if (fridgePhotos.length >= 3) break;
      const isHeic = file.type === "image/heic" || file.type === "image/heif"
        || file.name.toLowerCase().endsWith(".heic")
        || file.name.toLowerCase().endsWith(".heif");
      try {
        let dataUrl: string;
        let mediaType = file.type || "image/jpeg";
        if (isHeic) {
          // Dynamically import heic2any for HEIC conversion
          const heic2any = (await import("heic2any")).default;
          const blob = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.85 }) as Blob;
          dataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
          });
          mediaType = "image/jpeg";
        } else {
          dataUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        }
        setFridgePhotos(prev => [...prev, {
          data: dataUrl.split(",")[1],
          mediaType,
          preview: dataUrl,
        }]);
      } catch (err) {
        console.error("Photo conversion error:", err);
        // Fallback: try to read as-is
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        setFridgePhotos(prev => [...prev, {
          data: dataUrl.split(",")[1],
          mediaType: "image/jpeg",
          preview: dataUrl,
        }]);
      }
    }
    e.target.value = "";
  };

  const analyseFridge = async () => {
    if (fridgePhotos.length === 0) return;
    setAnalysing(true);
    try {
      const res = await fetch("/api/mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "analyse_fridge", fridgePhotos: fridgePhotos.map(p => ({ data: p.data, mediaType: p.mediaType })) }),
      });
      const data = await res.json();
      if (data.ingredients) {
        setAlreadyHave(data.ingredients);
        trackEvent("fridge_scanned", { ingredients_found: data.ingredients.split(",").length });
      }
    } catch (e) { console.error(e); }
    setAnalysing(false);
  };

  const generateFridgeRecipe = async () => {
    if (!alreadyHave) return;
    setGeneratingFridgeRecipe(true);
    setFridgeRecipe("");
    try {
      const res = await fetch("/api/mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fridge_recipe", ingredients: alreadyHave, adults: prefs.adults, children: prefs.children }),
      });
      const data = await res.json();
      if (data.recipe) {
        setFridgeRecipe(data.recipe);
        trackEvent("fridge_recipe_generated");
      }
    } catch (e) { console.error(e); }
    setGeneratingFridgeRecipe(false);
  };

  const addFridgeRecipeToPlanner = (day: string) => {
    if (!fridgeRecipe || !day) return;
    const lines = fridgeRecipe.split("\n");
    const nameLine = lines.find(l => l.startsWith("## "));
    const mealName = nameLine ? nameLine.replace("## ","").trim() : "Fridge Recipe";
    const id = `fav-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const content = `## ${day}\n${fridgeRecipe.replace(/^## .+\n?/, "")}`;
    const newFav: Favourite = { id, name: mealName, content, savedAt: Date.now() };
    // Update both state and persist immediately
    const newFavourites = [...favourites.filter(f => f.name !== mealName), newFav];
    const newScheduled = { ...scheduled, [day]: id };
    setFavourites(newFavourites);
    setScheduled(newScheduled);
    // Persist to localStorage immediately so generatePlan can read it
    try {
      localStorage.setItem("sevendinners_favourites", JSON.stringify(newFavourites));
      localStorage.setItem("sevendinners_scheduled", JSON.stringify(newScheduled));
    } catch (e) {}
    setFridgeRecipeDay(day);
    setFridgeRecipeAdded(true);
    showToast(`📅 "${mealName}" added to ${day}!`);
  };

  const generatePlanWithScheduled = async (overrideScheduled?: Scheduled, overrideFavourites?: Favourite[]) => {
    const useFavourites = overrideFavourites || favourites;
    const useScheduled = overrideScheduled || scheduled;
    setLoading(true); setError(""); setMealPlan(""); setChecked({}); setDeletedDays({}); setLoadingSeconds(0);
    const timerInterval = setInterval(() => setLoadingSeconds(s => s + 1), 1000);
    const msgs = ["Loading your scheduled meals...","Finding new recipes for the rest...","Matching to your family's tastes...","Building your seven dinners..."];
    let i = 0; setLoadingMsg(msgs[0]);
    const interval = setInterval(() => { i=(i+1)%msgs.length; setLoadingMsg(msgs[i]); }, 3000);
    try {
      const scheduledMeals = Object.entries(useScheduled).map(([day, favId]) => {
        const fav = useFavourites.find(f => f.id === favId);
        return fav ? { day, content: fav.content } : null;
      }).filter(Boolean);
      const res = await fetch("/api/mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prefs, alreadyHave, scheduledMeals }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMealPlan(data.mealPlan);
      setStep("plan");
      trackEvent("meal_plan_generated", { cooking_style: prefs.cookingStyle, meal_goal: prefs.mealGoal, budget: prefs.budget });
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setStep("prefs");
    } finally {
      clearInterval(interval);
      setLoading(false);
      clearInterval(timerInterval);
    }
  };

  const generatePlan = () => generatePlanWithScheduled();

  const swapMeal = async (dayName: string, style?: string, protein?: string) => {
    setSwapping(dayName);
    setSwapMenuDay(null);
    try {
      const res = await fetch("/api/mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prefs, swapDay: dayName, currentPlan: mealPlan, swapStyle: style || swapStyle, swapProtein: protein || swapProtein }),
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

  const downloadCalendar = () => {
    if (!mealPlan) return;
    const lines = mealPlan.split("\n");
    const events: string[] = [];
    // Find the Monday of next week as the starting date
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon...
    const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilMonday);

    const dayOffsets: Record<string,number> = {
      Monday:0, Tuesday:1, Wednesday:2, Thursday:3, Friday:4, Saturday:5, Sunday:6
    };

    let currentDay = "";
    let mealTitle = "";

    lines.forEach(line => {
      if (line.startsWith("## ") && !line.includes("SHOPPING")) {
        currentDay = line.replace("## ","").trim();
        mealTitle = "";
      } else if (currentDay && mealTitle === "" && line.includes("|")) {
        mealTitle = line.split("|")[0].trim();
      }
      // When we have both day and title, create the event
      if (currentDay && mealTitle) {
        const offset = dayOffsets[currentDay];
        if (offset !== undefined) {
          const eventDate = new Date(nextMonday);
          eventDate.setDate(nextMonday.getDate() + offset);

          const pad = (n: number) => String(n).padStart(2,"0");
          const dateStr = `${eventDate.getFullYear()}${pad(eventDate.getMonth()+1)}${pad(eventDate.getDate())}`;
          const startTime = `${dateStr}T183000`; // 6:30pm
          const endTime = `${dateStr}T200000`;   // 8:00pm
          const uid = `sevendinners-${dateStr}@sevendinners.co.uk`;
          const stamp = new Date().toISOString().replace(/[-:]/g,"").split(".")[0]+"Z";

          events.push([
            "BEGIN:VEVENT",
            `UID:${uid}`,
            `DTSTAMP:${stamp}`,
            `DTSTART:${startTime}`,
            `DTEND:${endTime}`,
            `SUMMARY:🍽️ ${mealTitle}`,
            `DESCRIPTION:Seven Dinners weekly meal plan\nwww.sevendinners.co.uk`,
            `CATEGORIES:Seven Dinners`,
            "END:VEVENT",
          ].join("\r\n"));
        }
        currentDay = "";
        mealTitle = "";
      }
    });

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Seven Dinners//Meal Planner//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:Seven Dinners",
      "X-WR-TIMEZONE:Europe/London",
      ...events,
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "seven-dinners-meal-plan.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📅 Calendar file downloaded!");
    trackEvent("calendar_downloaded");
  };

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

  const formatMacroValue = (macroStr: string, divideBy: number) => {
    const match = macroStr.match(/^([^:]+):\s*(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return macroStr;
    const [, label, num, unit] = match;
    return `${label.trim()}: ${Math.round(parseFloat(num) / divideBy)}${unit.trim()}`;
  };

  const scaleIngredient = (line: string, multiplier: number): string => {
    if (multiplier === 1) return line;
    return line.replace(/\((\d+(?:\.\d+)?)\s*(g|kg|ml|l|oz|lb|tsp|tbsp|cups?)\)/gi, (_, num, unit) => {
      const scaled = Math.round(parseFloat(num) * multiplier);
      return `(${scaled}${unit})`;
    }).replace(/\((\d+)\)/g, (_, num) => {
      const scaled = Math.round(parseInt(num) * multiplier);
      return `(${scaled})`;
    });
  };

  const renderDayLines = (lines: string[], servingsMultiplier: number = 1) => {
    const result: React.ReactNode[] = [];
    let olBuffer: React.ReactNode[] = [];
    let olKey = 0;
    const flushOl = () => {
      if (olBuffer.length > 0) { result.push(<ol key={`ol-${olKey++}`} style={{padding:"0 0 0 20px",margin:"4px 0 8px"}}>{olBuffer}</ol>); olBuffer = []; }
    };
    lines.forEach((line, i) => {
      if (line.startsWith("### ")) {
        flushOl();
        result.push(<div key={i} style={{background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:8,padding:"8px 12px",margin:"8px 0 4px"}}><span style={{fontSize:14,fontWeight:700,color:"#14532D"}}>{line.replace("### ","")}</span></div>);
      } else if (line.startsWith("**") && line.endsWith("**")) {
        flushOl();
        result.push(<div key={i} style={{fontSize:12,fontWeight:700,color:"#22C55E",margin:"10px 0 4px",textTransform:"uppercase",letterSpacing:"0.04em"}}>{line.replace(/\*\*/g,"")}</div>);
      } else if (line.includes("Calories:") || line.includes("Protein:") || line.includes("Carbs:") || line.includes("Fat:")) {
        flushOl();
        let macros = line.split("|").map(s => s.trim()).filter(Boolean);
        if (macrosPerPerson && totalPeople > 0) macros = macros.map(m => formatMacroValue(m, totalPeople));
        result.push(
          <div key={i} style={{display:"flex",flexWrap:"wrap",gap:6,margin:"8px 0",alignItems:"center"}}>
            {macros.map((m,j) => <span key={j} style={{fontSize:11,padding:"3px 10px",background:"#F3E8FF",border:"1px solid #D8B4FE",borderRadius:100,color:"#6B21A8",fontWeight:600}}>{m}</span>)}
            <span style={{fontSize:10,color:"#888",fontWeight:500,marginLeft:4}}>{macrosPerPerson ? `per person (÷${totalPeople})` : "total recipe"}</span>
          </div>
        );
      } else if (line.includes("|") && !line.startsWith("-") && !line.startsWith("#")) {
        flushOl();
        const parts = line.split("|").map(s => s.trim()).filter(Boolean);
        result.push(
          <div key={i} style={{display:"flex",flexWrap:"wrap",gap:6,margin:"6px 0 10px"}}>
            {parts.map((p,j) => <span key={j} style={{fontSize:12,padding:"3px 10px",background:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:100,color:"#14532D",fontWeight:500}}>{p}</span>)}
          </div>
        );
      } else if (line.startsWith("- ")) {
        flushOl();
        const scaledLine = servingsMultiplier !== 1 ? scaleIngredient(line.replace("- ",""), servingsMultiplier) : line.replace("- ","");
        result.push(<li key={i} style={{fontSize:14,margin:"3px 0",marginLeft:16,color:"#374151",lineHeight:1.5}}>{scaledLine}</li>);
      } else if (line.match(/^\d+\. /)) {
        olBuffer.push(<li key={i} style={{fontSize:14,margin:"4px 0",color:"#374151",lineHeight:1.55}}>{line.replace(/^\d+\. /,"")}</li>);
      } else if (line.trim()==="") {
        flushOl(); result.push(<div key={i} style={{height:4}}/>);
      } else {
        flushOl();
        result.push(<p key={i} style={{fontSize:14,margin:"3px 0",lineHeight:1.65,color:"#374151"}}>{line}</p>);
      }
    });
    flushOl();
    return result;
  };

  const { days, categories } = step === "plan" && mealPlan ? parseMealPlan(mealPlan) : { days: [], categories: {} };
  const totalItems = Object.values(categories).flat().length;
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const ingredientsList = alreadyHave ? alreadyHave.split(",").map(s => s.trim()).filter(Boolean) : [];
  const scheduledCount = Object.keys(scheduled).length;

  return (
    <div style={{minHeight:"100vh",background:"#F9FAFB",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        *{box-sizing:border-box}
        @media(max-width:640px){
          .swap-popup{position:fixed!important;bottom:0!important;left:0!important;right:0!important;top:auto!important;border-radius:20px 20px 0 0!important;min-width:unset!important;width:100%!important;padding:20px!important}
          .meal-actions{flex-wrap:wrap!important;gap:4px!important}
          .meal-actions button, .meal-actions select{font-size:10px!important;padding:3px 7px!important}
          .two-col{grid-template-columns:1fr!important}
          .nav-buttons{gap:4px!important}
          .nav-buttons button{padding:6px 8px!important;font-size:11px!important}
          .nav-text{display:inline}
          .nav-icon-only{display:none}
          @media(max-width:640px){
            .nav-text{display:none!important}
            .nav-icon-only{display:inline!important}
          }
        }
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .meal-card { break-inside: avoid; page-break-inside: avoid; border: 1px solid #ddd !important; margin-bottom: 16px !important; }
          .shopping-section { break-before: page; }
        }
      `}</style>

      {savedToast && (
        <div className="no-print" style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#14532D",color:"white",padding:"10px 20px",borderRadius:100,fontSize:13,fontWeight:600,zIndex:100,animation:"slideUp 0.3s ease",boxShadow:"0 8px 24px rgba(0,0,0,0.2)"}}>
          {savedToast}
        </div>
      )}

      <nav className="no-print" style={{padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"white",borderBottom:"1px solid #F3F4F6",position:"sticky",top:0,zIndex:10}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
          <Logo size={38}/>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:"#14532D",lineHeight:1,letterSpacing:"-0.3px"}}>Seven</div>
            <div style={{fontSize:16,fontWeight:800,color:"#22C55E",lineHeight:1,letterSpacing:"-0.3px"}}>Dinners</div>
          </div>
        </Link>
        <div style={{display:"flex",gap:8,alignItems:"center"}} className="nav-buttons">
          <button onClick={()=>setShowFavourites(!showFavourites)} style={{background:"#F0FDF4",color:"#14532D",border:"1px solid #BBF7D0",padding:"7px 14px",borderRadius:100,fontSize:12,cursor:"pointer",fontWeight:600}}>
            ⭐ Favourites {favourites.length > 0 && <span style={{background:"#22C55E",color:"white",fontSize:10,fontWeight:700,padding:"1px 6px",borderRadius:100,marginLeft:4}}>{favourites.length}</span>}
          </button>
          {step==="plan" && <button onClick={handlePrint} style={{background:"#F0FDF4",color:"#14532D",border:"1px solid #BBF7D0",padding:"7px 14px",borderRadius:100,fontSize:12,cursor:"pointer",fontWeight:600}}>🖨️ PDF</button>}
          {step==="plan" && <button onClick={downloadCalendar} style={{background:"#EFF6FF",color:"#1D4ED8",border:"1px solid #BFDBFE",padding:"7px 14px",borderRadius:100,fontSize:12,cursor:"pointer",fontWeight:600}}>📅 Calendar</button>}
          {step==="plan" && <button onClick={()=>setStep("prefs")} style={{background:"white",color:"#6B7280",border:"1px solid #E5E7EB",padding:"7px 14px",borderRadius:100,fontSize:12,cursor:"pointer",fontWeight:500}}>← edit</button>}
          <Link href="/feedback" style={{background:"white",color:"#22C55E",border:"1px solid #BBF7D0",padding:"7px 14px",borderRadius:100,fontSize:12,cursor:"pointer",fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>
            💬<span className="nav-text" style={{marginLeft:4}}>Feedback</span>
          </Link>
          {isSignedIn ? (
            <Link href="/account" style={{background:"#22C55E",color:"white",border:"none",padding:"7px 14px",borderRadius:100,fontSize:12,cursor:"pointer",fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>
              {user?.imageUrl && <img src={user.imageUrl} alt="" style={{width:20,height:20,borderRadius:"50%"}}/>}
              Account
            </Link>
          ) : (
            <Link href="/sign-in" style={{background:"white",color:"#22C55E",border:"1px solid #BBF7D0",padding:"7px 14px",borderRadius:100,fontSize:12,fontWeight:600,textDecoration:"none"}}>Log in</Link>
          )}
        </div>
      </nav>

      {showFavourites && (
        <div className="no-print" style={{background:"white",borderBottom:"3px solid #F0FDF4",padding:"20px 24px",maxHeight:"60vh",overflowY:"auto"}}>
          <div style={{maxWidth:680,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
              <div>
                <div style={{fontSize:18,fontWeight:800,color:"#14532D"}}>⭐ Your favourite recipes</div>
                <div style={{fontSize:12,color:"#888"}}>{favourites.length} saved · {scheduledCount} scheduled for next plan</div>
              </div>
              <button onClick={()=>setShowFavourites(false)} style={{padding:"6px 14px",fontSize:12,borderRadius:100,border:"1px solid #E5E7EB",background:"white",color:"#22C55E",cursor:"pointer",fontWeight:600}}>close</button>
            </div>

            {favourites.length === 0 && (
              <div style={{textAlign:"center",padding:"30px 20px",background:"#F0FDF4",borderRadius:14,border:"2px dashed #BBF7D0"}}>
                <div style={{fontSize:36,marginBottom:8}}>⭐</div>
                <div style={{fontSize:14,fontWeight:600,color:"#14532D"}}>No favourites yet</div>
                <div style={{fontSize:12,color:"#888",marginTop:4}}>Click the ⭐ icon on any meal to save it</div>
              </div>
            )}

            {favourites.length > 0 && (
              <>
                {scheduledCount > 0 && (
                  <div style={{background:"#FAF5FF",borderRadius:12,padding:"12px 14px",marginBottom:14,border:"1px solid #D8B4FE"}}>
                    <div style={{fontSize:12,fontWeight:700,color:"#6B21A8",marginBottom:8}}>📅 SCHEDULED FOR NEXT PLAN</div>
                    <div style={{display:"flex",flexDirection:"column",gap:6}}>
                      {Object.entries(scheduled).map(([day, favId]) => {
                        const fav = favourites.find(f => f.id === favId);
                        if (!fav) return null;
                        return (
                          <div key={day} style={{display:"flex",alignItems:"center",gap:8,background:"white",padding:"7px 12px",borderRadius:8}}>
                            <span style={{background:(DAY_STYLES as any)[day]?.bg||"#22C55E",color:"white",fontSize:10,fontWeight:700,padding:"3px 8px",borderRadius:6,minWidth:32,textAlign:"center"}}>{SHORT_DAYS[day]}</span>
                            <span style={{fontSize:13,flex:1,color:"#333",fontWeight:500}}>{fav.name}</span>
                            <button onClick={()=>unscheduleDay(day)} style={{padding:"3px 8px",fontSize:11,borderRadius:100,border:"1px solid #E5E7EB",background:"white",color:"#888",cursor:"pointer"}}>remove</button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {favourites.map(fav => {
                    const scheduledDay = Object.entries(scheduled).find(([_, id]) => id === fav.id)?.[0];
                    return (
                      <div key={fav.id} style={{background:"white",border:"1px solid #E5E7EB",borderRadius:12,padding:"12px 14px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                          <div style={{flex:1,minWidth:0}}>
                            <div style={{fontSize:14,fontWeight:700,color:"#14532D"}}>{fav.name}</div>
                            <div style={{fontSize:11,color:"#888",marginTop:2}}>Saved {new Date(fav.savedAt).toLocaleDateString("en-GB")}</div>
                          </div>
                          <div style={{display:"flex",gap:6,alignItems:"center"}}>
                            {scheduledDay ? (
                              <span style={{background:"#FAF5FF",color:"#6B21A8",fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:100}}>📅 {scheduledDay}</span>
                            ) : (
                              <select onChange={(e)=>{if(e.target.value)scheduleFavourite(fav.id, e.target.value)}} value="" style={{fontSize:11,padding:"4px 8px",borderRadius:100,border:"1px solid #D8B4FE",background:"#FAF5FF",color:"#6B21A8",cursor:"pointer",fontWeight:600}}>
                                <option value="">📅 schedule for...</option>
                                {DAYS_OF_WEEK.filter(d => !scheduled[d]).map(d => <option key={d} value={d}>{d}</option>)}
                              </select>
                            )}
                            <button onClick={()=>removeFavourite(fav.id)} style={{padding:"4px 8px",fontSize:11,borderRadius:100,border:"1px solid #FECACA",background:"white",color:"#DC2626",cursor:"pointer"}}>🗑️</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="print-only" style={{display:"none",padding:"20px 40px 10px",borderBottom:"3px solid #22C55E"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <Logo/>
          <div>
            <div style={{fontSize:22,fontWeight:800,color:"#14532D"}}>Seven Dinners</div>
            <div style={{fontSize:13,color:"#666"}}>Weekly meal plan · {new Date().toLocaleDateString("en-GB", {weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
          </div>
        </div>
      </div>

      <div style={{background:"linear-gradient(135deg,#F0FDF4 0%,#DCFCE7 100%)",padding:"24px 24px 44px",position:"relative",overflow:"hidden"}} className="no-print">
        <div style={{position:"absolute",top:-20,right:-30,width:140,height:140,background:"rgba(34,197,94,0.1)",borderRadius:"50%"}}/>
        <div style={{position:"absolute",bottom:-40,left:-20,width:100,height:100,background:"rgba(168,85,247,0.08)",borderRadius:"50%"}}/>
        <div style={{position:"relative",zIndex:1,maxWidth:680,margin:"0 auto"}}>
          <h1 style={{color:"#14532D",fontSize:34,fontWeight:800,lineHeight:1.1,letterSpacing:"-1px",margin:"0 0 8px"}}>
            {step==="prefs" ? <>Healthy eating<br/><span style={{color:"#22C55E"}}>made simple</span> <span style={{color:"#A855F7",fontSize:24}}>♡</span></> : <>Your seven dinners<br/><span style={{color:"#22C55E"}}>are ready! 🎉</span></>}
          </h1>
          <div style={{color:"#4B5563",fontSize:14,fontWeight:500,marginTop:8}}>
            {step==="prefs"?"AI meal planning, smart shopping lists and delicious recipes":`${prefs.adults} adult${prefs.adults!==1?"s":""} · ${prefs.children} child${prefs.children!==1?"ren":""} · max ${prefs.cookingTime} · ${prefs.budget} budget`}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:14}}>
            <span style={{background:"white",color:"#14532D",fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:100,border:"1px solid #BBF7D0"}}>🥗 Healthy food</span>
            <span style={{background:"white",color:"#14532D",fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:100,border:"1px solid #BBF7D0"}}>👩‍🍳 Cook from scratch</span>
            <span style={{background:"white",color:"#14532D",fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:100,border:"1px solid #BBF7D0"}}>🚫 No UPF</span>
          </div>
          {step==="plan" && (
            <div style={{marginTop:14,background:"white",borderRadius:12,padding:"10px 16px",border:"1px solid #BBF7D0",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:20}}>🛒</span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"#14532D"}}>Your shopping list is ready!</div>
                <div style={{fontSize:11,color:"#4B5563"}}>Scroll to the bottom of this page to see all your ingredients with supermarket links.</div>
              </div>
              <a href="#shopping" style={{marginLeft:"auto",fontSize:12,fontWeight:700,color:"#22C55E",textDecoration:"none",whiteSpace:"nowrap",flexShrink:0}}>jump down ↓</a>
            </div>
          )}
        </div>
      </div>

      <div style={{maxWidth:680,margin:"-20px auto 0",padding:"0 16px 48px",position:"relative",zIndex:1}}>

        {step==="prefs" && !loading && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>

            {scheduledCount > 0 && (
              <div style={{background:"linear-gradient(135deg,#FAF5FF 0%,#F3E8FF 100%)",borderRadius:14,padding:"12px 14px",border:"2px solid #A855F7"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{fontSize:18}}>📅</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#6B21A8"}}>{scheduledCount} favourite{scheduledCount!==1?"s":""} scheduled for this plan</div>
                    <div style={{fontSize:11,color:"#A855F7"}}>We'll plan around these and fill the other days with new recipes</div>
                  </div>
                  <button onClick={()=>setShowFavourites(true)} style={{padding:"5px 10px",fontSize:11,borderRadius:100,border:"none",background:"#A855F7",color:"white",cursor:"pointer",fontWeight:600}}>manage</button>
                </div>
              </div>
            )}

            <div style={{background:"linear-gradient(135deg,#FEF3C7 0%,#FED7AA 100%)",borderRadius:16,padding:"16px",border:"2px solid #F59E0B",boxShadow:"0 4px 20px rgba(245,158,11,0.15)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{fontSize:24}}>📸</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:800,color:"#92400E",letterSpacing:"-0.3px"}}>📸 Snap your fridge or cupboard</div>
                  <div style={{fontSize:12,color:"#B45309",marginTop:2,fontWeight:500}}>The magic AI feature everyone is talking about ✨</div>
                </div>
                <span style={{background:"linear-gradient(135deg,#F59E0B,#EF4444)",color:"white",fontSize:10,fontWeight:800,padding:"4px 10px",borderRadius:100,letterSpacing:"0.03em"}}>✨ AI MAGIC</span>
              </div>

              {/* Big upload zone - shown when no photos yet */}
              {fridgePhotos.length === 0 && (
                <label style={{display:"block",width:"100%",padding:"20px 16px",background:"white",border:"3px dashed #F59E0B",borderRadius:14,textAlign:"center",cursor:"pointer",marginBottom:12,transition:"background 0.2s"}}>
                  <div style={{fontSize:40,marginBottom:8}}>📷</div>
                  <div style={{fontSize:15,fontWeight:800,color:"#92400E",marginBottom:4}}>Tap here to photo your fridge</div>
                  <div style={{fontSize:12,color:"#B45309",fontWeight:500}}>Take a photo or upload from your camera roll</div>
                  <div style={{fontSize:11,color:"#D97706",marginTop:6,opacity:0.8}}>JPG · PNG · HEIC supported · up to 3 photos</div>
                  <input type="file" accept="image/*,.heic,.heif" multiple onChange={handlePhotoUpload} style={{display:"none"}}/>
                </label>
              )}

              {/* Photos preview + add more */}
              {fridgePhotos.length > 0 && (
                <div style={{marginBottom:12}}>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
                    {fridgePhotos.map((photo, idx) => (
                      <div key={idx} style={{position:"relative",width:72,height:72,borderRadius:10,overflow:"hidden",border:"2px solid white",boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>
                        <img src={photo.preview} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                        <button onClick={()=>{setFridgePhotos(prev=>prev.filter((_,i)=>i!==idx));setAlreadyHave("")}} style={{position:"absolute",top:2,right:2,width:20,height:20,borderRadius:"50%",border:"none",background:"rgba(0,0,0,0.7)",color:"white",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
                      </div>
                    ))}
                    {fridgePhotos.length < 3 && (
                      <label style={{width:72,height:72,borderRadius:10,border:"2px dashed #F59E0B",background:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:11,color:"#B45309",fontWeight:600,gap:2}}>
                        <span style={{fontSize:20}}>➕</span>
                        <span>Add</span>
                        <input type="file" accept="image/*,.heic,.heif" multiple onChange={handlePhotoUpload} style={{display:"none"}}/>
                      </label>
                    )}
                  </div>
                  {!alreadyHave && (
                    <button onClick={analyseFridge} disabled={analysing} style={{width:"100%",padding:"12px",background:"linear-gradient(135deg,#F59E0B,#F97316)",color:"white",border:"none",borderRadius:10,fontSize:14,cursor:"pointer",fontWeight:800,opacity:analysing?0.7:1,boxShadow:"0 4px 12px rgba(245,158,11,0.4)"}}>
                      {analysing ? "🔍 AI is scanning your fridge..." : "✨ Scan with AI"}
                    </button>
                  )}
                </div>
              )}

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:4}}>
                {[
                  { icon:"🍳", title:"Cook right now", desc:"Get a recipe in seconds" },
                  { icon:"♻️", title:"Reduce waste", desc:"Use up ingredients before they go off" },
                  { icon:"🛒", title:"Skip what you have", desc:"Won't appear on your shopping list" },
                ].map((item,i) => (
                  <div key={i} style={{background:"white",borderRadius:10,padding:"10px 8px",textAlign:"center",border:"1px solid #FCD34D"}}>
                    <div style={{fontSize:20,marginBottom:4}}>{item.icon}</div>
                    <div style={{fontSize:11,fontWeight:700,color:"#92400E",marginBottom:3,lineHeight:1.2}}>{item.title}</div>
                    <div style={{fontSize:10,color:"#B45309",lineHeight:1.3}}>{item.desc}</div>
                  </div>
                ))}
              </div>

              {alreadyHave && (
                <div style={{marginTop:10,padding:"12px 14px",background:"white",borderRadius:12,border:"1px solid #FCD34D"}}>
                  <div style={{fontSize:12,fontWeight:700,color:"#92400E",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span>✅ AI found {ingredientsList.length} ingredients in your fridge!</span>
                    <button onClick={()=>{setAlreadyHave("");setFridgePhotos([])}} style={{background:"none",border:"none",color:"#aaa",fontSize:11,cursor:"pointer"}}>clear</button>
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
                    {ingredientsList.slice(0,15).map((ing, i) => <span key={i} style={{fontSize:11,padding:"3px 9px",background:"#FEF3C7",borderRadius:100,color:"#92400E",fontWeight:500}}>{ing}</span>)}
                    {ingredientsList.length > 15 && <span style={{fontSize:11,padding:"3px 9px",color:"#888"}}>+ {ingredientsList.length - 15} more</span>}
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <button onClick={generateFridgeRecipe} disabled={generatingFridgeRecipe} style={{padding:"11px",background:"linear-gradient(135deg,#16A34A,#22C55E)",color:"white",border:"none",borderRadius:10,fontSize:13,fontWeight:800,cursor:"pointer",opacity:generatingFridgeRecipe?0.6:1,boxShadow:"0 4px 12px rgba(22,163,74,0.3)"}}>
                      {generatingFridgeRecipe ? "🍳 Creating your recipe..." : "🍳 Cook from my fridge now!"}
                    </button>
                    <button onClick={generatePlan} style={{padding:"11px",background:"white",color:"#92400E",border:"2px solid #FCD34D",borderRadius:10,fontSize:13,fontWeight:700,cursor:"pointer"}}>
                      📅 Plan my week instead
                    </button>
                  </div>
                  <div style={{marginTop:8,fontSize:11,color:"#B45309",textAlign:"center",fontWeight:500}}>
                    ♻️ Reducing food waste · 🛒 These won't appear on your shopping list
                  </div>
                </div>
              )}
            </div>

            {fridgeRecipe && (
              <div style={{background:"white",borderRadius:16,border:"2px solid #16A34A",overflow:"hidden",boxShadow:"0 4px 20px rgba(22,163,74,0.15)"}}>
                <div style={{background:"linear-gradient(135deg,#16A34A,#22C55E)",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <div style={{color:"white",fontSize:15,fontWeight:800}}>🍳 Your fridge recipe is ready!</div>
                    <div style={{color:"#BBF7D0",fontSize:12,marginTop:2}}>Made from what you already have · zero food waste</div>
                  </div>
                  <button onClick={()=>{setFridgeRecipe("");setFridgeRecipeAdded(false);setFridgeRecipeDay("");}} style={{background:"rgba(255,255,255,0.2)",border:"none",color:"white",borderRadius:100,padding:"5px 12px",fontSize:11,cursor:"pointer",fontWeight:600}}>✕ close</button>
                </div>

                <div style={{padding:"16px",fontSize:14,lineHeight:1.7,color:"#374151",whiteSpace:"pre-wrap",borderBottom:"1px solid #F0FDF4"}}>{fridgeRecipe}</div>

                <div style={{padding:"14px 16px",background:"#F0FDF4"}}>
                  {fridgeRecipeAdded ? (
                    <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",background:"white",borderRadius:12,border:"2px solid #22C55E"}}>
                      <span style={{fontSize:24}}>🎉</span>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,fontWeight:700,color:"#14532D"}}>Added to your {fridgeRecipeDay} meal plan!</div>
                        <div style={{fontSize:11,color:"#4B5563",marginTop:2}}>It's saved to your favourites and scheduled. Generate your plan below to see it in the week.</div>
                      </div>
                      <button onClick={()=>{
                        // Read latest from localStorage to avoid stale state
                        try {
                          const favs = JSON.parse(localStorage.getItem("sevendinners_favourites")||"[]");
                          const sched = JSON.parse(localStorage.getItem("sevendinners_scheduled")||"{}");
                          generatePlanWithScheduled(sched, favs);
                        } catch(e) { generatePlan(); }
                      }} style={{padding:"8px 14px",background:"#22C55E",color:"white",border:"none",borderRadius:10,fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>Generate plan →</button>
                    </div>
                  ) : (
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:"#14532D",marginBottom:10,display:"flex",alignItems:"center",gap:6}}>
                        <span style={{fontSize:16}}>📅</span>
                        Add this recipe to your weekly meal planner
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginBottom:8}}>
                        {DAYS_OF_WEEK.map(day => {
                          const isScheduled = scheduled[day];
                          return (
                            <button key={day} onClick={()=>addFridgeRecipeToPlanner(day)} disabled={!!isScheduled} style={{padding:"8px 4px",borderRadius:10,border:"2px solid",borderColor:isScheduled?"#E5E7EB":"#22C55E",background:isScheduled?"#F9FAFB":"white",color:isScheduled?"#aaa":"#14532D",fontSize:11,fontWeight:700,cursor:isScheduled?"not-allowed":"pointer",textAlign:"center",opacity:isScheduled?0.5:1}}>
                              <div style={{fontSize:16,marginBottom:2}}>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][DAYS_OF_WEEK.indexOf(day)]}</div>
                              {isScheduled ? <div style={{fontSize:9,color:"#aaa"}}>taken</div> : <div style={{fontSize:9,color:"#22C55E"}}>+ add</div>}
                            </button>
                          );
                        })}
                      </div>
                      <div style={{fontSize:11,color:"#4B5563",textAlign:"center"}}>
                        Tap a day to add this recipe to that day's slot in your next plan
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {["adults","children"].map((key)=>(
                <div key={key} style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:"1px solid #E5E7EB"}}>
                  <div style={{fontSize:11,color:"#22C55E",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>{key==="adults"?"👨‍👩 Adults":"👧👦 Children"}</div>
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    <button onClick={()=>setPrefs((p)=>({...p,[key]:Math.max(key==="children"?0:1,(p as any)[key]-1)}))} style={{width:32,height:32,borderRadius:"50%",border:"2px solid #BBF7D0",background:"#F0FDF4",cursor:"pointer",fontSize:18,color:"#22C55E",fontWeight:700}}>−</button>
                    <span style={{fontSize:26,fontWeight:700,color:"#14532D",minWidth:24,textAlign:"center"}}>{(prefs as any)[key]}</span>
                    <button onClick={()=>setPrefs((p)=>({...p,[key]:(p as any)[key]+1}))} style={{width:32,height:32,borderRadius:"50%",border:"2px solid #BBF7D0",background:"#F0FDF4",cursor:"pointer",fontSize:18,color:"#22C55E",fontWeight:700}}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:"1px solid #E5E7EB"}}>
              <div style={{fontSize:11,color:"#22C55E",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>🎯 Meal goal</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {MEAL_GOALS.map(g => (
                  <button key={g.id} onClick={()=>setPrefs(p=>({...p,mealGoal:g.id}))} style={{padding:"10px 8px",borderRadius:10,fontSize:11,border:"2px solid",cursor:"pointer",textAlign:"center",background:prefs.mealGoal===g.id?g.bg:"white",borderColor:prefs.mealGoal===g.id?g.color:"#E5E7EB",fontWeight:prefs.mealGoal===g.id?700:500,transition:"all 0.15s"}}>
                    <div style={{fontSize:18,marginBottom:3}}>{g.label.split(" ")[0]}</div>
                    <div style={{color:prefs.mealGoal===g.id?g.color:"#374151",fontSize:11,fontWeight:600,lineHeight:1.2}}>{g.label.split(" ").slice(1).join(" ")}</div>
                    <div style={{fontSize:10,color:"#888",marginTop:2,fontWeight:400}}>{g.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:"1px solid #E5E7EB"}}>
              <div style={{fontSize:11,color:"#22C55E",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>🍳 Cooking style</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {COOKING_STYLES.map(cs => (
                  <button key={cs.id} onClick={()=>setPrefs(p=>({...p,cookingStyle:cs.id}))} style={{padding:"10px 12px",borderRadius:10,fontSize:12,border:"2px solid",cursor:"pointer",textAlign:"left",background:prefs.cookingStyle===cs.id?"#F0FDF4":"white",borderColor:prefs.cookingStyle===cs.id?"#22C55E":"#E5E7EB",fontWeight:prefs.cookingStyle===cs.id?700:500}}>
                    <div style={{color:prefs.cookingStyle===cs.id?"#14532D":"#374151"}}>{prefs.cookingStyle===cs.id?"✓ ":""}{cs.label}</div>
                    <div style={{fontSize:10,color:"#888",fontWeight:400,marginTop:2}}>{cs.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:"1px solid #E5E7EB"}}>
              <div style={{fontSize:11,color:"#22C55E",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>❤️ Foods we love</div>
              <textarea value={prefs.likes} onChange={(e)=>setPrefs((p)=>({...p,likes:e.target.value}))} rows={2} style={{width:"100%",fontSize:13,padding:"10px 12px",border:"2px solid #E5E7EB",borderRadius:10,resize:"vertical",boxSizing:"border-box",fontFamily:"inherit",color:"#333",background:"#F9FAFB",outline:"none"}}/>
              <div style={{fontSize:11,color:"#888",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",margin:"12px 0 8px"}}>🚫 Foods to avoid</div>
              <textarea value={prefs.dislikes} onChange={(e)=>setPrefs((p)=>({...p,dislikes:e.target.value}))} rows={2} style={{width:"100%",fontSize:13,padding:"10px 12px",border:"2px solid #E5E7EB",borderRadius:10,resize:"vertical",boxSizing:"border-box",fontFamily:"inherit",color:"#333",background:"#F9FAFB",outline:"none"}}/>
            </div>

            <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:"1px solid #E5E7EB"}}>
              <div style={{fontSize:11,color:"#22C55E",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>🥗 Dietary requirements</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {DIETARY_OPTIONS.map((opt)=>(
                  <button key={opt} onClick={()=>toggleDietary(opt)} style={{padding:"6px 14px",borderRadius:100,fontSize:12,border:"2px solid",cursor:"pointer",background:prefs.dietary.includes(opt)?"#22C55E":"white",borderColor:prefs.dietary.includes(opt)?"#22C55E":"#E5E7EB",color:prefs.dietary.includes(opt)?"white":"#888",fontWeight:prefs.dietary.includes(opt)?700:400}}>
                    {prefs.dietary.includes(opt)?"✓ ":""}{opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:"1px solid #E5E7EB"}}>
                <div style={{fontSize:11,color:"#22C55E",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>⏱️ Max time</div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {TIME_OPTIONS.map((t)=>(
                    <button key={t} onClick={()=>setPrefs((p)=>({...p,cookingTime:t}))} style={{padding:"7px 10px",borderRadius:8,fontSize:12,border:"2px solid",cursor:"pointer",textAlign:"left",background:prefs.cookingTime===t?"#F0FDF4":"white",borderColor:prefs.cookingTime===t?"#22C55E":"#E5E7EB",color:prefs.cookingTime===t?"#14532D":"#666",fontWeight:prefs.cookingTime===t?700:400}}>
                      {prefs.cookingTime===t?"✓ ":""}{t}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{background:"white",borderRadius:16,padding:"16px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:"1px solid #E5E7EB"}}>
                <div style={{fontSize:11,color:"#22C55E",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:10}}>💰 Budget</div>
                <div style={{display:"flex",flexDirection:"column",gap:5}}>
                  {BUDGET_OPTIONS.map((b)=>(
                    <button key={b} onClick={()=>setPrefs((p)=>({...p,budget:b}))} style={{padding:"7px 10px",borderRadius:8,fontSize:12,border:"2px solid",cursor:"pointer",textAlign:"left",background:prefs.budget===b?"#F0FDF4":"white",borderColor:prefs.budget===b?"#22C55E":"#E5E7EB",color:prefs.budget===b?"#14532D":"#666",fontWeight:prefs.budget===b?700:400}}>
                      {prefs.budget===b?"✓ ":""}{b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <div style={{background:"#FEF2F2",border:"2px solid #FECACA",borderRadius:12,padding:"12px 16px",color:"#DC2626",fontSize:13,fontWeight:500}}>{error}</div>}

            <button onClick={generatePlan} style={{width:"100%",padding:"16px",fontSize:16,fontWeight:700,background:"#22C55E",color:"white",border:"none",borderRadius:14,cursor:"pointer",boxShadow:"0 6px 20px rgba(34,197,94,0.4)"}}>
              Plan my seven dinners →
            </button>
          </div>
        )}

        {loading && (
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"60px 24px",gap:16}}>
            <div style={{fontSize:48,animation:"bounce 1s infinite"}}>🍽️</div>
            <div style={{position:"relative",width:48,height:48}}>
              <div style={{position:"absolute",inset:0,border:"3px solid #BBF7D0",borderRadius:"50%"}}/>
              <div style={{position:"absolute",inset:0,border:"3px solid transparent",borderTopColor:"#22C55E",borderRadius:"50%",animation:"spin 0.9s linear infinite"}}/>
            </div>
            <p style={{color:"#22C55E",fontSize:15,fontWeight:700,textAlign:"center"}}>{loadingMsg}</p>
            <div style={{display:"flex",alignItems:"center",gap:8,background:"#F0FDF4",padding:"10px 20px",borderRadius:100,border:"1px solid #BBF7D0"}}>
              <span style={{fontSize:13,color:"#6B7280"}}>⏱️</span>
              <span style={{fontSize:13,color:"#4B5563",fontWeight:500}}>{loadingSeconds}s elapsed</span>
            </div>
            <p style={{fontSize:13,color:"#9CA3AF",textAlign:"center",maxWidth:260,lineHeight:1.5,margin:0}}>
              Meal plan generation can take up to 2 minutes — but it&apos;s worth the wait! 🌟
            </p>
          </div>
        )}

        {step==="plan" && !loading && mealPlan && (
          <div>
            <div style={{background:"white",borderRadius:16,padding:"20px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",border:"1px solid #E5E7EB"}}>
              <div className="no-print" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,gap:8,flexWrap:"wrap"}}>
                <div style={{fontSize:15,fontWeight:700,color:"#14532D"}}>This week's seven dinners</div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={handlePrint} style={{fontSize:12,padding:"7px 14px",borderRadius:100,border:"2px solid #22C55E",background:"#F0FDF4",color:"#22C55E",cursor:"pointer",fontWeight:600}}>🖨️ PDF</button>
                  <button onClick={downloadCalendar} style={{fontSize:12,padding:"7px 14px",borderRadius:100,border:"2px solid #BFDBFE",background:"#EFF6FF",color:"#1D4ED8",cursor:"pointer",fontWeight:600}}>📅 Add to Calendar</button>
                  <button onClick={generatePlan} style={{fontSize:12,padding:"7px 14px",borderRadius:100,border:"2px solid #E5E7EB",background:"white",color:"#22C55E",cursor:"pointer",fontWeight:600}}>↻ new plan</button>
                </div>
              </div>

              <div className="no-print" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",background:"linear-gradient(135deg,#FAF5FF 0%,#F3E8FF 100%)",borderRadius:10,marginBottom:14,border:"1px solid #D8B4FE"}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:16}}>📊</span>
                  <div>
                    <div style={{fontSize:12,fontWeight:700,color:"#6B21A8"}}>Show macros</div>
                    <div style={{fontSize:10,color:"#A855F7"}}>{macrosPerPerson ? `÷ ${totalPeople} people` : "total recipe"}</div>
                  </div>
                </div>
                <div style={{display:"flex",background:"white",borderRadius:100,padding:3,border:"1px solid #D8B4FE"}}>
                  <button onClick={()=>setMacrosPerPerson(false)} style={{padding:"4px 12px",borderRadius:100,fontSize:11,fontWeight:700,border:"none",background:!macrosPerPerson?"#A855F7":"transparent",color:!macrosPerPerson?"white":"#A855F7",cursor:"pointer"}}>Total</button>
                  <button onClick={()=>setMacrosPerPerson(true)} style={{padding:"4px 12px",borderRadius:100,fontSize:11,fontWeight:700,border:"none",background:macrosPerPerson?"#A855F7":"transparent",color:macrosPerPerson?"white":"#A855F7",cursor:"pointer"}}>Per person</button>
                </div>
              </div>

              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {days.map((day, idx) => {
                  const dayKey = Object.keys(DAY_STYLES).find(d => day.name.includes(d));
                  const ds = dayKey ? (DAY_STYLES as any)[dayKey] : { bg:"#22C55E" };
                  const shortDay = dayKey ? SHORT_DAYS[dayKey] : day.name.slice(0,3).toUpperCase();
                  const isDeleted = deletedDays[day.name];
                  const isSwapping = swapping === day.name;
                  const mealNameLine = day.lines.find(l => l.includes("|"));
                  const mealName = mealNameLine ? mealNameLine.split("|")[0].trim() : "";
                  const isFavourited = favourites.some(f => f.name === mealName);
                  return (
                    <div key={idx} className="meal-card" style={{border:"1px solid #E5E7EB",borderRadius:14,overflow:"hidden",background:"white"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#F9FAFB",borderBottom:"1px solid #E5E7EB"}}>
                        <div style={{background:ds.bg,color:"white",borderRadius:8,padding:"4px 10px",fontSize:11,fontWeight:700,minWidth:34,textAlign:"center"}}>{shortDay}</div>
                        <div style={{flex:1,fontSize:14,fontWeight:600,color:"#14532D"}}>{day.name}</div>
                        <div className="no-print meal-actions" style={{display:"flex",gap:6}}>
                          <button onClick={()=>saveFavourite(day.name, day.lines)} disabled={isFavourited} title={isFavourited?"Already saved":"Save to favourites"} style={{fontSize:11,padding:"4px 10px",borderRadius:100,border:"1px solid #E5E7EB",background:isFavourited?"#F0FDF4":"white",color:isFavourited?"#22C55E":"#888",cursor:isFavourited?"default":"pointer",fontWeight:600}}>
                            {isFavourited?"⭐":"☆"} {isFavourited?"saved":"save"}
                          </button>
                          <div style={{position:"relative"}}>
                            <button onClick={()=>setSwapMenuDay(swapMenuDay===day.name?null:day.name)} disabled={isSwapping} style={{fontSize:11,padding:"4px 10px",borderRadius:100,border:"1px solid #E5E7EB",background:swapMenuDay===day.name?"#F0FDF4":"white",color:"#22C55E",cursor:"pointer",fontWeight:600,opacity:isSwapping?0.5:1}}>
                              {isSwapping?"⏳ swapping...":"↻ swap ▾"}
                            </button>
                            {swapMenuDay===day.name && (
                              <div className="swap-popup" style={{position:"absolute",top:"calc(100% + 6px)",right:0,background:"white",border:"1px solid #E5E7EB",borderRadius:14,padding:14,zIndex:50,minWidth:220,boxShadow:"0 8px 24px rgba(0,0,0,0.12)"}}>
                                <div style={{fontSize:11,fontWeight:700,color:"#14532D",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>🍳 Cooking style</div>
                                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
                                  {[["any","🍳 Any"],["slowcooker","🍲 Slow cooker"],["airfryer","♨️ Air fryer"],["onepot","🥘 One pot"]].map(([val,label])=>(
                                    <button key={val} onClick={()=>setSwapStyle(val)} style={{fontSize:11,padding:"4px 10px",borderRadius:100,border:"1px solid",borderColor:swapStyle===val?"#22C55E":"#E5E7EB",background:swapStyle===val?"#F0FDF4":"white",color:swapStyle===val?"#14532D":"#666",cursor:"pointer",fontWeight:swapStyle===val?700:400}}>{label}</button>
                                  ))}
                                </div>
                                <div style={{fontSize:11,fontWeight:700,color:"#14532D",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>🥩 Protein / type</div>
                                <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
                                  {[["any","🍽️ Any"],["vegetarian","🥗 Vegetarian"],["chicken","🍗 Chicken"],["beef","🥩 Beef"],["salmon","🐟 Salmon"],["pasta","🍝 Pasta"]].map(([val,label])=>(
                                    <button key={val} onClick={()=>setSwapProtein(val)} style={{fontSize:11,padding:"4px 10px",borderRadius:100,border:"1px solid",borderColor:swapProtein===val?"#22C55E":"#E5E7EB",background:swapProtein===val?"#F0FDF4":"white",color:swapProtein===val?"#14532D":"#666",cursor:"pointer",fontWeight:swapProtein===val?700:400}}>{label}</button>
                                  ))}
                                </div>
                                <button onClick={()=>swapMeal(day.name, swapStyle, swapProtein)} style={{width:"100%",padding:"9px",fontSize:13,fontWeight:700,background:"#22C55E",color:"white",border:"none",borderRadius:10,cursor:"pointer"}}>
                                  ↻ Swap this meal
                                </button>
                              </div>
                            )}
                          </div>
                          <select onChange={(e)=>{if(e.target.value)setDeletedDays(p=>({...p,[day.name]:e.target.value}))}} value={isDeleted||""} style={{fontSize:11,padding:"4px 10px",borderRadius:100,border:"1px solid #E5E7EB",background:"white",color:"#888",cursor:"pointer"}}>
                            <option value="">🗑️ replace</option>
                            {REPLACE_OPTIONS.map(o=><option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      </div>
                      {isDeleted ? (
                        <div style={{padding:"20px",textAlign:"center"}}>
                          <div style={{fontSize:32,marginBottom:8}}>{isDeleted.split(" ")[0]}</div>
                          <div style={{fontSize:15,fontWeight:600,color:"#14532D"}}>{isDeleted}</div>
                          <button onClick={()=>setDeletedDays(p=>{const n={...p};delete n[day.name];return n;})} className="no-print" style={{marginTop:10,fontSize:12,padding:"5px 14px",borderRadius:100,border:"1px solid #E5E7EB",background:"white",color:"#22C55E",cursor:"pointer"}}>restore meal</button>
                        </div>
                      ) : (
                        <div>
                          <div style={{padding:"12px 14px"}}>{renderDayLines(day.lines, (dayServings[day.name]||totalPeople) / totalPeople)}</div>
                          <div className="no-print" style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 14px",borderTop:"1px solid #F3F4F6",background:"#FAFAFA",gap:10,flexWrap:"wrap"}}>
                            <a href={`https://www.google.com/search?q=${encodeURIComponent(mealName + " recipe")}`} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:"#22C55E",fontWeight:600,textDecoration:"none",display:"flex",alignItems:"center",gap:4}}>
                              🔍 Find similar recipes ↗
                            </a>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <span style={{fontSize:11,color:"#888",fontWeight:500}}>👥 Portions:</span>
                              <button onClick={()=>setDayServings(p=>({...p,[day.name]:Math.max(1,(p[day.name]||totalPeople)-1)}))} style={{width:24,height:24,borderRadius:"50%",border:"1px solid #E5E7EB",background:"white",cursor:"pointer",fontSize:14,color:"#22C55E",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>−</button>
                              <span style={{fontSize:13,fontWeight:700,color:"#14532D",minWidth:20,textAlign:"center"}}>{dayServings[day.name]||totalPeople}</span>
                              <button onClick={()=>setDayServings(p=>({...p,[day.name]:(p[day.name]||totalPeople)+1}))} style={{width:24,height:24,borderRadius:"50%",border:"1px solid #E5E7EB",background:"white",cursor:"pointer",fontSize:14,color:"#22C55E",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>+</button>
                              {(dayServings[day.name]||totalPeople) !== totalPeople && (
                                <span style={{fontSize:10,color:"#F59E0B",fontWeight:600}}>
                                  {(dayServings[day.name]||totalPeople) < totalPeople ? "⬇ scaled down" : "⬆ scaled up"}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div id="shopping" className="shopping-section" style={{marginTop:16,background:"white",borderRadius:16,border:"1px solid #E5E7EB",overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
              <div style={{background:"#22C55E",padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div>
                  <div style={{color:"white",fontSize:15,fontWeight:700}}>Shopping list</div>
                  <div style={{color:"#BBF7D0",fontSize:12,marginTop:2}}>{totalItems} items · {checkedCount} ticked off{alreadyHave?" · "+ingredientsList.length+" excluded":""}</div>
                </div>
                <div style={{fontSize:28}}>🛒</div>
              </div>
              <div className="no-print" style={{padding:"12px 16px",borderBottom:"1px solid #E5E7EB"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#22C55E",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>Choose supermarket</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {SUPERMARKETS.map(s=>(
                    <button key={s.id} onClick={()=>setSelectedSupermarket(s.id)} style={{padding:"5px 12px",borderRadius:100,fontSize:12,fontWeight:600,border:"2px solid",cursor:"pointer",background:selectedSupermarket===s.id?s.color:"white",borderColor:selectedSupermarket===s.id?s.color:"#E5E7EB",color:selectedSupermarket===s.id?"white":(s as any).textColor||s.color}}>{s.name}</button>
                  ))}
                </div>
              </div>
              {Object.entries(categories).map(([cat, items]) => items.length > 0 && (
                <div key={cat}>
                  <div style={{padding:"8px 16px",background:"#F0FDF4",borderBottom:"1px solid #E5E7EB",fontSize:12,fontWeight:700,color:"#14532D",display:"flex",alignItems:"center",gap:6}}>
                    <span>{CAT_EMOJIS[cat]||"🛒"}</span><span>{cat}</span>
                  </div>
                  {items.map((item, idx) => {
                    const key = `${cat}-${idx}`;
                    const isChecked = checked[key];
                    const searchUrl = `${sm.search}${encodeURIComponent(item.name.split("(")[0].trim())}`;
                    return (
                      <div key={idx} style={{padding:"9px 16px",borderBottom:idx<items.length-1?"1px solid #F3F4F6":"none",display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                        <div style={{display:"flex",alignItems:"center",gap:10,flex:1,minWidth:0}}>
                          <input type="checkbox" checked={!!isChecked} onChange={()=>setChecked(p=>({...p,[key]:!p[key]}))} style={{accentColor:"#22C55E",width:16,height:16,cursor:"pointer"}}/>
                          <span style={{fontSize:13,color:isChecked?"#ccc":"#333",textDecoration:isChecked?"line-through":"none"}}>{item.name}</span>
                        </div>
                        <a href={searchUrl} target="_blank" rel="noopener noreferrer" className="no-print" style={{fontSize:11,padding:"3px 10px",background:isChecked?"#F5F5F5":sm.bg,color:isChecked?"#bbb":sm.color,borderRadius:100,textDecoration:"none",whiteSpace:"nowrap",fontWeight:600}}>{sm.name} ↗</a>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="no-print" style={{marginTop:12,display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <button onClick={()=>setStep("prefs")} style={{padding:"13px",fontSize:13,borderRadius:12,border:"2px solid #E5E7EB",background:"white",cursor:"pointer",color:"#6B7280",fontWeight:600}}>← edit preferences</button>
              <button onClick={generatePlan} style={{padding:"13px",fontSize:13,fontWeight:700,borderRadius:12,border:"none",background:"#22C55E",color:"white",cursor:"pointer"}}>↻ regenerate</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
