import Head from 'next/head';
import MarkdwonIcon from '../assets/markdown.svg';
import { LockSimple, Link, Plus } from 'phosphor-react';
import Image from 'next/image';
import React from 'react';
import Router from 'next/router';
import FullscreanLoader from '../components/FullscreanLoader';
import Logo from '../assets/logo.png';

const Home = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = React.useState(false);

  const goToPage = async () => {
    if (inputRef.current) {
      const url = inputRef.current.value;
      if (!url) return;
      // Check regex here /^[a-z0-9-]+$/
      let regex = /^[a-z0-9-]+$/;
      if (!regex.test(url)) {
        alert(
          'Invalid URL, please use only lowercase letters, numbers and dashes.'
        );
        return;
      }

      setLoading(true);
      Router.push(`/${url}`).then(() => setLoading(false));
    }
  };

  return (
    <>
      <Head>
        <title>Markpad</title>
        <meta
          name='description'
          content='Markpad is a simple markdown editor, built for sharing notes and ideas.'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </Head>

      <main className='w-screen h-screen bg-neutral-100 flex flex-col items-center justify-center gap-4'>
        {loading && <FullscreanLoader />}

        {/* Title */}
        <div className='flex flex-row items-center justify-center'>
          <h1 className='text-4xl font-bold'>Markpad</h1>
          <Image
            src={Logo}
            width={48}
            height={48}
            alt='markpad-logo'
          />
        </div>
        <p className='text-lg'>
          A simple markdown editor, built with Next.js and Tailwind CSS.
        </p>

        {/* Feature list */}
        <ol className='flex flex-row gap-8'>
          <li className='flex flex-row gap-2 items-center'>
            <Plus className='w-6 h-6' />
            <p className=''>Create a new page</p>
          </li>
          <li className='flex flex-row gap-2 items-center'>
            <Image
              alt='md-icon'
              src={MarkdwonIcon}
              width={24}
              height={24}
            />
            <p className=''>Write some markdown</p>
          </li>
          <li className='flex flex-row gap-2 items-center'>
            <LockSimple className='w-6 h-6' />
            <p className=''>Lock your page</p>
          </li>
          <li className='flex flex-row gap-2 items-center'>
            <Link className='w-6 h-6' />
            <p className=''>Share it to whoever you want!</p>
          </li>
        </ol>

        <p className='text-lg mt-2'>
          Create a new page by clicking the button below or just enter a new
          url!
        </p>

        {/* Create new page button */}
        <h2 className='text-2xl font-bold mt-8'>Ready to begin?</h2>
        <div className='flex flex-row gap-2'>
          <input
            type='text'
            className='w-96 p-2 border-2 border-neutral-500 rounded-md'
            placeholder='Enter a new url for your page'
            ref={inputRef}
          />
          <button
            className='p-2 rounded-md hover:bg-neutral-300 transition ease-in-out border-2 border-neutral-500'
            onClick={goToPage}>
            Create new page
          </button>
        </div>
        <span className='text-neutral-500 font-semibold'>
          Please enter a valid url, only lowercase letters, numbers and dashes
          are allowed.
        </span>

        {/* Footer fixed to bottom*/}
        <footer className='absolute bottom-0 left-0 w-full flex flex-row justify-center gap-2 p-4'>
          <p className='text-neutral-600'>
            Built with ❤️ by{' '}
            <a
              href='https://rafaeldev.me'
              target='_blank'
              rel='noreferrer'
              className='text-neutral-600 font-bold hover:bg-neutral-300 rounded-md p-1 transition ease-in-out'>
              @rafaelsilva81
            </a>
          </p>
        </footer>
      </main>
    </>
  );
};

export default Home;
