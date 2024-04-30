"use client";

import { FC, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

interface pageProps {};

const EditPrompt: FC<pageProps> = ({}) => {
  const router = useRouter();
  const seachParams = useSearchParams();
  const promptId = seachParams.get('id');

  const [submitting, setIsSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<{ prompt: string; tag: string; }>({
    prompt: '',
    tag: ''
  });

  useEffect(() => {
    const getPromptDetails = async (): Promise<void> => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form 
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;