import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName]=useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/signup', { email, password,name });
      navigate('/login');
    } catch (err) {
      alert('Signup Failed. Check credentials.');
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <form onSubmit={handleSubmit} className="w-1/3 bg-gray-100 p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Signup</h2>
        <input className="w-full p-2 mb-4 border" type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="w-full p-2 mb-4 border" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 mb-4 border" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;