import React from 'react';

const FullscreanLoader = () => {
  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-neutral-100 bg-opacity-50 flex items-center justify-center'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-neutral-500' />
    </div>
  );
};

export default FullscreanLoader;
