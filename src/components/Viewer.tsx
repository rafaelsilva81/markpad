import Image from 'next/image';
import React, { FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownComponents: object = {
  p: (paragraph: { children?: any; node?: any }) => {
    const { node } = paragraph;

    if (node.children[0].tagName === 'img') {
      const image = node.children[0];
      const metastring = image.properties.alt;
      const alt = metastring?.replace(/ *\{[^)]*\} */g, '');
      const width = '500';
      const height = '500';

      return (
        <Image
          src={image.properties.src}
          width={width}
          height={height}
          className='postImg'
          alt={alt}
        />
      );
    }
    return <p>{paragraph.children}</p>;
  },
};

const Viewer = ({ text: data }: { text: string }) => {
  return (
    <article className='prose max-w-full p-4 md:mt-8'>
      <ReactMarkdown components={MarkdownComponents}>{data}</ReactMarkdown>
    </article>
  );
};

export default Viewer;
