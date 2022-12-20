import React from 'react';
import prisma from '../lib/database';
import Head from 'next/head';
import Viewer from '../components/Viewer';
import api from '../lib/axios';
import Header from '../components/Header';
import Toolbar from '../components/Toolbar';
import Link from 'next/link';

/* TODO: Componentizaion and File Locking */

const default_md = `### You can start typing in [Markdown](https://www.markdownguide.org/basic-syntax/) here! 😃 

Just please be **aware when writing personal information here**. This page is public and can be accessed by **anyone**.
`;

const Page = ({ page }: { page: PageResponse }) => {
  const { content, slug, locked } = page;
  const [isLocked, setIsLocked] = React.useState<boolean>(locked);
  const [text, setText] = React.useState(content === '' ? default_md : content);
  const [saveStatus, setSaveStatus] = React.useState<
    'saved' | 'saving' | 'error'
  >('saved');

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
    setSaveStatus('saving');
  };

  const lockFile = async () => {
    await api.get('/api/page/lock', { params: { slug } }).then((res) => {
      if (res.status === 200) {
        setIsLocked(true);
      }
    });
  };

  // Save to DB after 5 seconds of inactivity
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (saveStatus === 'saving') {
        api
          .post('/api/page/save', {
            slug,
            content: text,
            locked: isLocked,
          })
          .then((res) => {
            if (res.status === 200) {
              setSaveStatus('saved');
            } else {
              setSaveStatus('error');
            }
          });
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [slug, saveStatus, isLocked, text]);

  return (
    <>
      <main className='h-screen w-screen bg-neutral-100 flex flex-col'>
        {/* Header */}
        {!isLocked && (
          <Header
            slug={slug}
            locked={isLocked}
            saveStatus={saveStatus}
            lockFile={lockFile}
          />
        )}

        {/* Content */}
        <div className='flex flex-col md:flex-row flex-grow flex-1 p-3 w-full gap-4'>
          {!isLocked && (
            <div className='flex flex-col flex-grow flex-1'>
              <Toolbar setText={setText} />
              <textarea
                className='flex-grow flex-1 bg-neutral-100 border-2 border-neutral-500 rounded-md p-4 resize-none'
                value={text}
                onChange={handleInput}
              />
            </div>
          )}

          <div className='flex flex-1'>
            <Viewer text={text} />
          </div>
        </div>
      </main>

      {isLocked && (
        <footer>
          <div className='fixed bottom-0 left-0 w-full bg-neutral-100 p-4'>
            <div className='flex flex-row justify-between'>
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
          </div>
        </footer>
      )}
    </>
  );
};

export const getServerSideProps = async (context: { query: { slug: any } }) => {
  const { slug } = context.query;

  //TODO: Get page from database
  let data = await prisma.markpad_Page.findUnique({
    where: {
      slug,
    },
  });

  if (!data) {
    data = await prisma.markpad_Page.create({
      data: {
        slug,
        content: '',
      },
    });
  }

  // To JSON
  const result = JSON.parse(JSON.stringify(data)) as PageResponse;
  console.log(result);

  return {
    props: {
      page: result,
    },
  };
};

export default Page;
