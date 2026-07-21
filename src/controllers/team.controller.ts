import { Request, Response } from "express";
import { TeamService } from "../services/team.service";

export class TeamController {
  private service = new TeamService();

  // ==========================================
  // CREATE TEAM MEMBER
  // POST /api/teams
  // ==========================================
  create = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {

      console.log("CREATE TEAM BODY:", req.body);

      const id = await this.service.createTeam(
        req.body
      );

      return res.status(201).json({
        success: true,
        status: "201 Created",
        message: "Team member created successfully.",
        id,
      });

    } catch (error: any) {

      console.error(
        "CREATE TEAM ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message ||
          "Failed to create team member.",
      });
    }
  };


  // ==========================================
  // GET ALL TEAM MEMBERS
  // GET /api/teams
  // ==========================================
  getAll = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    try {

      const teams =
        await this.service.getTeams();


      return res.status(200).json({
        success:true,
        status:"200 OK",
        data:teams,
      });


    } catch(error:any){

      console.error(
        "GET TEAM ERROR:",
        error
      );


      return res.status(500).json({
        success:false,
        status:"500 Internal Server Error",
        message:
          error.message ||
          "Failed to fetch team members.",
      });

    }

  };


  // ==========================================
  // GET TEAM MEMBER BY ID
  // GET /api/teams/:id
  // ==========================================
  getById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    try {

      const id =
        Number(req.params.id);


      const team =
        await this.service.getTeamById(id);


      if(!team){

        return res.status(404).json({
          success:false,
          status:"404 Not Found",
          message:"Team member not found.",
        });

      }


      return res.status(200).json({
        success:true,
        status:"200 OK",
        data:team,
      });


    }catch(error:any){

      console.error(
        "GET TEAM BY ID ERROR:",
        error
      );


      return res.status(500).json({
        success:false,
        status:"500 Internal Server Error",
        message:
          error.message ||
          "Failed to fetch team member.",
      });

    }

  };


  // ==========================================
  // UPDATE TEAM MEMBER
  // PUT /api/teams/:id
  // ==========================================
  update = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    try {

      const id =
        Number(req.params.id);


      const updated =
        await this.service.updateTeam(
          id,
          req.body
        );


      if(!updated){

        return res.status(404).json({
          success:false,
          status:"404 Not Found",
          message:"Team member not found.",
        });

      }


      return res.status(200).json({
        success:true,
        status:"200 OK",
        message:
          "Team member updated successfully.",
      });


    }catch(error:any){

      console.error(
        "UPDATE TEAM ERROR:",
        error
      );


      return res.status(500).json({
        success:false,
        status:"500 Internal Server Error",
        message:
          error.message ||
          "Failed to update team member.",
      });

    }

  };


  // ==========================================
  // DELETE TEAM MEMBER
  // DELETE /api/teams/:id
  // ==========================================
  remove = async (
    req: Request,
    res: Response
  ): Promise<Response> => {

    try {

      const id =
        Number(req.params.id);


      const deleted =
        await this.service.deleteTeam(id);


      if(!deleted){

        return res.status(404).json({
          success:false,
          status:"404 Not Found",
          message:"Team member not found.",
        });

      }


      return res.status(200).json({
        success:true,
        status:"200 OK",
        message:
          "Team member deleted successfully.",
      });


    }catch(error:any){

      console.error(
        "DELETE TEAM ERROR:",
        error
      );


      return res.status(500).json({
        success:false,
        status:"500 Internal Server Error",
        message:
          error.message ||
          "Failed to delete team member.",
      });

    }

  };

}