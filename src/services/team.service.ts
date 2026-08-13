import { TeamRepository } from "../repositories/team.repository";
import { Team } from "../types/team";


const repo = new TeamRepository();


export class TeamService {


  // ==========================
  // CREATE TEAM
  // ==========================

  async create(data:any){


    if(!data.name){

      throw new Error(
        "Name required"
      );

    }


    if(!data.designationId){

      throw new Error(
        "Designation required"
      );

    }



    const team:Team = {


      name:data.name,


      designationId:
        Number(
          data.designationId
        ),


      specialization:
        data.specialization || null,


      experience:
        data.experience || null,


      email:
        data.email || null,


      phone:
        data.phone || null,


      bio:
        data.bio || null,


      image:
        data.image || null,


      status:
        data.status || "Active"


    };



    console.log(
      "SERVICE TEAM DATA:",
      team
    );



    return await repo.create(
      team
    );


  }





  // ==========================
  // GET ALL
  // ==========================

  async getAll(){

    return await repo.findAll();

  }






  // ==========================
  // GET BY ID
  // ==========================

  async getById(
    id:number
  ){

    return await repo.findById(
      id
    );

  }





  // ==========================
  // UPDATE
  // ==========================

  async update(
    id:number,
    data:Team
  ){

    return await repo.update(
      id,
      data
    );

  }





  // ==========================
  // DELETE
  // ==========================

  async delete(
    id:number
  ){

    return await repo.delete(
      id
    );

  }


}