import FeedbackRepository, {
  FeedbackStatus,
  FeedbackRepositoryData,
} from "../repositories/feedback.repository";


// ==========================================
// TYPES
// ==========================================

interface CreateFeedbackInput {

  patientName: string;

  patientImage?: string | null;

  treatment: string;

  rating: number | string;

  review: string;

  status?: FeedbackStatus;

  date?: string | null;

}



interface UpdateFeedbackInput {

  patientName: string;

  patientImage?: string | null;

  treatment: string;

  rating: number | string;

  review: string;

  status?: FeedbackStatus;

  date?: string | null;

}



// ==========================================
// SERVICE
// ==========================================

export class FeedbackService {


  private repository =
    new FeedbackRepository();



  private readonly allowedStatuses:
    FeedbackStatus[] =
    [
      "Pending",
      "Approved",
      "Rejected",
    ];



  // ==========================================
  // GET ALL
  // ==========================================

  async getAll(){

    return await this.repository.findAll();

  }





  // ==========================================
  // GET BY ID
  // ==========================================

  async getById(
    id:number
  ){

    this.validateId(id);


    return await this.repository.findById(
      id
    );

  }







  // ==========================================
  // CREATE
  // ==========================================

  async create(
    data:CreateFeedbackInput
  ){


    if(!data){

      throw new Error(
        "Feedback data is required"
      );

    }



    const patientName =
      data.patientName?.trim();



    if(!patientName){

      throw new Error(
        "Patient name is required"
      );

    }





    const treatment =
      data.treatment?.trim();



    if(!treatment){

      throw new Error(
        "Treatment is required"
      );

    }





    const review =
      data.review?.trim();



    if(!review){

      throw new Error(
        "Review is required"
      );

    }





    const rating =
      Number(data.rating);



    if(
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ){

      throw new Error(
        "Rating must be between 1 and 5"
      );

    }





    const status =
      data.status ?? "Pending";



    this.validateStatus(
      status
    );





    const date =
      data.date?.trim()
      ? data.date.trim()
      : new Date()
        .toISOString()
        .split("T")[0];





    const feedback:
      FeedbackRepositoryData =
    {

      patientName,

      patientImage:
        data.patientImage ?? null,

      treatment,

      rating,

      review,

      status,

      date,

    };




    return await this.repository.create(
      feedback
    );


  }







  // ==========================================
  // UPDATE
  // ==========================================

  async update(
    id:number,
    data:UpdateFeedbackInput
  ){


    this.validateId(id);



    const existing =
      await this.repository.findById(
        id
      );



    if(!existing){

      throw new Error(
        "Feedback not found"
      );

    }





    const patientName =
      data.patientName?.trim();



    if(!patientName){

      throw new Error(
        "Patient name is required"
      );

    }





    const treatment =
      data.treatment?.trim();



    if(!treatment){

      throw new Error(
        "Treatment is required"
      );

    }





    const review =
      data.review?.trim();



    if(!review){

      throw new Error(
        "Review is required"
      );

    }





    const rating =
      Number(data.rating);



    if(
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ){

      throw new Error(
        "Rating must be between 1 and 5"
      );

    }





    const status =
      data.status ??
      existing.status;



    this.validateStatus(
      status
    );





    const date =
      data.date?.trim()
      ? data.date.trim()
      : existing.date;





    const patientImage =
      data.patientImage ??
      existing.patientImage ??
      null;





    const feedback:
      FeedbackRepositoryData =
    {

      patientName,

      patientImage,

      treatment,

      rating,

      review,

      status,

      date,

    };





    const updated =
      await this.repository.update(
        id,
        feedback
      );



    if(!updated){

      throw new Error(
        "Feedback update failed"
      );

    }



    return updated;


  }








  // ==========================================
  // UPDATE STATUS
  // ==========================================

  async updateStatus(
    id:number,
    status:FeedbackStatus
  ){


    this.validateId(id);


    this.validateStatus(
      status
    );



    const updated =
      await this.repository.updateStatus(
        id,
        status
      );



    if(!updated){

      throw new Error(
        "Feedback not found"
      );

    }



    return updated;


  }








  // ==========================================
  // DELETE
  // ==========================================

  async delete(
    id:number
  ){


    this.validateId(id);



    const deleted =
      await this.repository.delete(
        id
      );



    if(!deleted){

      throw new Error(
        "Feedback not found"
      );

    }



    return deleted;


  }









  // ==========================================
  // VALIDATE ID
  // ==========================================

  private validateId(
    id:number
  ){


    if(
      !Number.isInteger(id) ||
      id <= 0
    ){

      throw new Error(
        "Invalid feedback ID"
      );

    }


  }








  // ==========================================
  // VALIDATE STATUS
  // ==========================================

  private validateStatus(
    status:string
  ):asserts status is FeedbackStatus{


    if(
      !this.allowedStatuses.includes(
        status as FeedbackStatus
      )
    ){

      throw new Error(
        "Invalid feedback status"
      );

    }


  }


}