import InterviewCard from '@/components/InterviewCard';
import { Button } from '@/components/ui/button';
import { dummyInterviews } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import UserInfoBar from '@/components/UserInfoBar';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/sign-in');
  }
  return (
    <div className='max-w-5xl mx-auto'>
      <section className='card-cta'>

        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview ready with AI-Powered Practice & Feedback</h2>
          <p>Practice job interviews with AI, get personalized feedback, and improve your skills.</p>
          <Button className='btn' asChild>
            <Link href="/interview">Start an Interview</Link>
          </Button>

        </div>

        <Image
          src="/robot.png"
          alt="Hero Image"
          width={400}
          height={400}
          className='max-sm:hidden'
        />

      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>

        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCard { ...interview} key={interview.id}/>
          ))}
        </div>

          <p>You Haven&apos;t taken any interviews yet!</p>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an Interview</h2>

        <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCard { ...interview} key={interview.id}/>
          ))}

        </div>
      </section>
    </div>
  )
}

export default page;
