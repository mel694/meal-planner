import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export const PLANS = {
  premium: {
    name: 'Seven Dinners Premium',
    description: 'Unlimited AI meal planning, fitness goals, fridge scanning, smart shopping lists and more.',
    price: 5.99,
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID!,
    features: [
      'AI-powered meal planning',
      'Fridge scanning',
      'Smart shopping lists',
      'Fitness goal tracking',
      'Cancel anytime',
    ],
  },
  premiumPlus: {
    name: 'Seven Dinners Premium Plus',
    description: 'Everything in Premium, plus advanced features for the ultimate meal planning experience.',
    price: 10.99,
    priceId: process.env.STRIPE_PREMIUM_PLUS_PRICE_ID!,
    features: [
      'Everything in Premium',
      'Priority AI processing',
      'Family meal planning (up to 6)',
      'Nutritionist-curated plans',
      'Advanced analytics',
      'Cancel anytime',
    ],
  },
} as const;

export type PlanKey = keyof typeof PLANS;
