export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <style>{`
        @keyframes breathing {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .breathing {
          animation: breathing 3s ease-in-out infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 2s linear infinite;
        }
      `}</style>
      <div className="flex flex-col items-center gap-8">
        <div className="breathing w-24 h-24 rounded-full overflow-hidden shadow-2xl ring-4 ring-gray-600">
          <img
            src="/itachi.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-400 text-sm tracking-widest">CARREGANDO</p>

          <div className="spin relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gray-400 border-r-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
