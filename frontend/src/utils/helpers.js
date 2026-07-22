/**
 * Extracts a human-readable error message from API error responses.
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  return (
    error?.response?.data?.message ||
    error?.message ||
    'An unexpected error occurred'
  );
};

/**
 * Formats a date string to a localized human-readable format.
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Formats a date for countdown display.
 */
export const getDaysUntil = (dateStr) => {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const now = new Date();
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff;
};

/**
 * Truncates text to a given length.
 */
export const truncate = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generates initials from a full name.
 */
export const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Classname merger utility.
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ');
