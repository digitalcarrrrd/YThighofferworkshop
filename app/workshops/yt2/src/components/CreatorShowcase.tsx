const successStories = [
  {
    channelType: 'Finance Faceless',
    emoji: '💰',
    subscribers: '120K+',
    monthlyEarning: '$3,200',
    monthsToMonetize: '4',
    videosPerWeek: '3',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    channelType: 'History & Facts',
    emoji: '📚',
    subscribers: '85K+',
    monthlyEarning: '$1,800',
    monthsToMonetize: '5',
    videosPerWeek: '2',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    channelType: 'Motivation',
    emoji: '🔥',
    subscribers: '200K+',
    monthlyEarning: '$2,500',
    monthsToMonetize: '6',
    videosPerWeek: '4',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    channelType: 'Tech Reviews',
    emoji: '💻',
    subscribers: '65K+',
    monthlyEarning: '$4,100',
    monthsToMonetize: '7',
    videosPerWeek: '2',
    gradient: 'from-purple-500 to-violet-600',
  },
];

export default function CreatorShowcase() {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-brand-green text-sm font-bold uppercase tracking-wider mb-3">
            Real Channel Examples 📊
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            Aise Channels <span className="highlight-text">Kama Rahe Hain</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Ye faceless channels hain — koi face nahi dikhata, AI se sab hota hai
          </p>
        </div>

        {/* Channel Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {successStories.map((story, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all group">
              {/* Channel Header */}
              <div className={`bg-gradient-to-br ${story.gradient} p-4 text-center`}>
                <span className="text-4xl">{story.emoji}</span>
                <h3 className="text-white font-bold mt-2">{story.channelType}</h3>
              </div>
              
              {/* Stats */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">Subscribers</span>
                  <span className="text-white font-bold text-sm">{story.subscribers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">Monthly Earning</span>
                  <span className="text-brand-green font-bold text-sm">{story.monthlyEarning}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">Monetized in</span>
                  <span className="text-brand-gold font-bold text-sm">{story.monthsToMonetize} months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-xs">Videos/Week</span>
                  <span className="text-accent-blue font-bold text-sm">{story.videosPerWeek}</span>
                </div>
                
                <div className="pt-2 border-t border-dark-border">
                  <p className="text-gray-400 text-xs text-center">
                    PKR <span className="text-white font-bold">
                      {(parseFloat(story.monthlyEarning.replace('$', '').replace(',', '')) * 278).toLocaleString()}
                    </span>/month
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          * Ye real channel data hai — exact channels privacy ki wajah se nahi dikhaye
        </p>
      </div>
    </section>
  );
}
