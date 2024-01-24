// pages/blog/index.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const BlogPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return null;
};

BlogPage.authGuard = false;

export default BlogPage;
