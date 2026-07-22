import axios from 'axios';
import Resume from '../models/Resume.js';
import Internship from '../models/Internship.js';
import AppError from '../utils/errorHandler.js';
import logger from '../utils/logger.js';

/**
 * Returns internship tracking records for the user.
 *
 * @param {string} userId
 */
export const getInternships = async (userId) => {
  return await Internship.find({ userId }).sort({ applicationDate: -1 });
};

/**
 * Records a new internship application.
 *
 * @param {string} userId
 * @param {Object} internshipData
 */
export const applyInternship = async (userId, internshipData) => {
  if (!internshipData.companyName || !internshipData.role) {
    throw new AppError('Company name and role are required.', 400);
  }

  const internship = await Internship.create({
    userId,
    ...internshipData,
    status: internshipData.status || 'interested',
    applicationDate: internshipData.applicationDate || new Date()
  });

  return internship;
};

/**
 * Helper to extract target role from Resume text.
 */
const extractTargetRole = (text) => {
  const lowerText = text.toLowerCase();
  if (lowerText.includes('java') && lowerText.includes('backend')) return 'Java Backend Developer';
  if (lowerText.includes('python')) return 'Python Developer';
  if (lowerText.includes('react') || lowerText.includes('frontend')) return 'Frontend Developer';
  if (lowerText.includes('node') || lowerText.includes('backend')) return 'Backend Developer';
  if (lowerText.includes('machine learning') || lowerText.includes('ml')) return 'Machine Learning Engineer';
  if (lowerText.includes('full stack') || lowerText.includes('fullstack')) return 'Full Stack Developer';
  return 'Software Engineering'; // fallback
};

/**
 * Searches external job listings based on the student's latest Resume.
 */
export const searchExternalJobs = async (userId) => {
  const resume = await Resume.findOne({ user: userId }).sort({ createdAt: -1 });

  if (!resume) {
    throw new AppError('No resume data found. Please upload your resume PDF first to find internships.', 404);
  }

  const apiKey = process.env.JSEARCH_API_KEY;
  if (!apiKey) {
    throw new AppError('JSEARCH_API_KEY is not configured. Please set it in your .env file.', 503);
  }

  const targetRole = extractTargetRole(resume.extractedText);
  const query = `${targetRole} Internship India`;

  try {
    const response = await axios.get('https://api.openwebninja.com/jsearch/search-v2', {
      params: { query },
      headers: { 'x-api-key': apiKey }
    });

    const responseData = response.data?.data;
    // JSearch sometimes returns an array directly, or an object containing a 'jobs' array
    const jobs = Array.isArray(responseData) ? responseData : (responseData?.jobs || []);

    // If no internships exist, return an empty array (it will be wrapped by the controller)
    if (jobs.length === 0) {
      return [];
    }

    // Map to requested fields
    const formattedJobs = jobs.map((job) => ({
      company: job.employer_name || 'Unknown Company',
      role: job.job_title || 'Unknown Role',
      location: job.job_city && job.job_country ? `${job.job_city}, ${job.job_country}` : (job.job_location || 'Unknown Location'),
      mode: job.job_is_remote ? 'Remote' : (job.job_employment_type === 'INTERN' ? 'Internship' : 'On-site'),
      salary: job.job_min_salary && job.job_max_salary
        ? `${job.job_min_salary} - ${job.job_max_salary} ${job.job_salary_currency}`
        : 'Not disclosed',
      applyLink: job.job_apply_link || '#',
      description: job.job_description ? job.job_description.substring(0, 300) + '...' : 'No description available.'
    }));

    return formattedJobs;
  } catch (err) {
    const statusCode = err.response?.status || 500;
    // Extract real API error or fallback to the exception message
    const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to fetch internships from JSearch API.';
    
    logger.error(`JSearch API Error [${statusCode}]: ${errorMessage}`);
    
    throw new AppError(errorMessage, statusCode);
  }
};
