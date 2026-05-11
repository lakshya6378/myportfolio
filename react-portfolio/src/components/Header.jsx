import React, { useState } from 'react';

const Header = ({ profileName }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <header className="header">
      <a href="#" className="logo">{profileName || "Portfolio"}</a>
      <nav className={`navbar ${isActive ? 'active' : ''}`}>
        <a href="#" style={{ "--i": 1 }} className="nav-item" onClick={closeMenu}>Home</a>
        <a href="#about" style={{ "--i": 2 }} className="nav-item" onClick={closeMenu}>About</a>
        <a href="#skills" style={{ "--i": 3 }} className="nav-item" onClick={closeMenu}>Skills</a>
        <a href="#experience" style={{ "--i": 4 }} className="nav-item" onClick={closeMenu}>Experience</a>
        <a href="#projects" style={{ "--i": 5 }} className="nav-item" onClick={closeMenu}>Projects</a>
        <a href="#contact" style={{ "--i": 6 }} className="nav-item" onClick={closeMenu}>Contact</a>
      </nav>
      <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="hambar"></span>
        <span className="hambar"></span>
        <span className="hambar"></span>
      </div>
    </header>
  );
};

export default Header;
