import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';


import { Post } from 'src/entity/Post';
import { getDatabaseConnection } from '../../lib/getDatabaseConnection';

type Props = {
  posts: Post[],
}
const PostsIndex: NextPage<Props> = (props) => {
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

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  };
};
