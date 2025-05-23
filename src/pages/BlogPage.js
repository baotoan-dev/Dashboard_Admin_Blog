import React from 'react';
import BlogList from '../components/BlogList';
import { blogs } from '../data/blogs';

export default function BlogPage() {
  return <BlogList blogs={blogs} />;
}
