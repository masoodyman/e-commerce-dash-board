import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.webp'
import '../App.css';

const Navbar = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  // clear data in logout
  function logout() {
    localStorage.clear();
    navigate("/signup");
  }

  return (
    <div>
      <img className='logo-pic' src={logoImage} alt="logo" />
      {auth ? (
        <ul className='nav-uli'>
          <li>
            <Link to="/"> Products</Link>
            <Link to="/add"> Add Products</Link>
            <Link to="/update">Update Products</Link>
            <Link to="/profile">Profile</Link>
            <Link onClick={logout} to="/signup">Logout({JSON.parse(auth).name})</Link>
          </li>
        </ul>
      ) : (
        <ul className='nav-uli '>
          <li className='nav-right'>
            <Link to="/signup">SignUp</Link>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
