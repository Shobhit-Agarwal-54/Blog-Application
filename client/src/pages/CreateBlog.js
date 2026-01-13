import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const CreateBlog = () => {
  const [formData, setFormData] = useState({ title: '', category: '', content: '', image: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await API.post('/blogs', formData);
      alert('Blog created successfully'); 
      navigate('/');
    } catch (err) {
        console.log(err);
      alert('Error creating blog');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input placeholder="Title" className="border p-2" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
        <input placeholder="Category (e.g., Tech)" className="border p-2" onChange={(e) => setFormData({...formData, category: e.target.value})} required />
        <input placeholder="Image URL (Optional)" className="border p-2" onChange={(e) => setFormData({...formData, image: e.target.value})} />
        <textarea placeholder="Content" className="border p-2 h-32" onChange={(e) => setFormData({...formData, content: e.target.value})} required />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Publish</button>
      </form>
    </div>
  );
};

export default CreateBlog;