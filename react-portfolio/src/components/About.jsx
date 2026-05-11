import React from 'react';

const About = ({ aboutData, profileImage }) => {
  if (!aboutData || aboutData.length === 0) return null;
  const data = aboutData[0]; // Assuming only one row for about

  return (
    <>
      <h2 className="sub-title" id="about">About<span>Me</span></h2>
      <section className="about">
        <div className="about-img">
          {/* using the main profile picture for about section too as per original */}
          <img src={profileImage || "/lakshya.png"} alt="profile pic" />
        </div>
        <div className="about-text">
          <h1>{data.heading || "Full Stack Developer"}</h1>
          <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
          {data.resumeURL && (
            <a href={data.resumeURL} target="_blank" rel="noreferrer" className="btn-box">View Resume</a>
          )}
        </div>
      </section>
    </>
  );
};

export default About;
