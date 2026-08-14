export interface Team {


  id?: number;



  // ==========================
  // BASIC INFO
  // ==========================


  name:string;



  // ==========================
  // DESIGNATION
  // ==========================


  designationId:number;



  designation?:string;



  // ==========================
  // DETAILS
  // ==========================


  specialization?:string | null;



  experience?:string | null;



  email?:string | null;



  phone?:string | null;



  // ==========================
  // IMAGE
  // ==========================

  // string  -> existing/new image path
  // null    -> remove image
  // undefined -> keep old image during update

  image?:string | null | undefined;



  // ==========================
  // BIO
  // ==========================


  bio?:string | null;



  // ==========================
  // STATUS
  // ==========================


  status:
    | "Active"
    | "Inactive";


}