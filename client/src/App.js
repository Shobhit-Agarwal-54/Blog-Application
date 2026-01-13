import './App.css';
import Navbar from './components/Navbar';
import CreateBlog from './pages/CreateBlog';
import Home from './pages/Home';
import Login from './pages/Login';
import MyBlogs from './pages/MyBlogs';
import Signup from './pages/Signup.js';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.js';
import { Route, Routes } from 'react-router-dom';
import EditBlog from './pages/EditBlog.js';

// Helper for protected routes
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user!=null ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar></Navbar>
      <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes*/}
              <Route 
              path="/edit/:id" 
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
              } />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
            <Route path="/my-blogs" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />
          </Routes>
      </div>

    </div>
  );
}

export default App;
