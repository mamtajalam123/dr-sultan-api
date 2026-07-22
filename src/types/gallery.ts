export interface Gallery {
  id?: number;

  title: string;

  description: string;

  category:
    | "Clinic"
    | "Doctors"
    | "Technology"
    | "Patients"
    | "Events";

  type: string;

  image?: string | null;

  status?: "Active" | "Inactive";

  created_at?: Date;

  updated_at?: Date;
}