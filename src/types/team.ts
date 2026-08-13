export interface Team {

  id?: number;

  name:string;

  designationId:number;

  specialization?:string | null;

  experience?:string | null;

  email?:string | null;

  phone?:string | null;

  image?:string | null;

  bio?:string | null;

  status:"Active" | "Inactive";

}