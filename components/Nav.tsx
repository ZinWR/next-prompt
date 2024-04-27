"use client";

import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

interface NavProps {
  
};

const Nav: FC<NavProps> = ({}) => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState<object | null>(null);

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
          src='/assets/images/logo.svg'
          alt='Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Next Prompt</p>
      </Link>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link 
              href="/create-prompt"
              className='black_btn'
            >
              Create Post
            </Link>

            <button 
              type='button' 
              onClick={signOut}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link
              href='/profile'
            >
              <Image 
                src='/assets/images/logo.svg'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  type='button'
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;