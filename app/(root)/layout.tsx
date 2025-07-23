import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import RouteChangeLoader from '@/components/RouteChangeLoader';
import UserInfoBar from '@/components/UserInfoBar';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Navbar from '@/components/Navbar';

const Rootlayout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProviderWrapper>
      <RouteChangeLoader />
      <div className='root-layout'>
        <Navbar />
        <div className="w-[100%] mx-auto px-4">
          {children}
        </div>
      </div>
    </SessionProviderWrapper>
  )
}

export default Rootlayout
