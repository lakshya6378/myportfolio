import React from 'react';

const Experience = ({ experience }) => {
  if (!experience || experience.length === 0) return null;

  return (
    <>
      <h2 className="sub-title" id="experience">My <span>Experience</span></h2>
      <section className="experience" style={{ padding: '40px 10%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', maxWidth: '900px', width: '100%', borderLeft: '4px solid #00eeff', paddingLeft: '40px', marginLeft: '20px' }}>
          {experience.map((exp, index) => (
            <div key={exp.id || exp.title} className="experience-item" style={{
              position: 'relative',
              marginBottom: '50px',
              background: '#112e42',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 0 15px rgba(0, 238, 255, 0.1)',
              border: '2px solid transparent',
              transition: '0.4s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#00eeff';
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 238, 255, 0.4)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 238, 255, 0.1)';
            }}
            >
              {/* Timeline Dot */}
              <div style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#081b29',
                border: '4px solid #00eeff',
                left: '-52px',
                top: '35px',
                boxShadow: '0 0 10px #00eeff'
              }}></div>
              
              <h3 style={{ color: '#00eeff', fontSize: '26px', marginBottom: '8px' }}>{exp.title}</h3>
              <h4 style={{ color: '#fff', fontSize: '20px', marginBottom: '10px', fontWeight: '500' }}>{exp.company}</h4>
              <span style={{ color: '#ccc', fontSize: '15px', display: 'inline-flex', alignItems: 'center', marginBottom: '20px', background: '#081b29', padding: '6px 15px', borderRadius: '25px' }}>
                <i className='bx bx-calendar' style={{ marginRight: '8px', color: '#00eeff' }}></i>
                {exp.period}
              </span>
              <div className="experience-desc" style={{ color: '#ededed', fontSize: '16px', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: exp.description }}></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Experience;
