export interface Contact {
  id?: number;

  fullName: string;

  email: string;

  phone: string;

  subject: string;

  message: string;

  status?: "New" | "Replied" | "Archived";

  created_at?: string;

  updated_at?: string;
}

export interface ContactResponse {
  success: boolean;

  status: string;

  message?: string;

  id?: number;

  data?: Contact | Contact[];
}