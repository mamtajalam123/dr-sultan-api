export interface Service {
  id?: number;

  name: string;

  category: string;

  duration: string;

  description: string;

  image?: string | null;

  status?: "Active" | "Inactive";

  created_at?: Date;

  updated_at?: Date;
}