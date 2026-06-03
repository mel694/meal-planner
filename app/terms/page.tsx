"use client";
import Link from "next/link";

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bowlGradTC" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#A78BFA"/>
        <stop offset="100%" stopColor="#7C3AED"/>
      </linearGradient>
    </defs>
    <path d="M8 30 Q8 48 30 50 Q52 48 52 30 Z" fill="url(#bowlGradTC)"/>
    <ellipse cx="30" cy="30" rx="22" ry="4" fill="#6D28D9"/>
    <circle cx="20" cy="22" r="3.5" fill="#22C55E"/>
    <circle cx="26" cy="18" r="3" fill="#FACC15"/>
    <circle cx="33" cy="20" r="3.5" fill="#EF4444"/>
    <circle cx="40" cy="22" r="3" fill="#F97316"/>
    <text x="14" y="32" fontSize="11" fontWeight="900" fill="white" fontFamily="-apple-system,sans-serif">7</text>
  </svg>
);

export default function TermsPage() {
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
              <span style={{fontSize:32}}>📋</span>
              <h1 style={{fontSize:28,fontWeight:800,color:"#14532D",margin:0,letterSpacing:"-0.5px"}}>Terms & Conditions</h1>
            </div>
            <p style={{fontSize:14,color:"#6B7280",margin:0}}>Last updated: May 25, 2026 · Seven Dinners</p>
          </div>

          <div style={{fontSize:15,lineHeight:1.8,color:"#374151"}}>
            <p>Please read these Terms and Conditions carefully before using Seven Dinners. By accessing or using our service, you agree to be bound by these terms.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>1. About Seven Dinners</h2>
            <p>Seven Dinners (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is an AI-powered meal planning service available at <a href="https://www.sevendinners.co.uk" style={{color:"#22C55E"}}>www.sevendinners.co.uk</a>. We provide weekly meal plans, recipes, shopping lists, and fridge scanning functionality using artificial intelligence.</p>
            <p>Seven Dinners is operated by Melanie Rollason. Contact: <a href="mailto:hello@sevendinners.co.uk" style={{color:"#22C55E"}}>hello@sevendinners.co.uk</a></p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>2. Eligibility</h2>
            <p>You must be at least 18 years old to use Seven Dinners. By using our service, you confirm that you meet this requirement. If you are a parent or guardian, you may use Seven Dinners on behalf of your family.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>3. Your Account</h2>
            <p>When you create an account, you are responsible for:</p>
            <ul>
              <li>Keeping your login credentials secure</li>
              <li>All activity that occurs under your account</li>
              <li>Providing accurate and up-to-date information</li>
              <li>Notifying us immediately of any unauthorised use</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>4. AI-Generated Content</h2>
            <p>Seven Dinners uses artificial intelligence (powered by Anthropic&apos;s Claude) to generate meal plans, recipes, and shopping lists. Please be aware that:</p>
            <ul>
              <li>AI-generated recipes are suggestions only and should be adapted to your family&apos;s specific dietary needs and allergies</li>
              <li>We cannot guarantee the accuracy of nutritional information provided</li>
              <li>You should always verify ingredients are safe for anyone with food allergies or medical conditions</li>
              <li>Ingredient quantities and cooking times are estimates and may require adjustment</li>
              <li>We are not responsible for any adverse effects arising from following AI-generated recipes</li>
            </ul>
            <p><strong>Important:</strong> If you or a family member has a serious food allergy or medical dietary requirement, always consult a healthcare professional and do not rely solely on our service.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>5. Fridge Scanning Feature</h2>
            <p>When you use the fridge scanning feature, you upload photos to our service. By doing so, you:</p>
            <ul>
              <li>Grant us permission to process these images using AI to identify ingredients</li>
              <li>Confirm the photos do not contain personal data of third parties without their consent</li>
              <li>Acknowledge that photos are processed by Anthropic&apos;s AI systems</li>
            </ul>
            <p>We do not store your fridge photos permanently — they are used only to generate your ingredient list.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>6. Subscriptions and Payments</h2>
            <p>Seven Dinners offers a free tier and paid subscription plans:</p>
            <ul>
              <li><strong>Free plan</strong> — basic meal planning features at no cost</li>
              <li><strong>Premium (£7.99/month)</strong> — unlimited planning, fitness goals, fridge scanning, and more</li>
              <li><strong>Premium Plus (£12.99/month)</strong> — everything in Premium plus AI nutrition coaching</li>
            </ul>
            <p>Subscriptions are billed monthly. You can cancel at any time and your access continues until the end of the billing period. Payments are processed securely by Stripe. We do not store your payment card details.</p>
            <p>We reserve the right to change our pricing with 30 days&apos; notice to existing subscribers.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>7. Cancellation and Refunds</h2>
            <p>You may cancel your subscription at any time through your account settings. Under UK Consumer Contracts Regulations, you have a 14-day cooling-off period from the date of your first subscription payment. To request a refund within this period, contact us at hello@sevendinners.co.uk.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>8. Supermarket Links and Affiliate Programmes</h2>
            <p>Seven Dinners includes links to supermarket websites (Sainsbury&apos;s, Tesco, Asda, Morrisons, Ocado) for shopping convenience. We may earn a commission through affiliate programmes when you make purchases via these links. This does not affect the price you pay.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>9. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the service for any unlawful purpose</li>
              <li>Attempt to reverse engineer, copy, or resell our service</li>
              <li>Upload content that is harmful, offensive, or infringes third-party rights</li>
              <li>Use automated tools to access or scrape our service</li>
              <li>Share your account credentials with others</li>
            </ul>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>10. Intellectual Property</h2>
            <p>The Seven Dinners name, logo, branding, and underlying technology are owned by us. AI-generated meal plans and recipes are provided for your personal use only and may not be reproduced commercially without our permission.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>11. Limitation of Liability</h2>
            <p>To the fullest extent permitted by UK law, Seven Dinners shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability to you shall not exceed the amount you have paid us in the 12 months preceding the claim.</p>
            <p>Nothing in these terms limits our liability for death or personal injury caused by negligence, fraud, or any other matter that cannot be excluded by law.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>12. Service Availability</h2>
            <p>We aim to keep Seven Dinners available at all times but cannot guarantee uninterrupted access. We reserve the right to suspend or withdraw the service with reasonable notice. We will not be liable for any interruption caused by circumstances beyond our reasonable control.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>13. Changes to These Terms</h2>
            <p>We may update these terms from time to time. We will notify you of material changes by email or by a prominent notice on our website. Continued use of the service after changes constitutes acceptance of the new terms.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>14. Governing Law</h2>
            <p>These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>

            <h2 style={{fontSize:18,fontWeight:700,color:"#14532D",marginTop:32}}>15. Contact Us</h2>
            <p>Seven Dinners<br/>
            Email: <a href="mailto:hello@sevendinners.co.uk" style={{color:"#22C55E"}}>hello@sevendinners.co.uk</a><br/>
            Website: <a href="https://www.sevendinners.co.uk" style={{color:"#22C55E"}}>www.sevendinners.co.uk</a></p>

            <div style={{marginTop:40,padding:"16px 20px",background:"#F0FDF4",borderRadius:12,border:"1px solid #BBF7D0",fontSize:13,color:"#4B5563"}}>
              These Terms & Conditions were last updated on 25 May 2026. By continuing to use Seven Dinners, you accept these terms.
            </div>
          </div>
        </div>
      </div>

      <footer style={{background:"#14532D",color:"white",padding:"24px",textAlign:"center",fontSize:13}}>
        <div style={{display:"flex",justifyContent:"center",gap:24,flexWrap:"wrap"}}>
          <Link href="/" style={{color:"#BBF7D0",textDecoration:"none"}}>Home</Link>
          <Link href="/privacy-policy" style={{color:"#BBF7D0",textDecoration:"none"}}>Privacy Policy</Link>
          <Link href="/cookie-policy" style={{color:"#BBF7D0",textDecoration:"none"}}>Cookie Policy</Link>
          <Link href="/terms" style={{color:"white",textDecoration:"none",fontWeight:600}}>Terms & Conditions</Link>
        </div>
        <div style={{marginTop:12,color:"#86EFAC"}}>© 2026 Seven Dinners · hello@sevendinners.co.uk</div>
      </footer>
    </div>
  );
}
