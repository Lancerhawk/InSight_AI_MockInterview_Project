import Agent from '@/components/Agent';
import React from 'react';

const Page = ()=> {
    return(
        <div className='flex flex-col gap-6'>
            <h3>Interview Generation</h3>

            <Agent userName="You" userId="user1" type="generate" />
        </div>
    )
}

export default Page;