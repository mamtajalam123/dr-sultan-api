import {
  Request,
  Response,
} from "express";

import {
  FeedbackService,
} from "../services/feedback.service";

import {
  FeedbackStatus,
} from "../repositories/feedback.repository";



export class FeedbackController {


  private service =
    new FeedbackService();



  private readonly allowedStatuses:
    FeedbackStatus[] =
    [
      "Pending",
      "Approved",
      "Rejected",
    ];



  // ==========================================
  // IMAGE HELPER
  // ==========================================

  private buildImagePath(
    image:string | null
  ):string | null {


    if(!image){
      return null;
    }


    const cleanImage =
      image.trim();



    if(!cleanImage){
      return null;
    }



    if(
      cleanImage.startsWith("http://") ||
      cleanImage.startsWith("https://")
    ){

      return cleanImage;

    }



    const normalized =
      cleanImage
      .replace(/^\/+/,"")
      .replace(
        /^uploads\/feedback\/+/i,
        ""
      );



    return `/uploads/feedback/${normalized}`;

  }





  // ==========================================
  // GET ALL FEEDBACK
  // GET /api/feedback
  // ==========================================


  getAll = async(
    req:Request,
    res:Response
  ):Promise<void>=>{


    try{


      const feedbacks =
        await this.service.getAll();



      const result =
        feedbacks.map(
          item=>({

            ...item,

            patientImage:
              this.buildImagePath(
                item.patientImage
              )

          })
        );



      res.status(200).json(
        result
      );



    }
    catch(error){


      console.error(
        error
      );


      res.status(500).json({

        success:false,

        message:
          error instanceof Error
          ? error.message
          : "Failed to fetch feedback"

      });


    }


  };





  // ==========================================
  // GET BY ID
  // GET /api/feedback/:id
  // ==========================================


  getById = async(
    req:Request,
    res:Response
  ):Promise<void>=>{


    try{


      const id =
        Number(req.params.id);



      if(
        !Number.isInteger(id) ||
        id <= 0
      ){

        res.status(400).json({

          success:false,

          message:
            "Invalid feedback ID"

        });


        return;

      }




      const feedback =
        await this.service.getById(
          id
        );



      if(!feedback){


        res.status(404).json({

          success:false,

          message:
            "Feedback not found"

        });


        return;

      }





      res.status(200).json({

        success:true,

        data:{

          ...feedback,

          patientImage:
            this.buildImagePath(
              feedback.patientImage
            )

        }

      });



    }
    catch(error){


      res.status(500).json({

        success:false,

        message:
          error instanceof Error
          ? error.message
          : "Failed to fetch feedback"

      });


    }


  };
  // ==========================================
// CREATE FEEDBACK
// POST /api/feedback
// ==========================================


create = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    console.log(
      "========== CREATE FEEDBACK =========="
    );


    console.log(
      "BODY:",
      req.body
    );


    console.log(
      "FILE:",
      req.file
    );



    const {
      patientName,
      treatment,
      rating,
      review,
      status,
      date,

    } = req.body;




    if(
      typeof patientName !== "string" ||
      !patientName.trim()
    ){

      res.status(400).json({

        success:false,

        message:
          "Patient name is required"

      });


      return;

    }





    if(
      typeof treatment !== "string" ||
      !treatment.trim()
    ){

      res.status(400).json({

        success:false,

        message:
          "Treatment is required"

      });


      return;

    }





    if(
      typeof review !== "string" ||
      !review.trim()
    ){

      res.status(400).json({

        success:false,

        message:
          "Review is required"

      });


      return;

    }





    const numericRating =
      Number(rating);



    if(
      !Number.isInteger(
        numericRating
      ) ||
      numericRating < 1 ||
      numericRating > 5
    ){

      res.status(400).json({

        success:false,

        message:
          "Rating must be between 1 and 5"

      });


      return;

    }






    // DEFAULT STATUS

    const feedbackStatus:
      FeedbackStatus =
      status || "Pending";




    if(
      !this.allowedStatuses.includes(
        feedbackStatus
      )
    ){

      res.status(400).json({

        success:false,

        message:
          "Invalid feedback status"

      });


      return;

    }







    let patientImage: string | null = null;


if(req.file){

  patientImage =
  `/uploads/feedback/${req.file.filename}`;

}





    const id =
      await this.service.create({

        patientName:
          patientName.trim(),


        patientImage,


        treatment:
          treatment.trim(),


        rating:
          numericRating,


        review:
          review.trim(),


        status:
          feedbackStatus,


        date:
          date?.trim()
          ? date.trim()
          : null,


      });






    const created =
      await this.service.getById(
        id
      );




    res.status(201).json({

      success:true,


      message:
        "Feedback created successfully",


      data:
        created
        ? {

            ...created,

            patientImage:
              this.buildImagePath(
                created.patientImage
              )

          }

        : null


    });



  }
  catch(error){


    console.error(
      "CREATE FEEDBACK ERROR:",
      error
    );



    res.status(500).json({

      success:false,

      message:
        error instanceof Error
        ? error.message
        : "Failed to create feedback"

    });


  }


};







// ==========================================
// UPDATE FEEDBACK
// PUT /api/feedback/:id
// ==========================================


update = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const id =
      Number(req.params.id);



    if(
      !Number.isInteger(id) ||
      id <= 0
    ){

      res.status(400).json({

        success:false,

        message:
          "Invalid feedback ID"

      });


      return;

    }





    const existing =
      await this.service.getById(
        id
      );



    if(!existing){


      res.status(404).json({

        success:false,

        message:
          "Feedback not found"

      });


      return;

    }





    const {
      patientName,
      treatment,
      rating,
      review,
      status,
      date,

    } = req.body;






    const numericRating =
      Number(rating);




    if(
      !Number.isInteger(
        numericRating
      ) ||
      numericRating < 1 ||
      numericRating > 5
    ){

      res.status(400).json({

        success:false,

        message:
          "Rating must be between 1 and 5"

      });


      return;

    }





    const feedbackStatus:
      FeedbackStatus =
      status || existing.status;




    if(
      !this.allowedStatuses.includes(
        feedbackStatus
      )
    ){

      res.status(400).json({

        success:false,

        message:
          "Invalid feedback status"

      });


      return;

    }





    let patientImage =
      existing.patientImage;



    if(req.file){

  patientImage =
  `/uploads/feedback/${req.file.filename}`;

}






    const updated =
      await this.service.update(

        id,

        {

          patientName:
            patientName.trim(),


          patientImage,


          treatment:
            treatment.trim(),


          rating:
            numericRating,


          review:
            review.trim(),


          status:
            feedbackStatus,


          date:
            date?.trim()
            ? date.trim()
            : existing.date,


        }

      );





    const feedback =
      await this.service.getById(
        id
      );





    res.status(200).json({

      success:true,


      message:
        "Feedback updated successfully",


      data:
        feedback
        ? {

            ...feedback,

            patientImage:
              this.buildImagePath(
                feedback.patientImage
              )

          }

        : null


    });




  }
  catch(error){


    console.error(
      "UPDATE FEEDBACK ERROR:",
      error
    );



    res.status(500).json({

      success:false,

      message:
        error instanceof Error
        ? error.message
        : "Failed to update feedback"

    });


  }


};
// ==========================================
// UPDATE STATUS
// PATCH /api/feedback/:id/status
// ==========================================


updateStatus = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const id =
      Number(req.params.id);



    if(
      !Number.isInteger(id) ||
      id <= 0
    ){

      res.status(400).json({

        success:false,

        message:
          "Invalid feedback ID"

      });


      return;

    }





    const {
      status
    } = req.body;





    if(
      !this.allowedStatuses.includes(
        status
      )
    ){

      res.status(400).json({

        success:false,

        message:
          "Invalid feedback status"

      });


      return;

    }






    const updated =
      await this.service.updateStatus(

        id,

        status

      );





    if(!updated){


      res.status(404).json({

        success:false,

        message:
          "Feedback not found"

      });


      return;

    }







    const feedback =
      await this.service.getById(
        id
      );





    res.status(200).json({

      success:true,


      message:
        "Status updated successfully",



      data:
        feedback
        ? {

            ...feedback,


            patientImage:
              this.buildImagePath(
                feedback.patientImage
              )


          }

        : null


    });




  }
  catch(error){


    console.error(
      "UPDATE STATUS ERROR:",
      error
    );



    res.status(500).json({

      success:false,


      message:
        error instanceof Error
        ? error.message
        : "Failed to update status"


    });


  }


};







// ==========================================
// DELETE FEEDBACK
// DELETE /api/feedback/:id
// ==========================================


delete = async(
  req:Request,
  res:Response
):Promise<void>=>{


  try{


    const id =
      Number(req.params.id);




    if(
      !Number.isInteger(id) ||
      id <= 0
    ){

      res.status(400).json({

        success:false,

        message:
          "Invalid feedback ID"

      });


      return;

    }






    const existing =
      await this.service.getById(
        id
      );



    if(!existing){


      res.status(404).json({

        success:false,

        message:
          "Feedback not found"

      });


      return;

    }






    const deleted =
      await this.service.delete(
        id
      );





    if(!deleted){


      res.status(500).json({

        success:false,

        message:
          "Failed to delete feedback"

      });


      return;


    }






    res.status(200).json({

      success:true,

      message:
        "Feedback deleted successfully"


    });




  }
  catch(error){


    console.error(
      "DELETE FEEDBACK ERROR:",
      error
    );



    res.status(500).json({

      success:false,

      message:
        error instanceof Error
        ? error.message
        : "Failed to delete feedback"


    });


  }


};


}