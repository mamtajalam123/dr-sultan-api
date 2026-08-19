export interface Service {

  id?: number;

  name: string;

  slug?: string;


  categoryId: number | null;

  categoryName?: string;


  duration: string;


  shortDescription?: string;


  description: string;


  image?: string | null;


  status:
    | "Active"
    | "Inactive";


  createdAt?: string;

  updatedAt?: string;

}