import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AppError from '../utils/errorHandler.js';

const signToken = (userId, email) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AppError('Server configuration error: JWT_SECRET environment variable is missing.', 500);
  }
  return jwt.sign({ userId, email }, secret, {
    expiresIn: '7d'
  });
};

export const extractGithubUsername = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  try {
    let fullUrl = trimmed;
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = `https://${fullUrl}`;
    }
    const parsed = new URL(fullUrl);
    const pathSegments = parsed.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      return pathSegments[0];
    }
  } catch (e) {
    const cleaned = trimmed.replace(/^https?:\/\/(www\.)?github\.com\//i, '').split('?')[0].split('#')[0];
    const parts = cleaned.split('/').filter(Boolean);
    if (parts.length > 0) return parts[0];
  }
  return trimmed;
};

export const registerUser = async (userData) => {
  const requiredFields = [
    'fullName', 'email', 'password', 'phoneNumber', 'dateOfBirth',
    'collegeName', 'department', 'graduationYear', 'linkedinUrl', 'githubUrl'
  ];

  for (const field of requiredFields) {
    if (userData[field] === undefined || userData[field] === null || String(userData[field]).trim() === '') {
      throw new AppError(`Missing required field: ${field}`, 400);
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    throw new AppError('Invalid email format', 400);
  }

  if (String(userData.password).length < 8) {
    throw new AppError('Password must be at least 8 characters long', 400);
  }

  const phoneRegex = /^[+]?[\d\s-]{8,20}$/;
  if (!phoneRegex.test(userData.phoneNumber)) {
    throw new AppError('Invalid phone number format', 400);
  }

  const gradYear = Number(userData.graduationYear);
  if (isNaN(gradYear) || gradYear < 1950 || gradYear > 2100) {
    throw new AppError('Invalid graduation year', 400);
  }

  if (!userData.linkedinUrl.toLowerCase().includes('linkedin')) {
    throw new AppError('Invalid LinkedIn URL format', 400);
  }

  if (!userData.githubUrl.toLowerCase().includes('github')) {
    throw new AppError('Invalid GitHub URL format', 400);
  }

  const { email, githubUrl } = userData;

  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingUser) {
    throw new AppError('User already exists with this email address.', 400);
  }

  const githubUsername = extractGithubUsername(githubUrl);

  await User.create({
    ...userData,
    email: email.toLowerCase().trim(),
    githubUsername
  });

  return null;
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  const token = signToken(user._id, user.email);

  return {
    token,
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      collegeName: user.collegeName,
      githubUsername: user.githubUsername
    }
  };
};

export const updateProfile = async (userId, updateData) => {
  delete updateData.email;
  delete updateData.password;

  if (updateData.githubUrl) {
    updateData.githubUsername = extractGithubUsername(updateData.githubUrl);
  }

  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const changePassword = async (userId, { currentPassword, newPassword }) => {
  if (!currentPassword || !newPassword) {
    throw new AppError('Please provide both current and new passwords', 400);
  }

  if (String(newPassword).length < 8) {
    throw new AppError('New password must be at least 8 characters long', 400);
  }

  const user = await User.findById(userId).select('+password');

  if (!user || !(await user.comparePassword(currentPassword))) {
    throw new AppError('Incorrect current password', 401);
  }

  user.password = newPassword;
  await user.save();

  return null;
};
