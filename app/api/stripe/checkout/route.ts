import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PLANS, PlanKey } from '@/lib/plans';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }
    const { plan } = await req.json();
    if (!plan || !(plan in PLANS)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }
    const selectedPlan = PLANS[plan as PlanKey];
    const email = user.emailAddresses[0]?.emailAddress;
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: selectedPlan.priceId, quantity: 1 }],
      metadata: { userId, plan },
      subscription_data: { metadata: { userId, plan } },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/app?success=true&plan=${plan}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?cancelled=true`,
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
