import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import '../styles/Header.css'; 

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <nav>
        <div className='header-container'>
          <div className="pageList">
            <Link to="/" className={`page ${location.pathname === '/' ? 'active' : ''}`}>
              메인
            </Link>
            <Link to="/wiki" className={`page ${location.pathname === '/wiki' ? 'active' : ''}`}>
              위키
            </Link>
            <Link to="/gallery" className={`page ${location.pathname === '/gallery' ? 'active' : ''}`}>
              갤러리
            </Link>
            <Link to="/study" className={`page ${location.pathname === '/study' ? 'active' : ''}`}>
              스터디
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}


// export default function Header() {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
  
//     const toggleMenu = () => {
//       setIsMenuOpen(!isMenuOpen);
//     };
  
//     return (
//       <header>
//         <nav>
//           <div className='header-container'>
//             <div className="menu-icon" onClick={toggleMenu}>
//               {/* 햄버거 아이콘 */}
//               <FiMenu />
//             </div>
//             <div className={`menu ${isMenuOpen ? 'active' : ''}`}>
//               <Link to="#">Home</Link>
//               <Link to="#">Wiki</Link>
//               <Link to='#'>Gallery</Link>
//               <Link to='#'>Study</Link>
//             </div>
//             <div className="mainText">
//               <h1>Study Management</h1>
//             </div>
//           </div>
//         </nav>
//       </header>
//     );
// }