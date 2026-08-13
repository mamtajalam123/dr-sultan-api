export interface Gallery {
  id?: number;

  title: string;

  description?: string | null;

  serviceId?: number | null;

  serviceName?: string | null;

  type: string;

  image?: string | null;

  status: string;

  created_at?: string;

  updated_at?: string;
}