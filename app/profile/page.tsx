"use client";

import { FC, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Profile from '@components/Profile';

interface pageProps {
  
};

const MyProfile: FC<pageProps> = ({}) => {
    const handleEdit = async (): Promise<void> => {};
    const handleDelete = async (): Promise<void> => {};

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={[]}
            handleEdit={handleEdit}
            handleDelete={handleDelete}

        />
    );
};

export default MyProfile;