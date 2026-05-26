export const PLANS = {
  premium: {
    name: 'Seven Dinners Premium',
    description: 'Unlimited AI meal planning, fitness goals, fridge scanning, smart shopping lists and more.',
    price: 5.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID!,
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
    description: 'Everything in Premium, plus advanced features.',
    price: 10.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PLUS_PRICE_ID!,
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
