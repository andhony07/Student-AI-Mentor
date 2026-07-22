import xlsx from "xlsx";

/**
 * Normalize header names.
 * Removes spaces, brackets, %, underscores, hyphens and converts to lowercase.
 *
 * Examples:
 * "Completion (%)" -> "completion"
 * "Quiz Score" -> "quizscore"
 * "Attendance %" -> "attendance"
 */
const normalise = (str) =>
  String(str ?? "")
    .toLowerCase()
    .replace(/\(%\)/g, "")
    .replace(/%/g, "")
    .replace(/[^a-z0-9]/g, "");

/**
 * Flexible header mapping
 */
const HEADER_MAP = {
  // Course
  course: "course",
  coursename: "course",
  subject: "course",
  subjectname: "course",

  // Module
  module: "module",
  modulename: "module",
  topic: "module",
  chapter: "module",

  // Completion
  completion: "completion",
  completionpercentage: "completion",
  completionpercent: "completion",
  completionpct: "completion",
  progress: "completion",
  progresspercentage: "completion",

  // Quiz
  quiz: "quizScore",
  quizscore: "quizScore",
  quizmarks: "quizScore",
  testscore: "quizScore",
  marks: "quizScore",

  // Assignment
  assignment: "assignmentScore",
  assignmentscore: "assignmentScore",
  assignmentmarks: "assignmentScore",

  // Attendance
  attendance: "attendance",
  attendancepercentage: "attendance",
  attendancepercent: "attendance",
  attendancepct: "attendance",
};

/**
 * Convert value to number
 */
const toNumber = (value) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value === "string") {
    value = value.replace("%", "").trim();
  }

  const num = Number(value);

  return Number.isFinite(num) ? num : null;
};

/**
 * Parse LMS Excel
 */
export const parseLMSExcel = (fileBuffer) => {
  let workbook;

  try {
    workbook = xlsx.read(fileBuffer, {
      type: "buffer",
    });
  } catch (err) {
    throw new Error("Unable to read Excel file.");
  }

  if (!workbook.SheetNames.length) {
    throw new Error("Excel file contains no sheets.");
  }

  const worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const rawRows = xlsx.utils.sheet_to_json(worksheet, {
    defval: null,
  });

  if (!rawRows.length) {
    throw new Error("Excel file contains no data.");
  }

  const rows = [];
  let skippedRows = 0;

  for (const raw of rawRows) {
    const mapped = {};

    for (const [header, value] of Object.entries(raw)) {
      const normalizedHeader = normalise(header);

      const field = HEADER_MAP[normalizedHeader];

      if (field) {
        mapped[field] = value;
      }
    }

    if (!mapped.course || String(mapped.course).trim() === "") {
      skippedRows++;
      continue;
    }

    rows.push({
      course: String(mapped.course).trim(),

      module: mapped.module
        ? String(mapped.module).trim()
        : "",

      completion:
        toNumber(mapped.completion) !== null
          ? toNumber(mapped.completion)
          : 0,

      quizScore:
        toNumber(mapped.quizScore) !== null
          ? toNumber(mapped.quizScore)
          : 0,

      assignmentScore:
        toNumber(mapped.assignmentScore) !== null
          ? toNumber(mapped.assignmentScore)
          : 0,

      attendance:
        toNumber(mapped.attendance) !== null
          ? toNumber(mapped.attendance)
          : 0,
    });
  }

  if (!rows.length) {
    throw new Error(
      'No valid LMS records found. Ensure the Excel contains a "Course" column.'
    );
  }

  return {
    rows,
    totalRows: rows.length,
    skippedRows,
  };
};