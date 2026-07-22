import axios from '../config/axios.js';

/**
 * Returns mock internship tracking records.
 * Auth-independent: no userId required.
 */
export const getInternships = async () => {
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

/**
 * Records a new internship application.
 * Auth-independent: no userId required.
 *
 * @param {Object} internshipData
 */
export const applyInternship = async (internshipData) => {
  return {
    ...internshipData,
    status: internshipData.status || 'interested',
    applicationDate: new Date()
  };
};

/**
 * Searches external job listings by query keyword.
 * Placeholder for future Jobs API integration.
 *
 * @param {string} query
 */
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
