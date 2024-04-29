"use client";

import { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

interface pageProps {
  
};

const CreatePrompt: FC<pageProps> = ({}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<{ prompt: string; tag: string; }>({
    prompt: '',
    tag: ''
  });
  
  return (
    <Form 

    />
  );
};

export default CreatePrompt;