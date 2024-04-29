import { FC } from 'react';
import Link from 'next/link';

interface FormProps {
  type: string;
  post: { prompt: string; tag: string; };
  setPost: (arg0: { prompt: string; tag: string; }) => void;
  submitting: boolean;
  handleSubmit: (e: MouseEvent) => Promise<void>;
};

const Form: FC<FormProps> = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your magination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        {/* Write Prompt */}
        <label>
          <span className='font-satoshit font-semibold text-bae text-gray-700'>Your AI Prompt</span>
        </label>
        <textarea 
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder='Write your prompt here...'
          required
          className='form_textarea'
        />
        {/* Tag */}
        <label>
          <span className='font-satoshit font-semibold text-bae text-gray-700'>
            Tag 
            <span className='font-normal'> (#product, #webdevelopment, #idea)</span>
          </span>
        </label>
        <input 
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder='#tag'
          required
          className='form_input'
        />
        {/* Buttons for Cancel/Submit */}
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link
            href='/'
            className='text-gray-500 text-sm'
          >
            Cancel
          </Link>
          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;