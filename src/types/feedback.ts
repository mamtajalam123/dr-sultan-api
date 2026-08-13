export interface Feedback {
  id: number;

  patient_name: string;

  patient_image?: string | null;

  rating?: number | null;

  message: string;

  status: "Active" | "Inactive";

  created_at?: string;
  updated_at?: string;
}