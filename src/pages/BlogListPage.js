import React from 'react';
import BlogTable from '../components/BlogTable';
import { blogs } from '../data/blogs';

export default function BlogListPage() {
  const handleEdit = (blog) => {
    console.log('Edit blog:', blog);
  };
  const handleDelete = (blog) => {
    console.log('Delete blog:', blog);
  };
  return <BlogTable blogs={blogs} onEdit={handleEdit} onDelete={handleDelete} />;
}
