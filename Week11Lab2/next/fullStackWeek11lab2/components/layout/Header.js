import Link from 'next/link';
import classes from './Header.module.css';
import { useState, useRef } from 'react';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef(null);

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a className={classes.logoLink}>
          <span className={classes.icon}>🏔️</span>
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
          <li><Link href='/trek-admin'>Admin</Link></li>
          <li><Link href='/list-users'>Users</Link></li>
          <li><Link href='/login'>Login</Link></li>
          <li>
            <Link href='/create-mountain'>
              <a className={classes.addButton}>+</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
