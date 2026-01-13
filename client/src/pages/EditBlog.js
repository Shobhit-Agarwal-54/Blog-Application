import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const EditBlog = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await API.get(`/blogs/${id}`);
        console.log(data);
        

        if (data.blog.userId && data.blog.userId !== user._id && data.blog.author !== user.name) {
             alert("You are not authorized to edit this blog.");
             navigate('/');
             return;
        }

        setFormData({
          title: data.blog.title,
          category: data.blog.category,
          content: data.blog.content,
          image: data.blog.image || '',
        });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blog details", err);
        setError('Could not load blog details.');
        setLoading(false);
      }
    };

    if (user) {
      fetchBlog();
    }
  }, [id, user, navigate]);

  // 2. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await API.put(`/blogs/${id}`, formData);
      
      alert('Blog updated successfully!');
      navigate('/my-blogs');
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || 'Update failed';
      alert(`Error: ${errorMessage}`);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>

 
        <div>
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <input 
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Tech, Lifestyle"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>


        <div>
          <label className="block text-gray-700 font-bold mb-2">Image URL (Optional)</label>
          <input 
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea 
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border p-2 h-40 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required 
          />
        </div>


        <div className="flex gap-4 mt-4">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-200"
          >
            Update Blog
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/my-blogs')}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;