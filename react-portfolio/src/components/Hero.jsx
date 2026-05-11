import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const Hero = ({ profile }) => {
  const el = useRef(null);

  useEffect(() => {
    let typed;
    if (el.current && profile && profile.role) {
      // Split roles if they are comma separated
      const roles = profile.role.split(',').map(r => r.trim());
      
      typed = new Typed(el.current, {
        strings: roles.length > 0 ? roles : ["Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
      });
    }

    return () => {
      if (typed) {
        typed.destroy();
      }
    };
  }, [profile]);

  if (!profile) return null;

  return (
    <section className="home" id="home">
      <div className="home-content">
        <h3>Hello, It's Me</h3>
        <h1>{profile.name}</h1>
        <h3>And I Work On <span className="text" ref={el}></span></h3>
        <p dangerouslySetInnerHTML={{ __html: profile.description }}></p>
        <div className="home-sci">
          {profile.instagram && (
            <a href={profile.instagram} style={{ "--i": 7 }} target="_blank" rel="noreferrer">
              <i className="bx bxl-instagram"></i>
            </a>
          )}
          {profile.whatsapp && (
            <a href={profile.whatsapp} style={{ "--i": 8 }} target="_blank" rel="noreferrer">
              <i className="bx bxl-whatsapp"></i>
            </a>
          )}
          {profile.github && (
            <a href={profile.github} style={{ "--i": 9 }} target="_blank" rel="noreferrer">
              <i className="bx bxl-github"></i>
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} style={{ "--i": 10 }} target="_blank" rel="noreferrer">
              <i className="bx bxl-linkedin"></i>
            </a>
          )}
        </div>
        <a href="#about" className="btn-box">More About Me</a>
      </div>
      {profile.imageURL && (
        <img className="img" src={profile.imageURL} alt="profile" />
      )}
      <span className="home-imgHover"></span>
    </section>
  );
};

export default Hero;
