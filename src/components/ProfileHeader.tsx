import { Check } from 'lucide-react';

interface ProfileHeaderProps {
  profile: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
    status: 'online' | 'idle' | 'dnd' | 'offline';
  };
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500'
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group cursor-pointer">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>
        <div className="absolute inset-0 rounded-full border-2 border-gray-600/0 group-hover:border-gray-500/100 transition-all duration-300 shadow-lg group-hover:shadow-gray-700/50"></div>
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-800 shadow-2xl relative z-10 transition-transform duration-300 group-hover:scale-105">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <h1 className="text-3xl font-bold bg-gradient-to-b from-white to-black bg-clip-text text-transparent">{profile.name}</h1>
        {profile.verified && (
          <div className="relative w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-blue-400 group">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
            <Check className="w-5 h-5 text-white relative z-10" strokeWidth={3} />
          </div>
        )}
      </div>
    </div>
  );
}
