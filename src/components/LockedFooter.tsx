import Link from 'next/link';
import React from 'react';

const LockedFooter = () => {
  return (
    <footer className='max-w-screen'>
      <div className='flex flex-row justify-between p-2 bg-slate-200'>
        <p className='text-neutral-500'>
          {`This page is locked and you can't edit it. To create a new page, `}
          <Link
            href='/'
            className='font-bold text-neutral-600'>
            click here
          </Link>
        </p>

        <p className='text-neutral-500'>
          Markpad - Built with ❤️ by{' '}
          <a
            href='https://rafaeldev.me'
            target='_blank'
            rel='noreferrer'
            className='text-neutral-600 font-bold hover:bg-neutral-300 rounded-md p-1 transition ease-in-out'>
            @rafaelsilva81
          </a>
        </p>
      </div>
    </footer>
  );
};

export default LockedFooter;
