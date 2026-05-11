import React, { useContext } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Services from '../components/Services';
import Projects from '../components/Projects';
import { Contact, Footer } from '../components/Contact';
import { DataContext } from '../context/DataContext';

const Portfolio = () => {
  const { data, loading, error } = useContext(DataContext);

  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '20vh' }}>Loading Portfolio Data...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '20vh' }}>Error loading data: {error}</div>;

  const profile = data.profile && data.profile.length > 0 ? data.profile[0] : null;

  return (
    <>
      <Header profileName={profile?.name} />
      <Hero profile={profile} />
      <About aboutData={data.about} profileImage={profile?.imageURL} />
      <Services services={data.services} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} />
      <Projects projects={data.projects} />
      <Contact profile={profile} />
      <Footer profileName={profile?.name} />
    </>
  );
};

export default Portfolio;
