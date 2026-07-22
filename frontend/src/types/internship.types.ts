// ─── Internship Types ────────────────────────────────────────

export interface Internship {
  _id: string;
  userId: string;
  companyName: string;
  role: string;
  status: 'interested' | 'applied' | 'interviewing' | 'offered' | 'rejected';
  applicationDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type TrackedInternship = Internship;

export interface AddInternshipPayload {
  companyName: string;
  role: string;
  status?: Internship['status'];
  applicationDate?: string;
  notes?: string;
}

export type CreateTrackedInternshipPayload = AddInternshipPayload;

export interface InternshipListResponse {
  status: string;
  message: string;
  data: {
    internships: Internship[];
  };
}

export type InternshipsResponse = InternshipListResponse;
export type TrackedInternshipsResponse = InternshipListResponse;

export interface ExternalJob {
  company: string;
  role: string;
  location: string;
  mode: string;
  salary: string;
  applyLink: string;
  description: string;
}

export type InternshipItem = ExternalJob;

export interface SearchJobsResponse {
  status: string;
  message: string;
  data: ExternalJob[];
}

export interface CreateTrackedResponse {
  status: string;
  message: string;
  data: {
    internship: Internship;
  };
}
