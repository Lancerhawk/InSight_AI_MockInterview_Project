'use client';
import { ReactNode } from 'react';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProviderWrapper>
      <div className="auth-layout">
        {children}
      </div>
    </SessionProviderWrapper>
  );
}