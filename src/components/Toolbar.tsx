import {
  TextH,
  TextHOne,
  TextHTwo,
  TextHThree,
  TextHFour,
  TextHFive,
  TextHSix,
  Quotes,
  TextBolder,
  TextItalic,
  TextStrikethrough,
  TextUnderline,
  LinkSimple,
  Code,
  Image,
  CaretDown,
  ListBullets,
  ListNumbers,
} from 'phosphor-react';
import React, { Dispatch, SetStateAction } from 'react';
import { Menu } from '@headlessui/react';

interface toolbarProps {
  setText: Dispatch<SetStateAction<string>>;
}

const headerOptons = [
  {
    icon: TextHOne,
    added: '# ',
  },
  {
    icon: TextHTwo,
    added: '## ',
  },
  {
    icon: TextHThree,
    added: '### ',
  },
  {
    icon: TextHFour,
    added: '#### ',
  },
  {
    icon: TextHFive,
    added: '##### ',
  },
  {
    icon: TextHSix,
    added: '###### ',
  },
];
const toolbarItems = [
  {
    icon: TextBolder,
    added: '**BOLD**',
  },
  {
    icon: TextItalic,
    added: '*ITALIC*',
  },
  {
    icon: TextStrikethrough,
    added: '~~STRIKETHROUGH~~',
  },
  {
    icon: TextUnderline,
    added: '__UNDERLINE__',
  },
  {
    icon: ListBullets,
    added: '- item1\n- item2\n- item3',
  },
  {
    icon: ListNumbers,
    added: '1. item1\n2. item2\n3. item3',
  },
  {
    icon: LinkSimple,
    added: '[LINK](https://example.com)',
  },
  {
    icon: Code,
    added: '```\n CODE \n````',
  },
  {
    icon: Image,
    added: '![IMAGE](https://example.com/image.png)',
  },
  {
    icon: Quotes,
    added: '> QUOTE',
  },
];

const Toolbar = (props: toolbarProps) => {
  const { setText } = props;

  return (
    <div className='flex flex-wrap flex-row gap-2 items-center'>
      <HeaderMenu setText={setText} />
      {toolbarItems.map((item, index) => (
        <button
          key={index}
          className='flex items-center bg-neutral-100 rounded-md p-2 hover:bg-neutral-200 transition ease-in-out'
          onClick={() => {
            setText((prev) => prev + item.added);
          }}>
          <item.icon size={18} />
        </button>
      ))}
    </div>
  );
};

const HeaderMenu = (props: toolbarProps) => {
  const { setText } = props;

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button className='flex items-center bg-neutral-100 rounded-md p-2 hover:bg-neutral-200 transition ease-in-out'>
            <TextH size={18} />
            <CaretDown
              size={12}
              className='ml-2'
            />
          </Menu.Button>
          <Menu.Items
            className={`${
              open ? 'block' : 'hidden'
            } absolute mt-20 z-10 bg-neutral-100 rounded-md p-2 shadow-lg`}>
            {headerOptons.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-neutral-200' : 'bg-neutral-100'
                    } flex items-center w-full rounded-md p-2 hover:bg-neutral-200 transition ease-in-out`}
                    onClick={() => {
                      setText((prev) => prev + item.added);
                    }}>
                    <item.icon size={20} />
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};

export default Toolbar;
