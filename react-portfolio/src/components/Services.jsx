import React from 'react';

const Services = ({ services }) => {
  if (!services || services.length === 0) return null;

  return (
    <section>
      <div className="service" id="services">
        <div className="container">
          <h1 className="sub-title">My <span>Services</span></h1>
          <div className="services-list">
            {services.map(service => (
              <div key={service.id || service.title}>
                <i className={service.icon || "bx bx-code"} style={{ color: '#00eeff' }}></i>
                <h2>{service.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: service.description }}></p>
                <a href="#contact" className="read">contact now</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
