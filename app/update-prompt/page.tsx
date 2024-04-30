"use client";

import { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

interface pageProps {};

const EditPrompt: FC<pageProps> = ({}) => {
  const router = useRouter();
  const { data: session } = useSession<boolean>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<{ prompt: string; tag: string; }>({
    prompt: '',
    tag: ''
  });

  const createPrompt = async (e: MouseEvent) => {
    e.preventDefault(); // prevent reloading
    setSubmitting(true);
    try {
      console.log("Session is ", session);
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      });

      if (response.ok) router.push('/')
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form 
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default EditPrompt;