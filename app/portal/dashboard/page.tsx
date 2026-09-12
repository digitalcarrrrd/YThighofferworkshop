'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Play,
  Calendar,
  Clock,
  Download,
  Flame,
  ArrowRight,
  LogOut,
  ExternalLink,
  CheckCircle,
  Video,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface PortalConfig {
  recordingTitle: string;
  recordingVideoUrl: string;
  recordingDuration: string;
  sessionDate: string;
  nextSessionDate: string;
  nextSessionLink: string;
  offerUrl: string;
  offerDiscount: string;
  bonuses: Array<{
    title: string;
    description: string;
    url: string;
  }>;
}

export default function PortalDashboardPage() {
  const router = useRouter();
  const [config, setConfig] = useState<PortalConfig | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Read email from cookie
    const cookies = document.cookie.split(';');
    const emailCookie = cookies.find(c => c.trim().startsWith('portal_user_email='));
    if (emailCookie) {
      setUserEmail(decodeURIComponent(emailCookie.split('=')[1]));
    }

    fetch('/api/portal/config')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setConfig(data.config);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/portal/login', { method: 'DELETE' });
    router.push('/portal');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0b0e] text-white flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Convert watch URL to embed URL if needed
  let embedUrl = config?.recordingVideoUrl || 'https://www.youtube.com/embed/ELxrjyvyiUc';
  if (embedUrl.includes('watch?v=')) {
    embedUrl = embedUrl.replace('watch?v=', 'embed/');
  }

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white pb-20 selection:bg-red-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-gray-800/80 bg-[#0d0e12]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-sm shadow-lg shadow-red-950/50">
              AN
            </div>
            <div>
              <span className="font-bold text-sm sm:text-base tracking-tight block">
                YouTube Empire Builder
              </span>
              <span className="text-[11px] text-gray-400 block -mt-0.5">
                Participant Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {userEmail && (
              <span className="hidden sm:inline-block text-xs text-gray-400 font-mono bg-gray-900/80 px-2.5 py-1 rounded-lg border border-gray-800">
                {userEmail}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/60 transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Session Status Banner */}
        <div className="bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-transparent border border-emerald-800/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-emerald-200">
                  Session 1 Complete • Recording Ready
                </h3>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  24h Access
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Next Live Q&A / Advance Session: <strong className="text-white">{config?.nextSessionDate || 'Tomorrow at 8:00 PM PKT'}</strong>
              </p>
            </div>
          </div>

          <a
            href={config?.nextSessionLink || 'https://meet.google.com/mfm-cmfi-bnn'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-md"
          >
            <span>Google Meet Room</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Player Section */}
        <section className="bg-[#13151b] border border-gray-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-6 border-b border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">
                <Video className="w-3.5 h-3.5" />
                <span>HD Workshop Replay</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {config?.recordingTitle || 'Session 1: US/UK Faceless YouTube Automation & AI Systems'}
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                {config?.recordingDuration || '2h 14m'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                {config?.sessionDate || 'Daily Masterclass'}
              </span>
            </div>
          </div>

          {/* YouTube Unlisted Embed */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={embedUrl}
              title="YouTube Workshop Recording"
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="p-4 bg-[#0f1015] text-xs text-gray-400 flex items-center justify-between">
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gray-500" />
              Private Unlisted Recording • Strictly for Masterclass Participants
            </p>
            <span className="text-[11px] text-gray-500 hidden sm:inline">
              Bookmark this page to re-watch anytime today.
            </span>
          </div>
        </section>

        {/* 50% Academy Founder Discount Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-950/60 via-purple-950/40 to-indigo-950/60 border border-red-500/30 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-red-400" />
                <span>Special Masterclass Graduate Offer</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                Unlock YouTube Empire Builder Academy (50% OFF)
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Take what you learned in Session 1 to full channel monetization with 12 in-depth modules, turnkey faceless SOPs, weekly coaching calls with Abrar Nadir, and lifetime mastermind community access.
              </p>
              <div className="text-xs text-amber-400/90 font-medium">
                ⚡ Valid for the next 24 hours exclusively for verified workshop attendees.
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={config?.offerUrl || 'https://www.abrarnadir.com/ytempirebuilder'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-950/50 transition-all flex items-center justify-center gap-2 text-sm text-center"
              >
                <span>Claim 50% Academy Pass</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-[11px] text-gray-400 text-center">
                Instant access to 12 modules & templates
              </span>
            </div>
          </div>
        </section>

        {/* Bonuses Section (Hosted on GHL) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Your Masterclass Bonus Vault</span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Download and implement these practical resources alongside the session recording.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(config?.bonuses || []).map((bonus, idx) => (
              <div
                key={idx}
                className="bg-[#13151b] border border-gray-800/80 rounded-xl p-5 hover:border-gray-700/80 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/40">
                      Bonus #{idx + 1}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium">Included Free</span>
                  </div>
                  <h3 className="font-bold text-sm text-white mt-2">
                    {bonus.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {bonus.description}
                  </p>
                </div>

                <a
                  href={bonus.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-gray-800/60 hover:bg-gray-800 text-gray-200 hover:text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-gray-700/50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Access Resource / PDF</span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
