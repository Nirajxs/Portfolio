import React from 'react';
import { PortfolioData } from './types';

export const PORTFOLIO_DATA: PortfolioData = {
  name: "NIRAJ KUMAR",
  role: "Full Stack Web Developer",
  subRole: "MERN",
  aboutMe: "I am a motivated Full Stack Developer skilled in the MERN stack (MongoDB, Express.js, React.js, Node.js). As a fresher with 2 internships, I have gained practical experience in developing responsive frontend interfaces and building efficient backend APIs.\n\nI have successfully developed a Hospital Management System that handles patient records, appointments, and administrative workflows. I focus on writing clean, maintainable code and building user-friendly web applications.\n\nI am currently looking for an opportunity where I can contribute my skills, grow professionally, and work on real-world scalable applications.",

  // ✅ ADDED CONTACT SECTION (Required to prevent crash)
  contact: {
    email: "nirajbpositive@gmail.com",
    phone: "+91-9065227205",
    location: "Ranchi, Jharkhand, India",
    socials: {
      linkedin: "https://www.linkedin.com/in/niraj-kumar-37177530a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Nirajxs",
      twitter: "",
      instagram: "https://www.instagram.com/ms_niju_x/?utm_source=ig_web_button_share_sheet"
    }
  },

  skills: {
    frontend: {
      title: "Frontend Development",
      skills: [
        { name: "React JS", percentage: 80 },
        { name: "HTML", percentage: 95 },
        { name: "CSS", percentage: 90 },
        { name: "Bootstrap", percentage: 85 },
      ]
    },
    backend: {
      title: "Backend Development",
      skills: [
        { name: "Node JS", percentage: 85 },
        { name: "Express JS", percentage: 80 },
        { name: "Django", percentage: 70 },
        { name: "REST API", percentage: 90 },
      ]
    },
    database: {
      title: "Databases",
      skills: [
        { name: "MongoDB", percentage: 85 },
        { name: "SQLite", percentage: 75 },
      ]
    },
    tools: {
      title: "Tools",
      skills: [
        { name: "Git & GitHub", percentage: 90 },
        { name: "VS Code", percentage: 95 },
       
      ]
    },
    platforms: {
      title: "Platforms",
      skills: [
        { name: "Vercel", percentage: 80 },
       
        { name: "Firebase", percentage: 75 },
      ]
    }
  },

 projects: [
  {
    title: "Hospital Management System",
    description: "A comprehensive healthcare solution for managing patient records, doctor appointments, and administrative tasks with a secure backend. Built to streamline hospital workflows.",
    tags: ["Python", "Django", "HTML", "CSS"],
    link: "https://hospital-management-system-fc8g.onrender.com/",
    image: "/hospital-project.jpg"
  },
  {
    title: "Online Public Opinion & Voting Platform",
    description: "Developed a real-time public opinion and voting platform with secure user authentication and role-based access control.   Designed an admin dashboard for poll management, analytics, and user monitoring.    Implemented scalable backend architecture with efficient database handling.",
    tags: ["MERN", "React", "Node", "Express js", "MongoDB"],
    link: "#",
    image: "/voting-project.jpg"
  },
  {
    title: "All at one place shop",
    description: "A versatile and feature-rich e-commerce marketplace offering a wide range of products with secure payment gateways and smooth user experience.",
    tags: ["React", "Node", "MongoDB", "Express"],
    link: "#",
    image: "/ecommerce-project.jpg"
  }
],
  experiences: [
    {
      company: "Shashi Infotech",
      role: "Python Full Stack Developer (Intern) ",
      duration: "45 Days",
      description: "Developed a Hospital Management System using Django, HTML, and CSS. Implemented authentication, appointment scheduling, patient records, and billing management with role-based access control. Designed a responsive UI and managed backend operations using Django ORM following the MVT architecture."
    },
    {
      company: "OASIS INFOBYTE  ",
      role: "Web Developement & Designing (Intern)",
      duration: "30 Days",
      description: "Successfully completed a 30-day remote internship in Web Development and Designing. During this internship, I worked on creating responsive web interfaces, implementing backend functionalities, and optimizing user experience. I gained practical exposure to modern web technologies, project structuring, debugging, and deployment practices while collaborating in a remote working environment. "
      
    },
    {
      company: "MERN STACK",
      role: "MERN STACK DEVELOPER ",
      duration: "Dec 2025- Present",
      description: "MERN Stack Developer with hands-on experience in building full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Skilled in developing responsive user interfaces, RESTful APIs, authentication systems, and scalable backend architecture."
    }
  ],

  educations: [
    {
      institution: "RKDF University , Ranchi",
      degree: "Bachelor of Computer Application",
      year: "2023 - 2026"
    },
    {
      institution: "Maharana Pratap Inter College , Daltonganj",
      degree: "Higher Secondary",
      year: "2021 - 2023"
    },
    {
      institution: "R.N Tagore Public High School, Daltonganj",
      degree: "Matriculation",
      year: "2021"
    }
  ],

 certifications: [
  {
    title: "Python Full Stack Developer",
    provider: "Shashi Infotech (Onsite)",
    year: "01 Aug 2025 - 15 Sep 2025 ",
    duration: "45 Days",
    image: "/python-cert.jpg",
    description: "Completed full stack development training including Django, REST APIs, authentication, and deployment."
  },
  {
    title: "Web Development And Designing",
    provider: "OASIS INFOBYTE (Remote)",
    year: "05 Jan 2026 - 15 Feb 2026",
    duration: "30 Days",
    image: "/web-cert.jpg",
    description: "Learned HTML, CSS, JavaScript and responsive UI design with real-world project implementation."
  },
  {
    title: "MERN STACK",
    provider: "SB WEBCARE (Onsite)",
    year: "Appearing",
    duration: "45 Days",
    image: "/mern-cert.jpg",
    description: "Currently learning MongoDB, Express, React, Node.js with real-time full stack project development."
  }
 ]
};
