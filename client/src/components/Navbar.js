import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold"><Link to="/">BlogApp</Link></h1>
      <div>
        {user ? (
          <>
            <Link to="/" className="mr-4">All Blogs</Link>
            <Link to="/my-blogs" className="mr-4">My Blogs</Link>
            <Link to="/create" className="mr-4 bg-blue-500 px-3 py-1 rounded">Create +</Link>
            <button onClick={handleLogout} className="text-red-400">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;