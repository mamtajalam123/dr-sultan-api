import {
  Request,
  Response
} from "express";

import {
  TeamService
} from "../services/team.service";


const teamService =
new TeamService();



export class TeamController {


  // ======================================
  // CREATE TEAM MEMBER
  // ======================================


  static async create(
    req:Request,
    res:Response
  ){

    try{


      const data = {


        ...req.body,


        designationId:
          Number(
            req.body.designationId
          ),



        image:

          req.file

          ? `/uploads/team/${req.file.filename}`

          : null


      };



      console.log(
        "CREATE TEAM CONTROLLER:",
        data
      );




      const result =
        await teamService.create(
          data
        );



      return res.status(201).json({

        success:true,

        message:
          "Team member added",

        data:result

      });



    }
    catch(error:any){


      console.log(
        "CREATE TEAM ERROR:",
        error
      );


      return res.status(500).json({

        success:false,

        message:error.message

      });


    }


  }








  // ======================================
  // GET ALL
  // ======================================


  static async getAll(
    req:Request,
    res:Response
  ){

    try{


      const result =
        await teamService.getAll();



      return res.json({

        success:true,

        data:result

      });



    }
    catch(error:any){


      return res.status(500).json({

        success:false,

        message:error.message

      });


    }

  }









  // ======================================
  // GET BY ID
  // ======================================


  static async getById(
    req:Request,
    res:Response
  ){

    try{


      const id =
        Number(
          req.params.id
        );



      if(!id){

        return res.status(400).json({

          success:false,

          message:
          "Invalid team id"

        });

      }



      const result =
        await teamService.getById(
          id
        );



      return res.json({

        success:true,

        data:result

      });



    }
    catch(error:any){


      return res.status(500).json({

        success:false,

        message:error.message

      });


    }

  }









  // ======================================
  // UPDATE TEAM MEMBER
  // ======================================


  static async update(
    req:Request,
    res:Response
  ){

    try{


      const id =
        Number(
          req.params.id
        );




      const oldTeam =
        await teamService.getById(id);



      const data = {


        ...req.body,


        designationId:
          Number(
            req.body.designationId
          ),



        image:

          req.file

          ? `/uploads/team/${req.file.filename}`

          : oldTeam?.image ?? null



      };





      console.log(
        "UPDATE TEAM CONTROLLER:",
        data
      );





      const result =
        await teamService.update(

          id,

          data

        );





      return res.json({

        success:true,

        message:
        "Team updated",

        data:result

      });



    }
    catch(error:any){


      return res.status(500).json({

        success:false,

        message:error.message

      });


    }


  }









  // ======================================
  // DELETE
  // ======================================


  static async delete(
    req:Request,
    res:Response
  ){

    try{


      const id =
        Number(
          req.params.id
        );



      await teamService.delete(
        id
      );



      return res.json({

        success:true,

        message:
        "Team deleted"

      });



    }
    catch(error:any){


      return res.status(500).json({

        success:false,

        message:error.message

      });


    }

  }



}