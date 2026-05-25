"use client";
import Link from "next/link";

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradPP" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradPP)"/>
    <ellipse cx="30" cy="30" rx="22" ry="4" fill="#6D28D9"/>
    <circle cx="20" cy="22" r="3.5" fill="#22C55E"/>
    <circle cx="26" cy="18" r="3" fill="#FACC15"/>
    <circle cx="33" cy="20" r="3.5" fill="#EF4444"/>
    <circle cx="40" cy="22" r="3" fill="#F97316"/>
    <text x="14" y="32" fontSize="11" fontWeight="900" fill="white" fontFamily="-apple-system,sans-serif">7</text>
  </svg>
);

export default function PrivacyPolicyPage() {
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
              <span style={{fontSize:32}}>🔒</span>
              <h1 style={{fontSize:28,fontWeight:800,color:"#14532D",margin:0,letterSpacing:"-0.5px"}}>Privacy Policy</h1>
            </div>
            <p style={{fontSize:14,color:"#6B7280",margin:0}}>Last updated: May 25, 2026 · Seven Dinners · <a href="mailto:hello@sevendinners.co.uk" style={{color:"#22C55E"}}>hello@sevendinners.co.uk</a></p>
          </div>

          <div style={{fontSize:15,lineHeight:1.8,color:"#374151"}}>
            <p>This Privacy Notice for <strong>Seven Dinners</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) describes how and why we might access, collect, store, use, and/or share your personal information when you use our services, including when you visit our website at <a href="https://www.sevendinners.co.uk" style={{color:"#22C55E"}}>www.sevendinners.co.uk</a> or use our AI meal planning application.</p>

            <p><strong>Questions or concerns?</strong> Please contact us at <a href="mailto:hello@sevendinners.co.uk" style={{color:"#22C55E"}}>hello@sevendinners.co.uk</a>.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>1. What Information Do We Collect?</h2>
            <p>We collect personal information that you voluntarily provide when you register on our services, including:</p>
            <ul>
              <li>Names and email addresses</li>
              <li>Usernames and passwords</li>
              <li>Contact preferences</li>
              <li>Photos uploaded via the fridge scanning feature</li>
              <li>Meal preferences and dietary requirements you provide</li>
            </ul>
            <p>We also automatically collect certain information when you visit our site, including IP address, browser type, device information, and usage data. We use Google Analytics to collect this information. See our <Link href="/cookie-policy" style={{color:"#22C55E"}}>Cookie Policy</Link> for details.</p>
            <p>When you sign in with Google, we receive your name, email address, and profile picture from Google.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>2. How Do We Process Your Information?</h2>
            <p>We process your personal information to:</p>
            <ul>
              <li>Create and manage your account</li>
              <li>Deliver the meal planning service</li>
              <li>Process payments (via Stripe, when applicable)</li>
              <li>Send administrative and welcome emails (via Resend)</li>
              <li>Respond to your enquiries</li>
              <li>Improve our services using analytics data</li>
              <li>Send marketing communications (you can opt out at any time)</li>
              <li>Protect the security of our services</li>
            </ul>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>3. Legal Bases for Processing</h2>
            <p>We process your information under the following legal bases under UK GDPR:</p>
            <ul>
              <li><strong>Consent</strong> — where you have given us permission for specific purposes</li>
              <li><strong>Contract performance</strong> — to provide the services you have requested</li>
              <li><strong>Legitimate interests</strong> — to improve our services, prevent fraud, and send relevant marketing</li>
              <li><strong>Legal obligations</strong> — to comply with applicable laws</li>
            </ul>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>4. When and With Whom Do We Share Your Information?</h2>
            <p>We share your data with the following third-party service providers:</p>
            <ul>
              <li><strong>Anthropic</strong> — AI platform powering meal plan generation and fridge scanning</li>
              <li><strong>Clerk</strong> — user authentication and account management</li>
              <li><strong>Supabase</strong> — database storage (hosted in EU/Ireland)</li>
              <li><strong>Google Analytics</strong> — website analytics and usage tracking</li>
              <li><strong>Google Sign-In</strong> — social login authentication</li>
              <li><strong>Resend</strong> — transactional email delivery</li>
              <li><strong>Stripe</strong> — payment processing (when applicable)</li>
              <li><strong>Awin</strong> — affiliate marketing programme</li>
              <li><strong>Vercel</strong> — website hosting</li>
            </ul>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>5. Artificial Intelligence</h2>
            <p>Seven Dinners offers AI-powered features including meal plan generation, fridge photo scanning, and recipe creation. These are powered by <strong>Anthropic</strong> (Claude AI). When you use these features, your inputs (including food preferences and fridge photos) are processed by Anthropic to generate your results.</p>
            <p>You can opt out of AI processing by logging into your account settings or contacting us at hello@sevendinners.co.uk.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>6. Cookies</h2>
            <p>We use cookies and similar tracking technologies. For full details, see our <Link href="/cookie-policy" style={{color:"#22C55E"}}>Cookie Policy</Link>.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>7. International Data Transfers</h2>
            <p>Your data may be transferred to and processed in the United States by Anthropic, Clerk, Resend, Vercel, and Google. Supabase stores data in Ireland (EU). All international transfers are protected by Standard Contractual Clauses (SCCs) in accordance with UK GDPR requirements.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>8. How Long Do We Keep Your Information?</h2>
            <p>We retain your personal information for as long as you have an active account with us. When you delete your account, we will delete or anonymise your data. Some information may be retained in backup archives for a limited period before permanent deletion.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>9. How Do We Keep Your Information Safe?</h2>
            <p>We implement appropriate technical and organisational security measures including encrypted data transmission (HTTPS), secure authentication via Clerk, and encrypted database storage via Supabase. However, no electronic transmission can be 100% secure.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>10. Children&apos;s Privacy</h2>
            <p>We do not knowingly collect data from children under 18. If you believe we have collected information from a child, please contact us at hello@sevendinners.co.uk.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>11. Your Privacy Rights</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request erasure of your data</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>To exercise these rights, visit <Link href="/account" style={{color:"#22C55E"}}>your account settings</Link> or contact us at <a href="mailto:hello@sevendinners.co.uk" style={{color:"#22C55E"}}>hello@sevendinners.co.uk</a>.</p>
            <p>If you believe we are unlawfully processing your data, you have the right to complain to the <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" style={{color:"#22C55E"}}>UK Information Commissioner&apos;s Office (ICO)</a>.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>12. Contact Us</h2>
            <p>Seven Dinners<br/>
            Data Protection Officer: Melanie Rollason<br/>
            Email: <a href="mailto:hello@sevendinners.co.uk" style={{color:"#22C55E"}}>hello@sevendinners.co.uk</a><br/>
            Website: <a href="https://www.sevendinners.co.uk" style={{color:"#22C55E"}}>www.sevendinners.co.uk</a></p>

            <div style={{marginTop:40,padding:"16px 20px",background:"#F0FDF4",borderRadius:12,border:"1px solid #BBF7D0",fontSize:13,color:"#4B5563"}}>
              This privacy policy was last updated on 25 May 2026. We may update this notice from time to time. We will notify you of any material changes by email or by a prominent notice on our website.
            </div>
          </div>
        </div>
      </div>

      <footer style={{background:"#14532D",color:"white",padding:"24px",textAlign:"center",fontSize:13}}>
        <div style={{display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap"}}>
          <Link href="/" style={{color:"#BBF7D0",textDecoration:"none"}}>Home</Link>
          <Link href="/privacy-policy" style={{color:"white",textDecoration:"none",fontWeight:600}}>Privacy Policy</Link>
          <Link href="/cookie-policy" style={{color:"#BBF7D0",textDecoration:"none"}}>Cookie Policy</Link>
          <Link href="/terms" style={{color:"#BBF7D0",textDecoration:"none"}}>Terms & Conditions</Link>
        </div>
        <div style={{marginTop:12,color:"#86EFAC"}}>© 2026 Seven Dinners · hello@sevendinners.co.uk</div>
      </footer>
    </div>
  );
}
