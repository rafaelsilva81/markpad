import { Dialog } from '@headlessui/react';
import { ArrowLeft, LockSimple, Share } from 'phosphor-react';
import React, { useState } from 'react';
import LockDialog from './LockDialog';
import Router from 'next/router';

interface HeaderProps {
  slug: string;
  saveStatus: 'saved' | 'saving' | 'error';
  locked: boolean;
  lockFile: () => Promise<void>;
}
const Header = (props: HeaderProps) => {
  const saveBadges = {
    saved: <span className='text-green-700'>Saved ✔</span>,
    saving: <span className='text-yellow-700'>Saving...</span>,
    error: <span className='text-red-700'>Error ✖</span>,
  };

  const { slug, saveStatus, locked, lockFile } = props;

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <header className='flex flex-row justify-between items-center bg-neutral-100 border-b-2 border-neutral-500 p-4'>
      <div className='flex flex-row gap-2 items-center'>
        <button
          className='flex items-center bg-neutral-100 rounded-md p-2 hover:bg-neutral-200 transition ease-in-out'
          onClick={() => Router.back()}>
          <ArrowLeft size={20} />
        </button>
        <h1 className='md:text-xl font-semibold'>/{slug}</h1>

        <p className='ml-1 text-xs bg-neutral-300 p-2 rounded-md font-semibold cursor-default'>
          {saveBadges[saveStatus]}
        </p>
      </div>

      <div className='flex flex-row'>
        {!locked && (
          <>
            <button
              className='flex flex-row items-center justify-center 
              bg-neutral-100 rounded-md p-2 ml-2 
              hover:bg-neutral-200 transition ease-in-out'
              onClick={() => setOpenDialog(true)}>
              <LockSimple size={20} />
              <span className='ml-2 hidden md:block'>Lock File</span>
            </button>
            <LockDialog
              lockFile={lockFile}
              setOpen={setOpenDialog}
              open={openDialog}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
