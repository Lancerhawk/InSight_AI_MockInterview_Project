'use client';
import Image from 'next/image';
import Link from 'next/link';
import UserInfoBar from './UserInfoBar';
import MobileSidebar from './MobileSidebar';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`sticky top-0 z-30 flex items-center justify-between w-full px-8 py-4 transition-colors duration-300 ${scrolled ? 'bg-[#18181b]/90 backdrop-blur shadow-lg' : ''} rounded-b-xl`}>
      <Link href="/" className='flex items-center gap-2'>
        <Image src="/logo.svg" alt="Logo" width={38} height={32} />
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary-100">InSight AI</h2>
      </Link>
      {session && session.user && (
        <>
          <div className="hidden md:flex"><UserInfoBar name={session.user.name ?? undefined} /></div>
          <button className="md:hidden p-2 rounded hover:bg-gray-700/30 transition-colors" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu className="w-7 h-7 text-primary-100" />
          </button>
          {sidebarOpen && (
            <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} name={session.user.name ?? undefined} />
          )}
        </>
      )}
    </nav>
  );
} 