import { useState, useEffect } from 'react';
import { Music, Users, Calendar, MessageCircle, ExternalLink, Github, Twitter, Mail, Eye, Play, Pause } from 'lucide-react';
import ProfileHeader from './components/ProfileHeader';
import StatusBadges from './components/StatusBadges';
import MusicPlayer from './components/MusicPlayer';
import RecentActivity from './components/RecentActivity';
import ServerList from './components/ServerList';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [views, setViews] = useState(9354);
  const [discordStatus, setDiscordStatus] = useState<'online' | 'idle' | 'dnd' | 'offline'>('online');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setViews(prev => prev + Math.floor(Math.random() * 3));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const profileData = {
    name: 'Michael',
    username: 'Michael',
    avatar: '/itachi.jpg',
    verified: true,
    tagline: '',
    bio: '',
    references: 30,
    memberSince: '2020',
    role: 'SELLER',
    status: discordStatus,
    socials: {
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      email: 'contact@example.com',
      website: 'https://example.com'
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>

      <div className="relative">
        <div className="h-64 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center opacity-10" />
          <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
            <Eye className="w-4 h-4 text-gray-300" />
            <span className="text-gray-300 text-sm font-medium">{views.toLocaleString()}</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 -mt-32">
          <ProfileHeader profile={profileData} />

          <StatusBadges
            memberSince={profileData.memberSince}
            status={profileData.status}
          />

          <MusicPlayer />

          <div className="grid md:grid-cols-2 gap-6 mt-8 pb-20">
            <RecentActivity />
            <ServerList />
          </div>
        </div>

        <div className="mt-12">
          <div className="max-w-4xl mx-auto px-6 py-8 text-center">
            <p className="text-gray-400 text-sm">Desenvolvido por Michael</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
