import { Request, Response } from "express";

import { ServiceService } from "../services/service.service";

import { Service } from "../types/service";



export class ServiceController {


  private service =
    new ServiceService();





  // ==========================================
  // CREATE SERVICE
  // ==========================================

  create = async(
    req: Request,
    res: Response
  ) => {


    try {


      const image =
        req.file
          ? `/uploads/services/${req.file.filename}`
          : null;



      const service: Service = {


        name:
          req.body.name || "",



        categoryId:
          req.body.categoryId
          ?
          Number(req.body.categoryId)
          :
          null,



        duration:
          req.body.duration || "",



        shortDescription:
          req.body.shortDescription || "",



        description:
          req.body.description || "",



        image,



        status:
          req.body.status || "Active",


      };



      console.log(
        "CREATE SERVICE:",
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

        id

      });



    }
    catch(error:any){


      console.error(
        "CREATE SERVICE ERROR:",
        error
      );



      return res.status(500).json({

        success:false,

        message:error.message

      });


    }


  };









  // ==========================================
  // GET ALL SERVICES
  // ==========================================

  getAll = async(
    req:Request,
    res:Response
  )=>{


    try{


      const services =
        await this.service.getServices();



      return res.status(200).json({

        success:true,

        data:services

      });



    }
    catch(error:any){


      return res.status(500).json({

        success:false,

        message:error.message

      });


    }


  };









  // ==========================================
  // GET SERVICE BY ID
  // ==========================================

  getById = async(
    req:Request,
    res:Response
  )=>{


    try{


      const id =
        Number(req.params.id);



      if(!id){

        return res.status(400).json({

          success:false,

          message:
            "Invalid service id"

        });

      }



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



    }
    catch(error:any){


      console.error(
        "GET SERVICE BY ID ERROR:",
        error
      );



      return res.status(500).json({

        success:false,

        message:error.message

      });


    }


  };









  // ==========================================
  // GET SERVICE BY SLUG
  // ==========================================

  getBySlug = async(
    req:Request,
    res:Response
  )=>{


    try{


      const slug =
        Array.isArray(req.params.slug)

        ? 

        req.params.slug[0]

        :

        req.params.slug;



      const service =
        await this.service.getServiceBySlug(
          slug
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



    }
    catch(error:any){


      console.error(
        "GET SERVICE BY SLUG ERROR:",
        error
      );



      return res.status(500).json({

        success:false,

        message:error.message

      });


    }


  };









  // ==========================================
  // UPDATE SERVICE
  // ==========================================

  update = async(
    req:Request,
    res:Response
  )=>{


    try{


      const id =
        Number(req.params.id);



      if(!id){

        return res.status(400).json({

          success:false,

          message:
            "Invalid service id"

        });

      }




      const service:Partial<Service> = {



        name:
          req.body.name || "",



        categoryId:
          req.body.categoryId
          ?
          Number(req.body.categoryId)
          :
          null,



        duration:
          req.body.duration || "",



        shortDescription:
          req.body.shortDescription || "",



        description:
          req.body.description || "",



        status:
          req.body.status || "Active",


      };





      if(req.file){


        service.image =
          `/uploads/services/${req.file.filename}`;


      }





      const updated =
        await this.service.updateService(

          id,

          service as Service

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



    }
    catch(error:any){


      console.error(
        "UPDATE SERVICE ERROR:",
        error
      );



      return res.status(500).json({

        success:false,

        message:error.message

      });


    }


  };









  // ==========================================
  // DELETE SERVICE
  // ==========================================

  remove = async(
    req:Request,
    res:Response
  )=>{


    try{


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



    }
    catch(error:any){


      console.error(
        "DELETE SERVICE ERROR:",
        error
      );



      return res.status(500).json({

        success:false,

        message:error.message

      });


    }


  };


}