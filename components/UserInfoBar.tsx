'use client';

import { signOut } from 'next-auth/react';
import { User } from 'lucide-react';

export default function UserInfoBar({ name }: { name?: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-2">
        Welcome,
        <User className="w-5 h-5 text-primary-100" />
        <span className="font-semibold text-user-primary">{name}</span>
      </span>
      <button
        className="px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow hover:from-purple-600 hover:to-pink-600 transition-colors duration-200"
        onClick={() => signOut({ callbackUrl: '/sign-in' })}
      >
        Sign out
      </button>
    </div>
  );
} 