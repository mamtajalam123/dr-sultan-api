import { Request, Response } from "express";
import { ServiceService } from "../services/service.service";


export class ServiceController {

  private service = new ServiceService();



  // ==========================================
  // CREATE SERVICE
  // POST /api/services
  // ==========================================
  create = async (
    req: Request,
    res: Response
  ) => {

    try {


      console.log(
        "SERVICE BODY:",
        req.body
      );


      console.log(
        "SERVICE FILE:",
        req.file
      );



      const service = {

        name:
          req.body.name || "",


        categoryId:
          Number(
            req.body.categoryId
          ),


        duration:
          req.body.duration || "",


        description:
          req.body.description || "",


        image:
          req.file
            ? req.file.filename
            : null,


        status:
          req.body.status || "Active",

      };



      console.log(
        "FINAL SERVICE:",
        service
      );



      const id =
        await this.service.createService(
          service
        );



      return res.status(201).json({

        success:true,

        message:
          "Service created successfully.",

        id,

      });



    } catch(error:any) {


      console.error(
        "CREATE SERVICE ERROR:",
        error
      );


      return res.status(500).json({

        success:false,

        message:
          error.message ||
          "Failed to create service."

      });


    }

  };






  // ==========================================
  // GET ALL SERVICES
  // ==========================================
  getAll = async (
    req: Request,
    res: Response
  ) => {

    try {


      const services =
        await this.service.getServices();



      return res.status(200).json({

        success:true,

        data:services,

      });



    } catch(error:any) {


      console.error(
        "GET SERVICES ERROR:",
        error
      );


      return res.status(500).json({

        success:false,

        message:
          error.message

      });


    }

  };






  // ==========================================
  // GET SERVICE BY ID
  // ==========================================
  getById = async (
    req: Request,
    res: Response
  ) => {

    try {


      const id =
        Number(req.params.id);



      const service =
        await this.service.getServiceById(
          id
        );



      if(!service){

        return res.status(404).json({

          success:false,

          message:
            "Service not found."

        });

      }



      return res.status(200).json({

        success:true,

        data:service

      });



    } catch(error:any) {


      console.error(
        "GET SERVICE ERROR:",
        error
      );


      return res.status(500).json({

        success:false,

        message:
          error.message

      });


    }

  };







  // ==========================================
  // UPDATE SERVICE
  // ==========================================
  update = async (
    req: Request,
    res: Response
  ) => {

    try {


      const id =
        Number(req.params.id);



      const service = {


        name:
          req.body.name || "",


        categoryId:
          Number(
            req.body.categoryId
          ),


        duration:
          req.body.duration || "",


        description:
          req.body.description || "",


        image:
          req.file
            ? req.file.filename
            : req.body.image || null,


        status:
          req.body.status || "Active",


      };



      console.log(
        "UPDATE SERVICE:",
        service
      );



      const updated =
        await this.service.updateService(
          id,
          service
        );



      if(!updated){

        return res.status(404).json({

          success:false,

          message:
            "Service not found."

        });

      }



      return res.status(200).json({

        success:true,

        message:
          "Service updated successfully."

      });



    } catch(error:any) {


      console.error(
        "UPDATE SERVICE ERROR:",
        error
      );


      return res.status(500).json({

        success:false,

        message:
          error.message

      });


    }

  };







  // ==========================================
  // DELETE SERVICE
  // ==========================================
  remove = async (
    req: Request,
    res: Response
  ) => {

    try {


      const id =
        Number(req.params.id);



      const deleted =
        await this.service.deleteService(
          id
        );



      if(!deleted){

        return res.status(404).json({

          success:false,

          message:
            "Service not found."

        });

      }



      return res.status(200).json({

        success:true,

        message:
          "Service deleted successfully."

      });



    } catch(error:any) {


      console.error(
        "DELETE SERVICE ERROR:",
        error
      );


      return res.status(500).json({

        success:false,

        message:
          error.message

      });


    }

  };


}