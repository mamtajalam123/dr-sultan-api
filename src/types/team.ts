export interface Team {
  id?: number;

  name: string;

  designation: string;

  specialization: string;

  experience: string;

  email?: string | null;

  phone?: string | null;

  image?: string | null;

  status?: "Active" | "Inactive";

  created_at?: Date;

  updated_at?: Date;
}