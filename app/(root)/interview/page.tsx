import Agent from '@/components/Agent';
import { getCurrentUser } from '@/lib/actions/auth.action';
import React from 'react';

const Page = async () => {

    const user = await getCurrentUser();

    return(
        <div className='flex flex-col gap-6'>
            <h3>Interview Generation</h3>

            <Agent userName={user?.name || 'You'} userId={user?.id} type="generate" />
        </div>
    )
}

export default Page;