import React from 'react';
import BlogTable from '../components/BlogTable';
import { blogs } from '../data/blogs';

export default function BlogListPage() {
  return <BlogTable blogs={blogs} />;
}
