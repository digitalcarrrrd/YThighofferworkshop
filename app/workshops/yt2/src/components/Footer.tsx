import { Heart, Play, MessageCircle, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-dark-border">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        {/* Social links */}
        <div className="flex items-center justify-center gap-4">
          <a href="#" className="w-10 h-10 rounded-xl bg-dark-surface border border-dark-border flex items-center justify-center text-gray-400 hover:text-brand-red hover:border-brand-red/30 transition-all">
            <Play className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-xl bg-dark-surface border border-dark-border flex items-center justify-center text-gray-400 hover:text-brand-green hover:border-brand-green/30 transition-all">
            <MessageCircle className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-xl bg-dark-surface border border-dark-border flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-500/30 transition-all">
            <Camera className="w-5 h-5" />
          </a>
        </div>

        <div className="text-gray-500 text-xs space-y-1">
          <p>YouTube AI Creator Masterclass — Pakistan's #1 YouTube Workshop</p>
          <p>
            Results mentioned are from real students but individual results may vary.
            <br />
            Success requires consistent effort and dedication.
          </p>
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-brand-red" /> in Pakistan 🇵🇰
          </p>
        </div>
      </div>
    </footer>
  );
}
