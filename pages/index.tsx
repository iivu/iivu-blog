import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import { getDatabaseConnection } from '../lib/getDatabaseConnection';
import { Post } from '../src/entity/Post';

type Props = {
  posts: Post[],
}
const index: NextPage<Props> = (props) => {
  const { posts } = props;
  return (
    <>
      <ul>
        {
          posts.map(post => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}><a>{post.title}</a></Link>
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  };
};
