export interface Candidate {
  id?: number;
  name: string;
  email: string;
  phone: string;
  positionApplied: string;
  status: 'pending' | 'accepted' | 'rejected';
} 