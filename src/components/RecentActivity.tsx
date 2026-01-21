import { useEffect, useRef, useState } from 'react';
import { Activity } from 'lucide-react';

interface Visitor {
  id: number;
  name: string;
  avatar: string;
  timestamp: number;
  isExiting?: boolean;
}

export default function RecentActivity() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [, setTick] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const visitorIdRef = useRef(0);
  const usedVisitorsRef = useRef<Set<string>>(new Set());

  const allVisitors = [
    { name: 'RiKel • き', avatar: '/1.jpg' },
    { name: 'Silva RBN', avatar: '/2.jpg' },
    { name: 'stress', avatar: '/3.jpg' },
    { name: 'th', avatar: '/4.jpg' },
    { name: '͞ML7', avatar: '/5.jpg' },
    { name: 'Порез на собаке', avatar: '/6.jpg' },
    { name: 'DARKZNN 新入り', avatar: '/7.jpg' },
    { name: '𝑨𝒏𝒂', avatar: '/8.jpg' },
    { name: 'ManuZita', avatar: '/9.jpg' },
    { name: '* ガラゴル', avatar: '/10.jpg' },
    { name: 'PABLOZx ..', avatar: '/1 copy.jpg' },
    { name: '11P caiozx22', avatar: '/2 copy.jpg' },
    { name: 'Gabriel.M', avatar: '/3 copy.jpg' },
    { name: 'Mdzinffz', avatar: '/4 copy.jpg' },
    { name: 'PeLkão', avatar: '/4b1f4f77b53110ba2c1caf0949532f6f.jpg' },
    { name: '𝖘𝖒𝖔𝖐𝖊', avatar: '/1.jpg' },
    { name: 'Thzx', avatar: '/2.jpg' },
    { name: '͞GiGaa', avatar: '/3.jpg' },
    { name: '𝓿𝓻𝓾𝓶𝓪𝓻†', avatar: '/4.jpg' },
    { name: '"𝕭𝕬𝕷𝕬', avatar: '/5.jpg' },
    { name: '#Lv', avatar: '/6.jpg' },
    { name: "'7", avatar: '/7.jpg' },
    { name: "'Igorkj", avatar: '/8.jpg' },
    { name: "'Skiros", avatar: '/9.jpg' },
    { name: "'𝑭𝒓𝒐𝒚", avatar: '/10.jpg' },
    { name: '+1', avatar: '/1 copy.jpg' },
    { name: '+fael', avatar: '/2 copy.jpg' },
    { name: 'noirluv', avatar: '/3 copy.jpg' },
    { name: 'nyxvoid', avatar: '/4 copy.jpg' },
    { name: 'irisfade', avatar: '/4b1f4f77b53110ba2c1caf0949532f6f.jpg' },
    { name: 'umbra.wav', avatar: '/1.jpg' },
    { name: 'vanta.exe', avatar: '/2.jpg' },
    { name: 'akira.noir', avatar: '/3.jpg' },
    { name: 'luna.nyx', avatar: '/4.jpg' },
    { name: 'eris_m', avatar: '/5.jpg' },
    { name: 'raven.s', avatar: '/6.jpg' },
    { name: 'kuro.v', avatar: '/7.jpg' },
    { name: 'ash.vx', avatar: '/8.jpg' },
    { name: 'cypher.ink', avatar: '/9.jpg' },
    { name: 'ghost.wav', avatar: '/10.jpg' },
  ];

  const getRandomInterval = () => Math.floor(Math.random() * 5000) + 8000;

  const getAvailableVisitor = () => {
    const availableVisitors = allVisitors.filter(v => !usedVisitorsRef.current.has(v.name));

    if (availableVisitors.length === 0) {
      usedVisitorsRef.current.clear();
      const availableAgain = allVisitors.filter(v => !usedVisitorsRef.current.has(v.name));
      return availableAgain[Math.floor(Math.random() * availableAgain.length)];
    }

    return availableVisitors[Math.floor(Math.random() * availableVisitors.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!sectionVisible) return;

    const addNewVisitor = () => {
      const randomVisitor = getAvailableVisitor();
      usedVisitorsRef.current.add(randomVisitor.name);

      const newVisitor: Visitor = {
        id: visitorIdRef.current++,
        name: randomVisitor.name,
        avatar: randomVisitor.avatar,
        timestamp: Date.now()
      };

      setVisitors((prev) => {
        let updated = [newVisitor, ...prev];

        if (updated.length > 3) {
          const lastIndex = updated.length - 1;
          const removedVisitor = updated[lastIndex];
          updated[lastIndex].isExiting = true;

          setTimeout(() => {
            setVisitors((current) => current.filter((v) => v.id !== removedVisitor.id));

            setTimeout(() => {
              usedVisitorsRef.current.delete(removedVisitor.name);
            }, 30000);
          }, 500);
        }

        return updated;
      });
    };

    if (visitors.length === 0) {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          addNewVisitor();
        }, i * 600);
      }
    } else {
      const interval = setTimeout(() => {
        addNewVisitor();
      }, getRandomInterval());

      return () => clearTimeout(interval);
    }
  }, [sectionVisible, visitors.length]);

  const getTimeElapsed = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 5) {
      return 'entrou agora';
    } else if (seconds < 60) {
      return `entrou há ${seconds}s`;
    } else {
      const minutes = Math.floor(seconds / 60);
      return `entrou há ${minutes}m`;
    }
  };

  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-green-400" />
        <h2 className="text-green-400 font-semibold text-sm uppercase tracking-wide">Entradas Recentes</h2>
      </div>

      <div ref={containerRef} className="space-y-3">
        {visitors.map((visitor) => (
          <div
            key={visitor.id}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all
              ${
                visitor.isExiting
                  ? 'animate-fade-slide-out'
                  : 'animate-fade-slide-down'
              }`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex-shrink-0 ring-2 ring-green-400/20">
              <img src={visitor.avatar} alt={visitor.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{visitor.name}</p>
              <p className="text-gray-400 text-xs">{getTimeElapsed(visitor.timestamp)}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
