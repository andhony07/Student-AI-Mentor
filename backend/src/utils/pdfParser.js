import pdf from 'pdf-parse';

export const parsePDF = async (pdfBuffer) => {
  try {
    const data = await pdf(pdfBuffer);
    return {
      text: data.text,
      info: data.info,
      metadata: data.metadata,
      numPages: data.numpages
    };
  } catch (error) {
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
};
