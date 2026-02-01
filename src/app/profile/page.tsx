'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUserData } from '@/lib/mockData';
import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/protected-route';

function ProfileContent() {
  const router = useRouter();
  const { user: authUser, logout } = useAuth();
  const userId = authUser?.id ?? 'user_1';
  const user = getUserData(userId);
  const userName = user?.name ?? 'Guest';
  const initials = userName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-6 px-4 pb-24">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      {/* User Info */}
      <div className="bg-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold overflow-hidden">
            {user?.profileImage ? (
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url("${user.profileImage}")` }}
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{userName}</h2>
            <p className="text-gray-400">Gym Member</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-2 mb-6">
        <button className="w-full bg-slate-800 hover:bg-slate-700 rounded-xl p-4 text-left transition">
          ⚙️ Account Settings
        </button>
        <button className="w-full bg-slate-800 hover:bg-slate-700 rounded-xl p-4 text-left transition">
          🔔 Notifications
        </button>
        <button className="w-full bg-slate-800 hover:bg-slate-700 rounded-xl p-4 text-left transition">
          📱 Preferences
        </button>
      </div>

      {/* About Section Link */}
      <Link
        href="/about"
        className="block bg-slate-800 hover:bg-slate-700 rounded-xl p-4 text-left transition mb-6"
      >
        ℹ️ About This App
      </Link>

      {/* Logout Button */}
      <button
        onClick={() => {
          logout();
          router.push('/login');
        }}
        className="w-full bg-red-600 hover:bg-red-700 rounded-xl p-4 text-left transition font-semibold"
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
