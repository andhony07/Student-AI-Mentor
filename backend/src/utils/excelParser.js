import xlsx from 'xlsx';

export const parseExcel = (fileBuffer) => {
  try {
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const result = {};

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      result[sheetName] = xlsx.utils.sheet_to_json(worksheet);
    });

    return result;
  } catch (error) {
    throw new Error(`Failed to parse Excel file: ${error.message}`);
  }
};
