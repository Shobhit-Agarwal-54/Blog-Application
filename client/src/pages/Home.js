import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  const fetchBlogs = async () => {
    try {
      // GET /blogs?category=...&author=... [cite: 43]
      const url = `/blogs?category=${category}&author=${author}`;
      const { data } = await API.get(url);
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category, author]); // Re-fetch when filters change

  return (
    <div className="p-8">
      <div className="flex gap-4 mb-6">
        <input 
          placeholder="Filter by Category" 
          className="border p-2" 
          onChange={(e) => setCategory(e.target.value)} 
        />
        <input 
          placeholder="Filter by Author Name" 
          className="border p-2" 
          onChange={(e) => setAuthor(e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded shadow bg-white">
             {blog.image && <img src={blog.image} alt="blog" className="h-40 w-full object-cover mb-2"/>}
             <h3 className="font-bold text-lg">{blog.title}</h3>
             <span className="text-sm text-gray-500">{blog.category} | {blog.author}</span>
             <p className="mt-2 text-gray-700">{blog.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;