'use client';

import { useState } from 'react';
import Link from 'next/link';

const FEATURES = [
  'AI Meal Planning',
  'Shopping List',
  'Recipe Quality',
  'Ease of Use',
  'App Speed',
];

type FeatureRatings = Record<string, number>;

export default function FeedbackPage() {
  const [overallRating, setOverallRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [wouldRecommend, setWouldRecommend] = useState('');
  const [featureRatings, setFeatureRatings] = useState<FeatureRatings>({});
  const [comments, setComments] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleFeatureRating = (feature: string, rating: number) => {
    setFeatureRatings(prev => ({ ...prev, [feature]: rating }));
  };

  const handleSubmit = async () => {
    if (!overallRating) {
      setError('Please give an overall star rating before submitting.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, overallRating, wouldRecommend, featureRatings, comments }),
      });

      if (!res.ok) throw new Error('Failed to send');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ background: 'white', borderRadius: 16, padding: '48px 40px', maxWidth: 480, width: '100%', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111827', marginBottom: 12 }}>Thank you so much!</h1>
          <p style={{ color: '#6B7280', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            Your feedback means the world to us and helps make Seven Dinners even better. We read every single response!
          </p>
          <Link href="/app" style={{ display: 'inline-block', padding: '12px 32px', background: 'linear-gradient(135deg,#16A34A,#22C55E)', color: 'white', borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
            Back to my meal plan →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#F9FAFB', padding: '40px 24px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111827', marginBottom: 8 }}>How are we doing?</h1>
          <p style={{ color: '#6B7280', fontSize: 15, lineHeight: 1.6 }}>
            We're still early and your feedback shapes everything. Takes 2 minutes!
          </p>
        </div>

        {/* Overall Rating */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Overall rating *</h2>
          <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 16 }}>How would you rate Seven Dinners overall?</p>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setOverallRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                style={{ fontSize: 36, background: 'none', border: 'none', cursor: 'pointer', opacity: star <= (hoveredRating || overallRating) ? 1 : 0.25, transition: 'opacity 0.15s, transform 0.15s', transform: star <= (hoveredRating || overallRating) ? 'scale(1.1)' : 'scale(1)' }}
              >
                ⭐
              </button>
            ))}
          </div>
          {overallRating > 0 && (
            <p style={{ color: '#22C55E', fontSize: 13, fontWeight: 600, marginTop: 8 }}>
              {overallRating === 5 ? 'Amazing! 🎉' : overallRating === 4 ? 'Great, thanks! 😊' : overallRating === 3 ? 'Good to know! 🙏' : overallRating === 2 ? 'We\'ll do better! 💪' : 'Sorry to hear that 😔'}
            </p>
          )}
        </div>

        {/* Would Recommend */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Would you recommend us?</h2>
          <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 16 }}>Would you recommend Seven Dinners to a friend or family member?</p>
          <div style={{ display: 'flex', gap: 10 }}>
            {[{ value: 'yes', label: '✅ Yes', }, { value: 'maybe', label: '🤔 Maybe' }, { value: 'no', label: '❌ No' }].map(opt => (
              <button
                key={opt.value}
                onClick={() => setWouldRecommend(opt.value)}
                style={{ flex: 1, padding: '12px 8px', borderRadius: 10, border: `2px solid ${wouldRecommend === opt.value ? '#22C55E' : '#E5E7EB'}`, background: wouldRecommend === opt.value ? '#F0FDF4' : 'white', color: wouldRecommend === opt.value ? '#16A34A' : '#374151', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.15s' }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Ratings */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Rate specific features</h2>
          <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 20 }}>How would you rate each part of the app?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FEATURES.map(feature => (
              <div key={feature} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, color: '#374151', fontWeight: 500, minWidth: 140 }}>{feature}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => handleFeatureRating(feature, star)}
                      style={{ fontSize: 22, background: 'none', border: 'none', cursor: 'pointer', opacity: star <= (featureRatings[feature] || 0) ? 1 : 0.25, transition: 'opacity 0.15s' }}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Any other comments?</h2>
          <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 16 }}>What do you love? What could be better? We want to know everything!</p>
          <textarea
            value={comments}
            onChange={e => setComments(e.target.value)}
            placeholder="Share your thoughts here..."
            rows={4}
            style={{ width: '100%', padding: '12px', borderRadius: 10, border: '2px solid #E5E7EB', fontSize: 14, color: '#374151', resize: 'vertical', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
        </div>

        {/* Email */}
        <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 4 }}>Your email <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span></h2>
          <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 16 }}>Leave your email if you'd like us to follow up with you directly.</p>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '12px', borderRadius: 10, border: '2px solid #E5E7EB', fontSize: 14, color: '#374151', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 16px', marginBottom: 16, color: '#DC2626', fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg,#16A34A,#22C55E)', color: 'white', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginBottom: 16 }}
        >
          {loading ? 'Sending your feedback...' : 'Send Feedback 🚀'}
        </button>

        <p style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>
          <Link href="/app" style={{ color: '#9CA3AF' }}>← Back to app</Link>
        </p>

      </div>
    </main>
  );
}
