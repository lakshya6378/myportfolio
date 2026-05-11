import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.VITE_APP_SCRIPT_URL;
const PASSWORD = "admin";

const profile = {
  name: "Lakshya Agarwal",
  role: "React, Javascript, NodeJs",
  description: "I'm a passionate Full Stack Web Developer who loves bringing ideas to life on the web. I specialize in crafting visually appealing and user-friendly websites. <br /><br/>Expert in designing and creating websites using mockup designs and developing efficient backend APIs, I ensure a seamless and dynamic user experience.",
  imageURL: "/lakshya.png",
  github: "https://github.com/lakshya6378",
  linkedin: "https://www.linkedin.com/in/lakshya6378/",
  email: "agarwallakshya99@gmail.com",
  phone: "6378117966",
  instagram: "https://www.instagram.com/lakshya.agarwal1911?utm_source=qr&igsh=MXhjeDNtZzB1bTFxaw==",
  whatsapp: "https://wa.me/qr/KH3MVSZB4SAXA1"
};

const about = {
  heading: "Full Stack Developer",
  description: "Hey there! I'm Lakshya Agarwal, a passionate full-stack web developer renowned for crafting seamless digital experiences. With a natural flair for intuitive design and a knack for problem-solving, I thrive on transforming ideas into elegant code and user-friendly interfaces.<br/><br/>My expertise spans the full spectrum of web technologies, from front-end finesse with HTML5, CSS3, and JavaScript to developing robust backend APIs. Navigating the ever-evolving landscape of web development, I ensure every project is both innovative and functional.<br/><br/>Whether you're a startup with a bold vision or an enterprise seeking optimization, I'm here to turn your concepts into captivating digital realities. Let's collaborate and create something extraordinary together!<br/>",
  resumeURL: "./resources/resume.pdf"
};

const services = [
  { id: "s1", title: "Custom Web Development", description: "Crafting bespoke digital solutions tailored to your needs. Leverage my expertise in HTML, CSS, JavaScript, Node.js, and Express to build custom web applications that meet your unique requirements. From concept to deployment, I ensure a seamless development process, delivering high-quality, scalable solutions that drive results.", icon: "bx bx-code" },
  { id: "s2", title: "User-Centric Frontend Design", description: "Creating captivating user interfaces for exceptional user experiences. Bring your vision to life with stunning frontend designs using HTML, CSS, and React. Through a deep understanding of user behaviors and design principles, I create intuitive interfaces that engage users and leave a lasting impression.", icon: "bx bx-crop" },
  { id: "s3", title: "Efficient Backend Development", description: "Building robust server-side solutions for seamless application functionality. Utilize Node.js and Express expertise to architect and implement efficient backend systems. From database integration to API development, I ensure optimized performance and reliability to support your application's backend needs.", icon: "bx bxl-apple" }
];

const skills = [
  { id: "sk1", name: "HTML", percentage: 90, icon: "bx bxl-html5", category: "Technical" },
  { id: "sk2", name: "CSS", percentage: 90, icon: "bx bxl-css3", category: "Technical" },
  { id: "sk3", name: "JavaScript", percentage: 80, icon: "bx bxl-javascript", category: "Technical" },
  { id: "sk4", name: "C", percentage: 80, icon: "bx bx-copyright", category: "Technical" },
  { id: "sk5", name: "C++", percentage: 90, icon: "bx bxl-c-plus-plus", category: "Technical" },
  { id: "sk6", name: "React", percentage: 90, icon: "bx bxl-react", category: "Technical" },
  { id: "sk7", name: "redux", percentage: 60, icon: "bx bxl-redux", category: "Technical" },
  { id: "sk8", name: "Nodejs", percentage: 80, icon: "bx bxl-nodejs", category: "Technical" },
  { id: "sk9", name: "SQL", percentage: 70, icon: "bx bx-data", category: "Technical" },
  { id: "sk10", name: "MongoDB", percentage: 50, icon: "bx bxl-mongodb", category: "Technical" },
  { id: "sk11", name: "SASS", percentage: 70, icon: "bx bxl-sass", category: "Technical" },
  { id: "sk12", name: "Linux", percentage: 70, icon: "bx bx-terminal", category: "Technical" },
  { id: "sk13", name: "bootstrap", percentage: 60, icon: "bx bxl-bootstrap", category: "Technical" },
  { id: "sk14", name: "git", percentage: 80, icon: "bx bx-git-branch", category: "Technical" },
  { id: "sk15", name: "creativity", percentage: 90, icon: "", category: "Professional" },
  { id: "sk16", name: "communication", percentage: 60, icon: "", category: "Professional" },
  { id: "sk17", name: "problem-solving", percentage: 70, icon: "", category: "Professional" },
  { id: "sk18", name: "TeamWork", percentage: 80, icon: "", category: "Professional" }
];

const projects = [
  { id: "p1", title: "Landing-Page", description: "This Bitcoin landing page is a responsive website built using pure HTML, CSS, and JavaScript. Featuring classic animations, it offers a visually engaging introduction to the world of Bitcoin. Its seamless responsiveness ensures optimal viewing on all devices. Explore the project to experience its elegant design and smooth user interface firsthand.", imageURL: "resources/landing-page.png", liveLink: "https://lakshya6378.github.io/udacity-landing-page/", githubLink: "https://github.com/lakshya6378/udacity-landing-page.git" },
  { id: "p2", title: "Express weatherjournalapp", description: "Utilizing Node.js and Express, this weather app delivers real-time weather data seamlessly. Integrated with the Google Location API for precise coordinates, it provides accurate forecasts for any location. With webpack configuration for efficient production builds, this project exemplifies streamlined development practices. Experience the power of Node.js and Express in action with this intuitive weather application.", imageURL: "resources/weatherjournalapp.png", liveLink: "https://new-weather-journal-app.onrender.com/", githubLink: "https://github.com/lakshya6378/weather-journal-app.git" },
  { id: "p3", title: "AiNewsGenerator", description: "Empowering users to extract news content effortlessly, this full-stack web app utilizes React and Node.js technologies. Seamlessly handling PDF documents and images, it generates news summaries based on their content. Harnessing the power of both frontend and backend technologies, this project showcases the integration of React for dynamic user interfaces and Node.js for efficient server-side processing. Experience the innovation of automated news generation with this intuitive web application.", imageURL: "resources/newsevaluator.png", liveLink: "https://news-ai-front.onrender.com/", githubLink: "https://github.com/lakshya6378/news-evaluator.git" }
];

async function sendData(action, sheetName, payload) {
  try {
    const response = await axios.post(API_URL, JSON.stringify({
      action,
      password: PASSWORD,
      sheetName,
      payload
    }), {
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }
    });
    console.log(`Success ${sheetName}:`, response.data.message);
  } catch (error) {
    console.error(`Error ${sheetName}:`, error.message);
  }
}

async function seed() {
  if (!API_URL) {
    console.error("VITE_APP_SCRIPT_URL not found in .env");
    return;
  }
  console.log("Seeding data to", API_URL);

  await sendData("update", "Profile", profile);
  await sendData("update", "About", about);

  for (const s of services) await sendData("add", "Services", s);
  for (const sk of skills) await sendData("add", "Skills", sk);
  for (const p of projects) await sendData("add", "Projects", p);

  console.log("Done seeding!");
}

seed();
