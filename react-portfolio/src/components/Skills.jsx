import React from 'react';

const Skills = ({ skills }) => {
  if (!skills || skills.length === 0) return null;

  const technicalSkills = skills.filter(s => s.category === 'Technical' || !s.category);
  const professionalSkills = skills.filter(s => s.category === 'Professional');

  // Split technical skills into two sets for UI layout if needed
  const half = Math.ceil(technicalSkills.length / 2);
  const set1 = technicalSkills.slice(0, half);
  const set2 = technicalSkills.slice(half);

  const getIconColor = (iconClass) => {
    if (!iconClass) return '#00eeff';
    if (iconClass.includes('html5')) return '#e34c26';
    if (iconClass.includes('css3')) return '#264de4';
    if (iconClass.includes('javascript')) return '#f0db4f';
    if (iconClass.includes('c-plus-plus')) return '#00599c';
    if (iconClass.includes('react')) return '#61dafb';
    if (iconClass.includes('redux')) return '#764abc';
    if (iconClass.includes('nodejs')) return '#68a063';
    if (iconClass.includes('mongodb')) return '#47A248';
    if (iconClass.includes('sass')) return '#cc6699';
    if (iconClass.includes('bootstrap')) return '#7952b3';
    if (iconClass.includes('git')) return '#F05032';
    if (iconClass.includes('data')) return '#00758F'; // SQL
    if (iconClass.includes('terminal')) return '#FCC624'; // Linux
    if (iconClass.includes('copyright')) return '#A8B9CC'; // C
    return '#00eeff';
  };

  return (
    <>
      <h1 className="sub-title" id="skills">My <span>Skills</span></h1>
      <section className="skills">
        <div className="container1 technicals">
          <h1 className="heading1">Technical Skills</h1>
          <div className="technical-bars">
            <div className="skill-set-1">
              {set1.map(skill => (
                <div className="bar" key={skill.id || skill.name}>
                  <i style={{ color: getIconColor(skill.icon) }} className={skill.icon || "bx bxl-html5"}></i>
                  <div className="info">
                    <span>{skill.name}</span>
                  </div>
                  <div className="progress-line" style={{ "--j": `${skill.percentage}%` }}>
                    <span style={{ width: `${skill.percentage}%` }}></span>
                  </div>
                </div>
              ))}
            </div>
            <div className="skill-set-2">
              {set2.map(skill => (
                <div className="bar" key={skill.id || skill.name}>
                  <i style={{ color: getIconColor(skill.icon) }} className={skill.icon || "bx bxl-nodejs"}></i>
                  <div className="info">
                    <span>{skill.name}</span>
                  </div>
                  <div className="progress-line" style={{ "--j": `${skill.percentage}%` }}>
                    <span style={{ width: `${skill.percentage}%` }}></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {professionalSkills.length > 0 && (
          <div className="container1 professionals">
            <h1 className="heading1">Professional Skills</h1>
            <div className="radial-bars">
              {professionalSkills.map((skill, index) => (
                <div className="radial-bar" key={skill.id || index}>
                  <svg x="0px" y="0px" viewBox="0 0 200 200">
                    <circle className="progress-bar" cx="100" cy="100" r="80"></circle>
                    <circle className={`path path-${(index % 4) + 1}`} cx="100" cy="100" r="80" style={{ strokeDashoffset: 502 - (502 * skill.percentage) / 100 }}></circle>
                  </svg>
                  <div className="percentage">{skill.percentage}%</div>
                  <div className="text">{skill.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Skills;
