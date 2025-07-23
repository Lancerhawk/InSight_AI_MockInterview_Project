'use client';

import AuthForm from '@/components/AuthForm';
import React from 'react'
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);
  return <AuthForm type="sign-in" />
}

export default page;
