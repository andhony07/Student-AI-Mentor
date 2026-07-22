import apiClient from '../api/axios';
import type {
  InternshipItem,
  TrackedInternship,
  CreateTrackedInternshipPayload,
} from '../types/internship.types';

const InternshipService = {
  getInternships: async (): Promise<TrackedInternship[]> => {
    const { data } = await apiClient.get<TrackedTrackedWrapper>('/internships');
    return data.data?.internships || [];
  },

  getSavedInternships: async (): Promise<TrackedInternship[]> => {
    return InternshipService.getInternships();
  },

  searchInternships: async (): Promise<InternshipItem[]> => {
    const { data } = await apiClient.get<SearchResponseWrapper>('/internships/search');
    return Array.isArray(data.data) ? data.data : [];
  },

  saveInternship: async (payload: CreateTrackedInternshipPayload): Promise<TrackedInternship> => {
    const { data } = await apiClient.post<CreateTrackedWrapper>('/internships', payload);
    return data.data.internship;
  },

  unsaveInternship: async (_id: string): Promise<{ success: boolean }> => {
    return { success: true };
  },

  filterInternships: (
    items: InternshipItem[],
    query: string,
    mode: string,
    location: string
  ): InternshipItem[] => {
    return items.filter((item) => {
      const matchQuery =
        !query ||
        item.role.toLowerCase().includes(query.toLowerCase()) ||
        item.company.toLowerCase().includes(query.toLowerCase());

      const matchMode = !mode || mode === 'All' || item.mode.toLowerCase() === mode.toLowerCase();

      const matchLocation =
        !location || item.location.toLowerCase().includes(location.toLowerCase());

      return matchQuery && matchMode && matchLocation;
    });
  },
};

interface TrackedTrackedWrapper {
  status: string;
  message: string;
  data: {
    internships: TrackedInternship[];
  };
}

interface SearchResponseWrapper {
  status: string;
  message: string;
  data: InternshipItem[];
}

interface CreateTrackedWrapper {
  status: string;
  message: string;
  data: {
    internship: TrackedInternship;
  };
}

export default InternshipService;
