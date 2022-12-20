import { Dialog } from '@headlessui/react';
import React from 'react';
import { X } from 'phosphor-react';
import FullscreanLoader from './FullscreanLoader';

interface LockDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lockFile: () => Promise<void>;
}

const LockDialog = (props: LockDialogProps) => {
  const { open, setOpen, lockFile } = props;
  const [loading, setLoading] = React.useState<boolean>(false);

  const acceptDialog = async () => {
    setLoading(true);
    lockFile().then(() => {
      setOpen(false);
      setLoading(false);
    });
  };

  return (
    /* Dialog (modal) */
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className='relative z-50'>
      <div
        className='fixed inset-0 bg-black/30'
        aria-hidden='true'
      />

      {/* Full-screen container to center the panel */}
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='flex flex-col gap-6 mx-auto max-w-lg bg-white p-8 rounded-md shadow-md'>
          {loading && <FullscreanLoader />}

          <div className='flex flex-row flex-1 justify-between'>
            <Dialog.Title className='text-3xl font-bold'>
              Lock File
            </Dialog.Title>

            <button
              onClick={() => setOpen(false)}
              className='hover:bg-neutral-300 transition ease-in-out p-2 rounded-md'>
              <X size={24} />
            </button>
          </div>

          <Dialog.Description className='flex flex-col gap-2'>
            <p>
              This will lock the file <strong> forever!</strong>
            </p>
            <p>
              This action is irreversible. Make sure all your work is saved to
              your liking. After locking the file, you will still be able to
              share it but <strong>no one will be able to edit it.</strong>
            </p>
          </Dialog.Description>

          <div className='flex flex-row gap-4 mt-4'>
            <button
              onClick={acceptDialog}
              className='bg-red-600 font-bold p-2 text-white rounded-md hover:bg-red-700 transition ease-in-out'>
              Lock File
            </button>
            <button
              onClick={() => setOpen(false)}
              className='hover:bg-neutral-300 transition ease-in-out p-2 rounded-md'>
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LockDialog;
