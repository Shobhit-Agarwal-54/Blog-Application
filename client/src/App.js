
import './App.css';
import Navbar from './components/Navbar';
import CreateBlog from './pages/CreateBlog';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Login></Login>
      <Home></Home>
      <CreateBlog></CreateBlog>
    </div>
  );
}

export default App;
