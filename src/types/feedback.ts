export interface Feedback {
  id?: number;

  patient_name: string;

  treatment: string;

  rating: number;

  review: string;

  image?: string | null;

  status?: "Pending" | "Approved";

  created_at?: Date;

  updated_at?: Date;
}