import { Users } from 'lucide-react';

export default function ServerList() {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-blue-400" />
        <h2 className="text-blue-400 font-semibold text-sm uppercase tracking-wide">Featured Servers</h2>
      </div>

      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 text-sm">No servers yet</p>
      </div>
    </div>
  );
}
