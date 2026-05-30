import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';

async function updateUserSubscription(userId: string, data: object) {
  console.log(`Updating subscription for user ${userId}:`, data);
  try {
    const { clerkClient } = await import('@clerk/nextjs/server');
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { subscription: data },
    });
  } catch (err) {
    console.error('Failed to update Clerk metadata:', err);
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.CheckoutSession;
        console.log('Session metadata:', JSON.stringify(session.metadata));
        const userId = session.metadata?.userId || session.client_reference_id;
        console.log('userId:', userId);
        if (!userId) { console.log('No userId found'); break; }
        await updateUserSubscription(userId, { status: 'active', plan: session.metadata?.plan });
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;
        if (!userId) break;
        await updateUserSubscription(userId, { status: 'cancelled' });
        break;
      }
    }
    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
