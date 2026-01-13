import React, { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchMyBlogs = async () => {
      try {
        const { data } = await API.get(`/blogs?author=${user.name}`); 
        setBlogs(data.blogs);
        
    } catch (error) {
        console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/blogs/${id}`); 
      setBlogs(blogs.filter(b => b._id !== id));
      alert("Blog deleted");
    } catch (err) {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    if (user!=null) 
    {
        fetchMyBlogs();
    }
  }, [user]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog,idx) => (
            <div key={blog._id} className="border p-4 rounded bg-gray-50">
                <h3 className="font-bold">{blog.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{blog.category}</p>
                <div className="flex gap-2 mt-4">
                    <Link to={`/edit/${blog._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</Link>
                    <button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;