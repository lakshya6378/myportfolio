import React, { useState } from 'react';

export const Contact = ({ profile }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const finalmessage = `Name : ${formData.name} <br> Email : ${formData.email} <br> Subject:${formData.subject} Message : ${formData.message} <br>`;
    
    if (window.Email) {
      window.Email.send({
        SecureToken: "5fbe1300-225f-44f3-9af2-44669e99d6e1",
        To: 'agarwallakshya99@gmail.com',
        From: "agarwallakshya99@gmail.com",
        Subject: "portfolio mail submissions",
        Body: finalmessage
      }).then((message) => {
        if (message === "OK") {
          alert('Form submitted successfully');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
          alert('Error sending message: ' + message);
        }
      });
    } else {
      // Fallback if SMTP.js is blocked by an adblocker
      alert("Direct email script was blocked by your browser (often due to adblockers). We will open your default email client instead.");
      const mailtoLink = `mailto:${profile.email || "agarwallakshya99@gmail.com"}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent("Name: " + formData.name + "\n\n" + formData.message)}`;
      window.location.href = mailtoLink;
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  if (!profile) return null;

  return (
    <>
      <h2 className="sub-title" id="contact">Contact <span>Me</span></h2>
      <section className="contact">
        <div className="contact-text">
          <h4>Let's Work Together</h4>
          <p>Feel free to reach out to me for inquiries, collaborations, or just to say hello! I'm always excited to connect with fellow developers and enthusiasts. Drop me a message using the form below, and I'll get back to you as soon as possible. Let's discuss your project ideas and how we can work together to bring them to life!</p>
          <div className="contact-list">
            <li><i className="bx bxs-send"></i><a className="contact-mail" href={`mailto:${profile.email}`}>{profile.email || "agarwallakshya99@gmail.com"}</a></li>
            <li><i className="bx bxs-phone"></i>{profile.phone || "6378117966"}</li>
          </div>
          <div className="contact-icons">
            {profile.instagram && (
              <a href={profile.instagram} style={{ "--i": 7 }} target="_blank" rel="noreferrer"><i className="bx bxl-instagram"></i></a>
            )}
            {profile.whatsapp && (
              <a href={profile.whatsapp} style={{ "--i": 8 }} target="_blank" rel="noreferrer"><i className="bx bxl-whatsapp"></i></a>
            )}
            {profile.github && (
              <a href={profile.github} style={{ "--i": 9 }} target="_blank" rel="noreferrer"><i className="bx bxl-github"></i></a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} style={{ "--i": 10 }} target="_blank" rel="noreferrer"><i className="bx bxl-linkedin"></i></a>
            )}
          </div>
        </div>

        <div className="contact-form">
          <form className="contactform" onSubmit={sendEmail}>
            <input type="text" placeholder="Enter Your Name" name="name" required value={formData.name} onChange={handleChange} />
            <input type="email" placeholder="Enter Your Email" name="email" required value={formData.email} onChange={handleChange} />
            <input type="text" placeholder="Enter Subject" name="subject" value={formData.subject} onChange={handleChange} />
            <textarea
              name="message"
              cols="40"
              rows="10"
              placeholder="Enter Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <input type="submit" value="Submit" className="send" />
          </form>
        </div>
      </section>
    </>
  );
};

export const Footer = ({ profileName }) => {
  return (
    <div className="last-text">
      <p>Developed by {profileName || "Lakshya Agarwal"}</p>
    </div>
  );
};
