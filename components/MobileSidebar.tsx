'use client';
import { useEffect } from 'react';
import { User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function MobileSidebar({ open, onClose, name }: { open: boolean, onClose: () => void, name?: string }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-[#18181b] shadow-lg transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Sidebar"
      >
        <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={onClose} aria-label="Close sidebar">✕</button>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <div className="mt-8 mb-4">
            <Image src="/logo.svg" alt="Logo" width={24} height={20} className="w-6 h-5" />
          </div>
          <span className="flex items-center gap-2 text-lg">
            Welcome,
            <User className="w-5 h-5 text-primary-100" />
            <span className="font-semibold text-user-primary">{name}</span>
          </span>
          <button
            className="px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow hover:from-purple-600 hover:to-pink-600 transition-colors duration-200"
            onClick={() => { onClose(); signOut({ callbackUrl: '/sign-in' }); }}
          >
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
} 