import React from 'react';
import prisma from '../lib/database';
import Head from 'next/head';
import Viewer from '../components/Viewer';
import api from '../lib/axios';
import Header from '../components/Header';
import Toolbar from '../components/Toolbar';
import LockedFooter from '../components/LockedFooter';

/* TODO: Componentizaion and File Locking */

const default_md = `### You can start typing in [Markdown](https://www.markdownguide.org/basic-syntax/) here! 😃 

Just please be **aware when writing personal information here**. This page is public and can be accessed by **anyone**.
`;

interface PageProps {
  page: PageResponse;
}

const Page = (props: PageProps) => {
  const { page } = props;
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
      <Head>
        <title>{slug} - Markpad</title>
        <meta
          name='description'
          content='Markpad'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </Head>
      <main className='h-screen bg-neutral-100 flex flex-col'>
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

        {isLocked && <LockedFooter />}
      </main>
    </>
  );
};

export const getServerSideProps = async (context: { query: { slug: any } }) => {
  const { slug } = context.query;

  // Check regex for slug
  if (!slug.match(/^[a-zA-Z0-9-]+$/)) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }

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
