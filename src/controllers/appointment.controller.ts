import { Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";


export class AppointmentController {

  private service =
    new AppointmentService();



  // ==========================================
  // CREATE APPOINTMENT
  // POST /api/appointments
  // ==========================================
  create = async (
    req: Request,
    res: Response
  ) => {

    try {


      const id =
        await this.service.createAppointment(
          req.body
        );



      return res.status(201).json({

        success: true,

        status:201,

        message:
          "Appointment created successfully.",

        id

      });



    } catch(error) {


      console.error(
        "CREATE APPOINTMENT ERROR:",
        error
      );



      return res.status(500).json({

        success:false,

        status:500,

        message:
          "Failed to create appointment.",

        error:
          error instanceof Error
            ? error.message
            : String(error)

      });


    }

  };





  // ==========================================
  // GET ALL APPOINTMENTS
  // GET /api/appointments
  // ==========================================
  getAll = async (
    req: Request,
    res: Response
  ) => {


    try {


      const appointments =
        await this.service.getAppointments();



      return res.status(200).json({

        success:true,

        status:200,

        data:
          appointments

      });



    } catch(error) {


      console.error(error);



      return res.status(500).json({

        success:false,

        status:500,

        message:
          "Failed to fetch appointments."

      });


    }

  };






  // ==========================================
  // GET APPOINTMENT BY ID
  // GET /api/appointments/:id
  // ==========================================
  getById = async (
    req: Request,
    res: Response
  ) => {


    try {


      const id =
        Number(req.params.id);



      const appointment =
        await this.service.getAppointmentById(
          id
        );



      if(!appointment){


        return res.status(404).json({

          success:false,

          status:404,

          message:
            "Appointment not found."

        });


      }




      return res.status(200).json({

        success:true,

        status:200,

        data:
          appointment

      });



    } catch(error) {


      console.error(error);



      return res.status(500).json({

        success:false,

        status:500,

        message:
          "Failed to fetch appointment."

      });


    }


  };
    // ==========================================
  // UPDATE APPOINTMENT
  // PUT /api/appointments/:id
  // ==========================================
  update = async (
    req: Request,
    res: Response
  ) => {

    try {

      const id =
        Number(req.params.id);



      const result =
        await this.service.updateAppointment(
          id,
          req.body
        );



      if (!result) {

        return res.status(404).json({

          success:false,

          status:404,

          message:
            "Appointment not found."

        });

      }



      return res.status(200).json({

        success:true,

        status:200,

        message:
          "Appointment updated successfully."

      });



    } catch(error) {


      console.error(error);



      return res.status(500).json({

        success:false,

        status:500,

        message:
          "Failed to update appointment."

      });


    }

  };





  // ==========================================
  // UPDATE STATUS
  // PATCH /api/appointments/:id/status
  // ==========================================
  updateStatus = async (
    req: Request,
    res: Response
  ) => {


    try {


      const id =
        Number(req.params.id);



      const { status } =
        req.body;




      // Allowed status dropdown values
      const allowedStatus = [

        "Pending",

        "Confirmed",

        "Completed",

        "Cancelled"

      ];




      if(
        !allowedStatus.includes(status)
      ){


        return res.status(400).json({

          success:false,

          status:400,

          message:
            "Invalid appointment status.",

          allowedValues:
            allowedStatus

        });


      }




      const result =
        await this.service.updateStatus(
          id,
          status
        );




      if(!result){


        return res.status(404).json({

          success:false,

          status:404,

          message:
            "Appointment not found."

        });


      }





      return res.status(200).json({

        success:true,

        status:200,

        message:
          "Status updated successfully."

      });



    } catch(error){


      console.error(error);



      return res.status(500).json({

        success:false,

        status:500,

        message:
          "Failed to update status."

      });


    }

  };
    // ==========================================
  // UPDATE PAYMENT
  // PATCH /api/appointments/:id/payment
  // ==========================================
  updatePayment = async (
    req: Request,
    res: Response
  ) => {


    try {


      const id =
        Number(req.params.id);



      const { payment } =
        req.body;




      // Allowed payment dropdown values
      const allowedPayments = [

        "Paid",

        "Unpaid",

        "Pending",

        "Failed"

      ];




      if(
        !allowedPayments.includes(payment)
      ){


        return res.status(400).json({

          success:false,

          status:400,

          message:
            "Invalid payment status.",

          allowedValues:
            allowedPayments

        });


      }




      const result =
        await this.service.updatePayment(
          id,
          payment
        );




      if(!result){


        return res.status(404).json({

          success:false,

          status:404,

          message:
            "Appointment not found."

        });


      }





      return res.status(200).json({

        success:true,

        status:200,

        message:
          "Payment updated successfully."

      });



    } catch(error){


      console.error(error);



      return res.status(500).json({

        success:false,

        status:500,

        message:
          "Failed to update payment."

      });


    }

  };





  // ==========================================
  // DELETE APPOINTMENT
  // DELETE /api/appointments/:id
  // ==========================================
  remove = async (
    req: Request,
    res: Response
  ) => {


    try {


      const id =
        Number(req.params.id);




      const result =
        await this.service.deleteAppointment(
          id
        );




      if(!result){


        return res.status(404).json({

          success:false,

          status:404,

          message:
            "Appointment not found."

        });


      }




      return res.status(200).json({

        success:true,

        status:200,

        message:
          "Appointment deleted successfully."

      });



    } catch(error){


      console.error(error);



      return res.status(500).json({

        success:false,

        status:500,

        message:
          "Failed to delete appointment."

      });


    }

  };


}