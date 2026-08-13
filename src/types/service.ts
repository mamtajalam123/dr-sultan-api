export interface Service {
  id?: number;

  name: string;

  // Foreign key
  categoryId: number;

  // Joined category name (optional)
  categoryName?: string;

  duration: string;

  description: string;

  image?: string | null;

  status?: "Active" | "Inactive";

  createdAt?: Date;

  updatedAt?: Date;
}