import Link from 'next/link';
import classes from './Header.module.css';
import { useState, useRef, useEffect } from 'react';
import { isAdmin } from '../../utils/auth';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setIsUserAdmin(isAdmin());
    setIsLoggedIn(!!localStorage.getItem('user'));
    
    const handleStorageChange = () => {
      setIsUserAdmin(isAdmin());
      setIsLoggedIn(!!localStorage.getItem('user'));
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('login', handleStorageChange);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('login', handleStorageChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAddClick = (e) => {
    if (!isAdmin()) {
      e.preventDefault();
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutPopup(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <header className={`${classes.header} ${isScrolled ? classes.scrolled : ''}`}>
      <Link href='/'>
        <a className={classes.logoLink}>
          <span className={classes.icon} style={{filter: 'grayscale(100%) brightness(1.2)'}}>🏔️</span>
          <span className={classes.logo}>Trekking Microservice Application</span>
        </a>
      </Link>
      <nav>
        <ul className={classes.nav}>
          <li><Link href='/'>Home</Link></li>
          <li className={classes.dropdown}>
            <span 
              className={classes.dropdownToggle}
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setShowDropdown(true);
              }}
              onMouseLeave={() => {
                timeoutRef.current = setTimeout(() => setShowDropdown(false), 100);
              }}
            >
              Explore ▾
            </span>
            {showDropdown && (
              <div 
                className={classes.dropdownMenu}
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  setShowDropdown(true);
                }}
                onMouseLeave={() => {
                  timeoutRef.current = setTimeout(() => setShowDropdown(false), 100);
                }}
              >
                <Link href='/trails'><a>🏔️ Mountain Trails</a></Link>
                <Link href='/maps'><a>🗺️ Trail Maps</a></Link>
                <Link href='/camping'><a>⛺ Camping Sites</a></Link>
                <Link href='/gear'><a>🥾 Gear Guide</a></Link>
              </div>
            )}
          </li>
          <li><Link href='/trek-microservice'>Mountains</Link></li>
          {isUserAdmin && <li><Link href='/trek-admin'>Admin</Link></li>}
          {isUserAdmin && <li><Link href='/list-users'>Users</Link></li>}
          {!isLoggedIn && <li><Link href='/login'>Login</Link></li>}
          {isLoggedIn && (
            <li>
              <button 
                onClick={handleLogout}
                style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
              >
                Logout
              </button>
            </li>
          )}
          {isUserAdmin && (
            <li>
              <Link href='/create-mountain'>
                <a className={classes.addButton}>+</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {showPopup && (
        <div style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 1000, padding: '1rem 1.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: '#dc3545', color: 'white', fontWeight: 'bold', animation: 'slideIn 0.3s ease-out' }}>
          🚫 Admin access required
        </div>
      )}
      {showLogoutPopup && (
        <div style={{ position: 'fixed', top: '80px', right: '20px', zIndex: 1000, padding: '1rem 1.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', background: '#4CAF50', color: 'white', fontWeight: 'bold', animation: 'slideIn 0.3s ease-out' }}>
          ✅ Successfully logged out
        </div>
      )}
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </header>
  );
}
