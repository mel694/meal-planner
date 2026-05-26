'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { PLANS, PlanKey } from '@/lib/plans';

export default function PricingPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<PlanKey | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (plan: PlanKey) => {
    if (!isSignedIn) {
      router.push('/sign-in?redirect=/pricing');
      return;
    }

    setLoading(plan);
    setError(null);

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      if (data.url) window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout');
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, honest pricing
          </h1>
          <p className="text-xl text-gray-500">
            Start planning smarter meals today. Cancel anytime.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-8">
          {(Object.entries(PLANS) as [PlanKey, typeof PLANS[PlanKey]][]).map(
            ([key, plan]) => {
              const isPremiumPlus = key === 'premiumPlus';
              const isLoading = loading === key;

              return (
                <div
                  key={key}
                  className={`relative rounded-2xl p-8 border-2 transition-shadow hover:shadow-lg ${
                    isPremiumPlus
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {isPremiumPlus && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  )}

                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h2>
                  <p className="text-gray-500 text-sm mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <span className="text-5xl font-bold text-gray-900">
                      £{plan.price}
                    </span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-gray-700">
                        <span className="text-emerald-500 font-bold">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleCheckout(key)}
                    disabled={!!loading}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-base transition-all ${
                      isPremiumPlus
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        : 'bg-gray-900 hover:bg-gray-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? 'Redirecting to Stripe...' : `Get ${plan.name}`}
                  </button>
                </div>
              );
            }
          )}
        </div>

        {/* Trust */}
        <p className="text-center text-gray-400 text-sm mt-12">
          🔒 Secure payment via Stripe · Cancel anytime · No hidden fees
        </p>
      </div>
    </main>
  );
}
