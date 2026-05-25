import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    await resend.emails.send({
      from: "Seven Dinners <hello@sevendinners.co.uk>",
      to: email,
      subject: "Welcome to Seven Dinners! 🍽️",
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:white;">
          <div style="background:linear-gradient(135deg,#22C55E,#16A34A);padding:40px 32px;text-align:center;border-radius:16px 16px 0 0;">
            <div style="font-size:48px;margin-bottom:12px;">🍽️</div>
            <h1 style="color:white;margin:0;font-size:28px;font-weight:800;letter-spacing:-0.5px;">Welcome to Seven Dinners!</h1>
            <p style="color:#BBF7D0;margin:8px 0 0;font-size:15px;">Healthy eating made simple</p>
          </div>
          <div style="padding:32px;border:1px solid #E5E7EB;border-top:none;border-radius:0 0 16px 16px;">
            <p style="font-size:16px;color:#14532D;font-weight:600;">Hi ${name || "there"}! 👋</p>
            <p style="font-size:14px;color:#4B5563;line-height:1.6;">You've just joined thousands of families eating healthier, wasting less food and spending less time stressing about what's for dinner.</p>
            <p style="font-size:14px;color:#4B5563;line-height:1.6;">Here's what you can do with Seven Dinners:</p>
            <div style="background:#F0FDF4;border-radius:12px;padding:20px;margin:20px 0;">
              ${[
                ["🤖 AI meal planning", "Get 7 personalised dinners in seconds"],
                ["📸 Fridge scanner", "Snap your fridge and cook from what you have"],
                ["🛒 Smart shopping lists", "Ingredients linked to Sainsbury's, Tesco, Ocado & more"],
                ["⭐ Save favourites", "Keep the meals your family loves"],
                ["📅 Add to calendar", "Put your dinners straight into Outlook or Google Calendar"],
              ].map(([title, desc]) => `
                <div style="display:flex;gap:10px;margin-bottom:12px;">
                  <div style="font-size:18px;flex-shrink:0">${title.split(" ")[0]}</div>
                  <div>
                    <div style="font-size:13px;font-weight:700;color:#14532D;">${title.split(" ").slice(1).join(" ")}</div>
                    <div style="font-size:12px;color:#6B7280;">${desc}</div>
                  </div>
                </div>
              `).join("")}
            </div>
            <div style="text-align:center;margin:24px 0;">
              <a href="https://www.sevendinners.co.uk/app" style="display:inline-block;padding:14px 32px;background:#22C55E;color:white;border-radius:12px;font-size:15px;font-weight:700;text-decoration:none;">Plan my first week →</a>
            </div>
            <p style="font-size:12px;color:#9CA3AF;text-align:center;margin-top:24px;">Seven Dinners · real food · no UPF · cooked from scratch<br/>www.sevendinners.co.uk</p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
