import { useState, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, Volume2 } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const songs = [
    {
      title: 'Sextape',
      artist: 'Deftones',
      duration: '04:10',
      durationSeconds: 250,
      cover: '/image copy copy.png'
    },
    {
      title: '976-EVIL',
      artist: 'Deftones',
      duration: '05:03',
      durationSeconds: 303,
      cover: '/image copy copy.png'
    },
    {
      title: 'Hail to the King',
      artist: 'Avenged Sevenfold',
      duration: '05:12',
      durationSeconds: 312,
      cover: '/image copy copy copy copy.png'
    }
  ];

  const currentSong = songs[currentSongIndex];
  const totalDuration = currentSong.durationSeconds;

  const handleSkip = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setCurrentTime(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= totalDuration) {
          handleSkip();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / totalDuration) * 100;

  return (
    <div className="mt-8 bg-gradient-to-r from-gray-800/50 to-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <Music className="w-5 h-5 text-green-400" />
        <span className="text-green-400 text-sm font-semibold">LISTENING TO SPOTIFY</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0 shadow-lg">
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-lg truncate">{currentSong.title}</h3>
          <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>

          <div className="mt-3 flex items-center gap-3">
            <span className="text-gray-400 text-xs font-medium min-w-[35px]">{formatTime(currentTime)}</span>
            <div className="flex-1 bg-gray-700 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-green-500 h-full transition-all duration-1000 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-gray-400 text-xs font-medium min-w-[35px]">{currentSong.duration}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-all hover:scale-105">
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white fill-white" />
            ) : (
              <Play className="w-5 h-5 text-white fill-white" />
            )}
          </button>
          <button
            onClick={handleSkip}
            className="p-3 bg-gray-700 hover:bg-gray-600 rounded-full transition-all hover:scale-105"
          >
            <SkipForward className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full transition-all">
            <Volume2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
