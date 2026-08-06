import { useEffect, useState } from 'react';

const notifications = [
  { name: 'Ahmed R.', city: 'Lahore', time: '2 min pehle', action: 'ne seat book ki ✅' },
  { name: 'Fatima K.', city: 'Karachi', time: '5 min pehle', action: 'ne join kiya ✅' },
  { name: 'Usman M.', city: 'Islamabad', time: '3 min pehle', action: 'ne seat book ki ✅' },
  { name: 'Ayesha B.', city: 'Faisalabad', time: '8 min pehle', action: 'ne enroll kiya ✅' },
  { name: 'Bilal H.', city: 'Rawalpindi', time: '1 min pehle', action: 'ne join kiya ✅' },
  { name: 'Sana T.', city: 'Multan', time: '4 min pehle', action: 'ne seat grab ki ✅' },
  { name: 'Hassan A.', city: 'Peshawar', time: '6 min pehle', action: 'ne book kiya ✅' },
  { name: 'Zainab N.', city: 'Sialkot', time: '2 min pehle', action: 'ne seat li ✅' },
  { name: 'Ali S.', city: 'Hyderabad', time: '7 min pehle', action: 'ne enroll kiya ✅' },
  { name: 'Maryam Q.', city: 'Gujranwala', time: '3 min pehle', action: 'ne join kiya ✅' },
];

export default function SocialProofTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const notif = notifications[currentIndex];

  return (
    <div 
      className={`fixed bottom-4 left-4 z-40 glass-card rounded-lg px-4 py-3 max-w-xs shadow-2xl transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-green to-green-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {notif.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            {notif.name} <span className="text-gray-400 font-normal">({notif.city})</span>
          </p>
          <p className="text-xs text-brand-green">{notif.action}</p>
          <p className="text-xs text-gray-500 mt-0.5">{notif.time}</p>
        </div>
      </div>
    </div>
  );
}
