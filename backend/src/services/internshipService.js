import axios from '../config/axios.js';

export const getInternships = async (userId) => {
  // Return mock listings directly since there is no Internship database model
  return [
    {
      companyName: 'Tech Innovators',
      role: 'Backend Intern (Mock)',
      status: 'applied',
      applicationDate: new Date(),
      notes: 'Applied through company portal'
    }
  ];
};

export const applyInternship = async (userId, internshipData) => {
  return {
    ...internshipData,
    user: userId,
    status: internshipData.status || 'interested',
    applicationDate: new Date()
  };
};

export const searchExternalJobs = async (query) => {
  // Placeholder for future Jobs API integration using process.env.JOB_API_KEY
  // Example:
  // const response = await axios.get(`https://jobsapi.com/v1/search?q=${query}`, {
  //   headers: { 'Authorization': `Bearer ${process.env.JOB_API_KEY}` }
  // });
  
  return {
    source: 'External Jobs API (Placeholder)',
    query,
    jobs: [
      {
        title: 'Backend Developer Intern (Mock)',
        company: 'InnovateTech Solutions',
        location: 'Remote',
        description: 'Work with Node.js and MongoDB to build scalable microservices.',
        url: 'https://innovatetech.com/jobs/backend-intern'
      },
      {
        title: 'Software Engineer Intern (Mock)',
        company: 'CloudNative Corp',
        location: 'New York, NY',
        description: 'Learn Kubernetes, Docker, and Go in a hands-on environment.',
        url: 'https://cloudnative.com/careers/se-intern'
      }
    ]
  };
};
