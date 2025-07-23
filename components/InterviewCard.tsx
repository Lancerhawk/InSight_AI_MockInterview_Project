import dayjs from 'dayjs';
import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import DisplayTechIcons from './DisplayTechIcons';

const InterviewCard = ({id, userId, role, type, techstack, createdAt, hasFeedback}: InterviewCardProps & { hasFeedback?: boolean }) => {
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type || "Mixed";
    const formattedDate = dayjs(createdAt).format('MMM D, YYYY');
  
    return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
        <div className='card-interview'>
            <div>
                <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
                    <p className='badge-text'>{normalizedType}</p>
                </div>
{/* {getRandomInterviewCover()} */}
                <Image src='/covers/random.png' alt="cover image" width={90} height={90} className='rounded-full object-fit' />

                <h3 className='mt-5 capitalize'>{role} Interview</h3>

                <div className='flex flex-row gap-5 mt-3'>
                    <div className='flex flex-row gap-2'>
                        <Image src="/calendar.svg" alt="calendar icon" width={22} height={22} />
                        <p>{formattedDate}</p>
                    </div>
                </div>

                <p className='line-clamp-2 mt-5'>
                  {hasFeedback
                    ? "You have already taken this interview. You can retake it or view your feedback."
                    : "You haven't taken the interview yet. Take it now to improve your skills."}
                </p>
            </div>

            <div className="flex justify-center gap-0 -mt-5 -mb-5">
                <DisplayTechIcons techStack={techstack} />
            </div>

            <div className='flex flex-row justify-center gap-3 mt-1'>
                <Button className='btn-primary' asChild>
                    <Link href={`/interview/${id}`}>Take Interview</Link>
                </Button>
                {hasFeedback && (
                  <Button className='btn-secondary' asChild>
                    <Link href={`/interview/${id}/feedback`}>Show Feedback</Link>
                  </Button>
                )}
            </div>
        </div>
       
    </div>
  )
}

export default InterviewCard
