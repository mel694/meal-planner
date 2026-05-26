import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, overallRating, wouldRecommend, comments, featureRatings } = await req.json();

    if (!overallRating) {
      return NextResponse.json({ error: 'Overall rating is required' }, { status: 400 });
    }

    const stars = '⭐'.repeat(overallRating);
    const recommendText = wouldRecommend === 'yes' ? '✅ Yes' : wouldRecommend === 'maybe' ? '🤔 Maybe' : '❌ No';

    const featureRatingsHtml = Object.entries(featureRatings || {})
      .map(([feature, rating]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #F3F4F6;color:#374151;font-size:14px;">${feature}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #F3F4F6;font-size:14px;">${'⭐'.repeat(Number(rating))}</td>
        </tr>
      `)
      .join('');

    await resend.emails.send({
      from: 'Seven Dinners Feedback <onboarding@resend.dev>',
      to: 'mel@mybalancing.com',
      subject: `⭐ New Feedback — ${stars} (${overallRating}/5)`,
      html: `
        <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <div style="background:linear-gradient(135deg,#16A34A,#22C55E);padding:24px;borderRadius:12px;margin-bottom:24px;">
            <h1 style="color:white;margin:0;font-size:24px;">🍽️ New Feedback from Seven Dinners</h1>
          </div>

          <div style="background:#F9FAFB;border-radius:12px;padding:20px;margin-bottom:16px;">
            <h2 style="color:#111827;font-size:16px;margin:0 0 16px;">Overview</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #F3F4F6;color:#6B7280;font-size:14px;width:40%;">From</td>
                <td style="padding:8px 12px;border-bottom:1px solid #F3F4F6;color:#111827;font-size:14px;">${email || 'Anonymous'}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #F3F4F6;color:#6B7280;font-size:14px;">Overall Rating</td>
                <td style="padding:8px 12px;border-bottom:1px solid #F3F4F6;font-size:14px;">${stars} (${overallRating}/5)</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;color:#6B7280;font-size:14px;">Would Recommend</td>
                <td style="padding:8px 12px;font-size:14px;">${recommendText}</td>
              </tr>
            </table>
          </div>

          ${featureRatingsHtml ? `
          <div style="background:#F9FAFB;border-radius:12px;padding:20px;margin-bottom:16px;">
            <h2 style="color:#111827;font-size:16px;margin:0 0 16px;">Feature Ratings</h2>
            <table style="width:100%;border-collapse:collapse;">
              ${featureRatingsHtml}
            </table>
          </div>
          ` : ''}

          ${comments ? `
          <div style="background:#F9FAFB;border-radius:12px;padding:20px;margin-bottom:16px;">
            <h2 style="color:#111827;font-size:16px;margin:0 0 12px;">Comments</h2>
            <p style="color:#374151;font-size:14px;line-height:1.6;margin:0;">${comments}</p>
          </div>
          ` : ''}

          <p style="color:#9CA3AF;font-size:12px;text-align:center;margin-top:24px;">
            Sent from sevendinners.co.uk feedback form
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feedback email error:', error);
    return NextResponse.json({ error: 'Failed to send feedback' }, { status: 500 });
  }
}
