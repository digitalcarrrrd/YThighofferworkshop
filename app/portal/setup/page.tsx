'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, CheckCircle2, ShieldCheck, ArrowRight, PlayCircle, Sparkles } from 'lucide-react';

function SetupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isLoading, setIsLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState<{ name: string; email: string } | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Setup token is missing or invalid. Please check the WhatsApp link.');
      setIsLoading(false);
      return;
    }

    fetch(`/api/portal/setup?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStudentInfo(data.user);
        } else {
          setError(data.error || 'Invalid or expired setup link.');
        }
      })
      .catch(() => setError('Unable to verify setup link.'))
      .finally(() => setIsLoading(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/portal/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push('/portal/dashboard');
      } else {
        setError(data.error || 'Failed to set password.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0b0e] text-white flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#13151b] border border-gray-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 text-red-500 mb-3 border border-red-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create Portal Password</h1>
          <p className="text-sm text-gray-400 mt-1">
            {studentInfo?.name ? `Welcome ${studentInfo.name}! ` : ''}Set your secure password to access your workshop recordings & bonuses.
          </p>
        </div>

        {error ? (
          <div className="p-4 bg-red-950/40 border border-red-800/50 rounded-xl text-red-300 text-sm text-center mb-4">
            {error}
            <div className="mt-4">
              <a
                href="/portal"
                className="text-xs text-gray-400 hover:text-white underline"
              >
                Go to login page
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {studentInfo && (
              <div className="bg-gray-900/60 p-3 rounded-xl border border-gray-800/60 flex items-center justify-between text-xs text-gray-300">
                <span className="text-gray-500">Account:</span>
                <span className="font-mono text-gray-200 truncate ml-2">{studentInfo.email}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter at least 6 characters"
                className="w-full px-4 py-3 rounded-xl bg-[#0d0e12] border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full px-4 py-3 rounded-xl bg-[#0d0e12] border border-gray-800 text-white placeholder-gray-600 focus:outline-none focus:border-red-500 text-sm transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-950/40 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                'Securing Portal...'
              ) : (
                <>
                  <span>Save Password & Access Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-gray-800/60 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            256-bit encrypted student portal • Abrar Nadir Workshop
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SetupPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0b0e] text-white flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
      </div>
    }>
      <SetupContent />
    </Suspense>
  );
}
