"use client";

import { FC, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

interface pageProps {
  
};

const MyProfile: FC<pageProps> = ({}) => {
    const router = useRouter();
    const { data: session } = useSession<boolean>();
    const [myPosts, setMyPosts] = useState<any[]>([]);

    const handleEdit = (post: any): void => {
        router.push(`/update-prompt?id=${post._id}`);
    };
    
    const handleDelete = async (post: any): Promise<void> => {
        const hasConfirmed = confirm(
          "Are you sure you want to delete this prompt?"
        );
    
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                method: "DELETE",
                });
                const filteredPosts = myPosts.filter((item) => item._id !== post._id);
                setMyPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const fetchPosts = async (): Promise<void> => {
            const response: Response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setMyPosts(data);
        };
            if (session?.user.id) fetchPosts();
      }, [session?.user.id]);

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page'
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default MyProfile;