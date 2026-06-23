import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // Log whether the segment ID is available at runtime
    const segmentId = process.env.RESEND_SEGMENT_ID;
    console.log('[waitlist] RESEND_SEGMENT_ID defined:', !!segmentId);
    console.log(`[waitlist] segment id value: >>>${segmentId}<<<`);

    // Add to Resend segment — using segments[] (audienceId is deprecated in SDK v6+)
    const { data: contactData, error: contactError } = await resend.contacts.create({
      email,
      segments: segmentId ? [{ id: segmentId }] : [],
    });

    console.log('[waitlist] contacts.create result:', JSON.stringify({ data: contactData, error: contactError }));

    // Duplicate contacts return a non-fatal error — treat as success
    if (contactError && (contactError as any)?.statusCode !== 422) {
      console.error('[waitlist] contact error (non-duplicate):', contactError);
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
    }

    // Send welcome email
    const { error: emailError } = await resend.emails.send({
      from: 'Seven Dinners <hello@sevendinners.co.uk>',
      to: email,
      subject: "You're on the list 👀",
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1F2937;">
          <div style="margin-bottom:28px;">
            <span style="font-size:28px;font-weight:800;color:#14532D;">Seven</span><span style="font-size:28px;font-weight:800;color:#22C55E;">Dinners</span>
          </div>

          <p style="font-size:15px;line-height:1.7;margin:0 0 16px;">Hi,</p>

          <p style="font-size:15px;line-height:1.7;margin:0 0 16px;">You're officially first in line for Seven Dinners Fitness.</p>

          <p style="font-size:15px;line-height:1.7;margin:0 0 16px;">Here's what's coming: AI strength training built around the food you're already eating. Your meals and your workouts, finally talking to each other. We're deep in development and you'll get early access before we open it up to everyone.</p>

          <p style="font-size:15px;line-height:1.7;margin:0 0 16px;">While you wait — the meal planner is completely free, right now, no strings. If you haven't already, go plan your week.</p>

          <a href="https://www.sevendinners.co.uk/app" style="display:inline-block;margin:8px 0 24px;padding:14px 28px;background:#22C55E;color:white;border-radius:100px;font-size:15px;font-weight:700;text-decoration:none;">Plan my week →</a>

          <p style="font-size:15px;line-height:1.7;margin:0 0 4px;">More soon,</p>
          <p style="font-size:15px;line-height:1.7;margin:0;">The Seven Dinners team</p>

          <hr style="margin:32px 0;border:none;border-top:1px solid #F3F4F6;"/>
          <p style="font-size:12px;color:#9CA3AF;margin:0;">You're receiving this because you joined the Seven Dinners Fitness waitlist at sevendinners.co.uk</p>
        </div>
      `,
    });

    if (emailError) {
      console.error('[waitlist] email error:', emailError);
    } else {
      console.log('[waitlist] welcome email sent ok');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
