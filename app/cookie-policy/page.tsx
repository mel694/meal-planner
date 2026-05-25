"use client";
import Link from "next/link";

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradCP" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradCP)"/>
    <ellipse cx="30" cy="30" rx="22" ry="4" fill="#6D28D9"/>
    <circle cx="20" cy="22" r="3.5" fill="#22C55E"/>
    <circle cx="26" cy="18" r="3" fill="#FACC15"/>
    <circle cx="33" cy="20" r="3.5" fill="#EF4444"/>
    <circle cx="40" cy="22" r="3" fill="#F97316"/>
    <text x="14" y="32" fontSize="11" fontWeight="900" fill="white" fontFamily="-apple-system,sans-serif">7</text>
  </svg>
);

export default function CookiePolicyPage() {
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

      <div style={{maxWidth:800,margin:"0 auto",padding:"40px 24px 80px"}}>
        <div style={{background:"white",borderRadius:16,padding:"40px",border:"1px solid #E5E7EB",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>
          <div style={{marginBottom:32,paddingBottom:24,borderBottom:"2px solid #F0FDF4"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <span style={{fontSize:32}}>🍪</span>
              <h1 style={{fontSize:28,fontWeight:800,color:"#14532D",margin:0,letterSpacing:"-0.5px"}}>Cookie Policy</h1>
            </div>
            <p style={{fontSize:14,color:"#6B7280",margin:0}}>Last updated: May 25, 2026 · Seven Dinners · <a href="mailto:hello@sevendinners.co.uk" style={{color:"#22C55E"}}>hello@sevendinners.co.uk</a></p>
          </div>

          <div style={{fontSize:15,lineHeight:1.8,color:"#374151"}}>
            <p>This Cookie Policy explains how <strong>Seven Dinners</strong> uses cookies and similar technologies when you visit <a href="https://www.sevendinners.co.uk" style={{color:"#22C55E"}}>www.sevendinners.co.uk</a>.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>What are cookies?</h2>
            <p>Cookies are small data files placed on your device when you visit a website. They help websites work properly and provide useful information to website owners. Cookies set by us are called &ldquo;first-party cookies&rdquo;. Cookies set by others (like Google Analytics) are &ldquo;third-party cookies&rdquo;.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>Why do we use cookies?</h2>
            <p>We use cookies to keep you signed in, understand how you use the site, and improve our service. Some cookies are essential for the site to function — without them you wouldn&apos;t be able to log in or use the meal planner.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>What cookies do we use?</h2>

            <h3 style={{fontSize:16,fontWeight:700,color:"#14532D",marginTop:24}}>🔒 Essential cookies</h3>
            <p>These cookies are strictly necessary for the website to work. They cannot be disabled.</p>
            <div style={{background:"#F9FAFB",borderRadius:10,border:"1px solid #E5E7EB",padding:"16px",marginBottom:16}}>
              <div style={{fontSize:13,marginBottom:8}}><strong>__cf_bm</strong> — Cloudflare security cookie (via Clerk authentication). Expires: 30 minutes.</div>
            </div>

            <h3 style={{fontSize:16,fontWeight:700,color:"#14532D",marginTop:24}}>⚙️ Functional cookies</h3>
            <p>These cookies enhance performance and functionality of the site.</p>
            <div style={{background:"#F9FAFB",borderRadius:10,border:"1px solid #E5E7EB",padding:"16px",marginBottom:16}}>
              <div style={{fontSize:13,marginBottom:8}}><strong>_cfuvid</strong> — Cloudflare security and performance cookie. Session only.</div>
              <div style={{fontSize:13,marginBottom:8}}><strong>__client_uat</strong> — Clerk authentication cookie. Expires: ~10 years.</div>
              <div style={{fontSize:13,marginBottom:8}}><strong>__clerk_db_jwt</strong> — Clerk session authentication. Expires: ~12 months.</div>
              <div style={{fontSize:13}}><strong>__clerk_redirect_count</strong> — Clerk redirect tracking. Expires: &lt;1 minute.</div>
            </div>

            <h3 style={{fontSize:16,fontWeight:700,color:"#14532D",marginTop:24}}>📊 Analytics cookies</h3>
            <p>These cookies help us understand how visitors use our website so we can improve it.</p>
            <div style={{background:"#F9FAFB",borderRadius:10,border:"1px solid #E5E7EB",padding:"16px",marginBottom:16}}>
              <div style={{fontSize:13,marginBottom:8}}><strong>_ga</strong> — Google Analytics. Records a unique ID to track website usage. Expires: 13 months. <a href="https://business.safety.google/privacy/" target="_blank" rel="noopener noreferrer" style={{color:"#22C55E"}}>Google Privacy Policy</a></div>
              <div style={{fontSize:13}}><strong>_ga_#</strong> — Google Analytics. Used to distinguish individual users. Expires: 13 months.</div>
            </div>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>How can I control cookies?</h2>
            <p>You can control cookies through your browser settings. Here&apos;s how to manage cookies in popular browsers:</p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{color:"#22C55E"}}>Chrome</a></li>
              <li><a href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{color:"#22C55E"}}>Safari</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" style={{color:"#22C55E"}}>Firefox</a></li>
              <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer" style={{color:"#22C55E"}}>Edge</a></li>
            </ul>
            <p>To opt out of Google Analytics tracking across all websites, visit <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{color:"#22C55E"}}>Google&apos;s opt-out tool</a>.</p>
            <p>Please note that disabling essential cookies will prevent you from signing in and using core features of Seven Dinners.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>Updates to this policy</h2>
            <p>We may update this Cookie Policy from time to time. The date at the top of this page shows when it was last updated.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>Contact us</h2>
            <p>If you have questions about our use of cookies, please contact us at <a href="mailto:hello@sevendinners.co.uk" style={{color:"#22C55E"}}>hello@sevendinners.co.uk</a>.</p>
            <p>Seven Dinners, 71-75 Shelton St, London, WC2H 9UB, United Kingdom</p>
          </div>
        </div>
      </div>

      <footer style={{background:"#14532D",color:"white",padding:"24px",textAlign:"center",fontSize:13}}>
        <div style={{display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap"}}>
          <Link href="/" style={{color:"#BBF7D0",textDecoration:"none"}}>Home</Link>
          <Link href="/privacy-policy" style={{color:"#BBF7D0",textDecoration:"none"}}>Privacy Policy</Link>
          <Link href="/cookie-policy" style={{color:"white",textDecoration:"none",fontWeight:600}}>Cookie Policy</Link>
          <Link href="/terms" style={{color:"#BBF7D0",textDecoration:"none"}}>Terms & Conditions</Link>
        </div>
        <div style={{marginTop:12,color:"#86EFAC"}}>© 2026 Seven Dinners · hello@sevendinners.co.uk</div>
      </footer>
    </div>
  );
}
