import pdf from 'pdf-parse';
import AppError from './errorHandler.js';

export const parsePDF = async (pdfBuffer) => {
  try {
    const data = await pdf(pdfBuffer);
    
    if (!data || !data.text || data.text.trim() === '') {
      throw new AppError('The PDF is empty or contains no extractable text.', 400);
    }

    return {
      text: data.text.trim(),
      info: data.info,
      metadata: data.metadata,
      numPages: data.numpages
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(`Failed to parse PDF. It may be corrupted or encrypted: ${error.message}`, 400);
  }
};
