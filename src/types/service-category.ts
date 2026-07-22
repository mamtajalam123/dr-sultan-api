export interface ServiceCategory {
  id?: number;

  name: string;

  status?: "Active" | "Inactive";

  created_at?: Date;

  updated_at?: Date;
}