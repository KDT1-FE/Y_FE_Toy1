import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import '../styles/Header.css'; 

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <header>
        <nav>
          <div className='header-container'>
            <div className="menu-icon" onClick={toggleMenu}>
              {/* 햄버거 아이콘 */}
              <FiMenu />
            </div>
            <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
              <Link to="#">Home</Link>
              <Link to="#">Wiki</Link>
              <Link to='#'>Gallery</Link>
              <Link to='#'>Study</Link>
            </div>
            <div className="mainText">
              <h1>Study Management</h1>
            </div>
          </div>
        </nav>
      </header>
    );
}


  