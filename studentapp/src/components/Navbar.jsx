import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navStyle = {
    backgroundColor: '#343a40',
    padding: '10px 20px',
    color: 'white',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const brandStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: 'white',
    textDecoration: 'none',
    marginBottom: '10px'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    marginRight: '15px',
    padding: '5px',
    transition: 'background-color 0.3s',
  };

  const hoverStyle = {
    backgroundColor: '#495057',
    borderRadius: '5px'
  };

  const [hoveredLink, setHoveredLink] = useState(null);

  const links = [
    { to: '/students', label: 'Students' },
    { to: '/teachers', label: 'Teachers' },
    { to: '/marks', label: 'Marks' }
  ];

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={brandStyle}>Student Marks</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.to}
            style={{
              ...linkStyle,
              ...(hoveredLink === i ? hoverStyle : {})
            }}
            onMouseEnter={() => setHoveredLink(i)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
