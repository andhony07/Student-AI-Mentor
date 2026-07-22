export const getProfile = async (userId) => {
  return {
    userId,
    profile: {
      skills: ['JavaScript', 'Node.js', 'Express', 'React', 'MongoDB'],
      careerGoals: ['Backend Developer', 'Machine Learning Engineer'],
      education: [
        {
          institution: 'Tech Institute of Technology',
          degree: 'B.Tech',
          fieldOfStudy: 'Computer Science and Engineering',
          startYear: 2023,
          endYear: 2027,
          cgpa: 8.5
        }
      ],
      collegeDetails: {
        name: 'Tech Institute',
        branch: 'CSE',
        rollNumber: 'CS2023042'
      },
      preferredRoles: ['Backend Intern', 'Fullstack Engineer']
    }
  };
};

export const updateProfile = async (userId, profileData) => {
  return {
    userId,
    profile: {
      ...profileData
    }
  };
};
