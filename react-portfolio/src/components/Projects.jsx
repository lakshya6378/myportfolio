import React from 'react';

const Projects = ({ projects }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section>
      <div id="projects">
        <div className="main-text">
          <h2>Latest <span>Projects</span></h2>
          <div className="portfolio-content">
            {projects.map(project => (
              <div className="row" key={project.id || project.title}>
                <img src={project.imageURL || "/resources/landing-page.png"} alt={project.title} />
                <div className="layer">
                  <h5>{project.title}</h5>
                  <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
                  <div className="button-grp">
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer">
                        <i className="bx bx-link-external" style={{ color: 'aliceblue' }}></i>
                      </a>
                    )}
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer">
                        <i className="bx bxl-github" style={{ color: 'aliceblue' }}></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
