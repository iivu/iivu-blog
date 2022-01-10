import React, { useCallback } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import { usePosts } from '../../hooks/usePosts';
import { getPosts } from '../../lib/posts';

type Props = {
  posts: Post[];
}
const PostsIndex: NextPage<Props> = (props) => {
  const { posts } = props;
  console.log(posts);
  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(p => <div key={p.id}>
        <Link href={`/posts/${p.id}`}>
          <a>
            {p.id}
          </a>
        </Link>
      </div>)}
    </div>
  );
};

export default PostsIndex;

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};
