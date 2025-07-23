'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoaderModal from './LoaderModal';

export default function RouteChangeLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Show loader for 500ms or until render
    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? <LoaderModal /> : null;
} 