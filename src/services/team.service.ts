import { TeamRepository } from "../repositories/team.repository";
import { Team } from "../types/team";


const repo = new TeamRepository();



export class TeamService {



  // ==========================================
  // CREATE TEAM MEMBER
  // ==========================================


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


      name:
        data.name.trim(),



      designationId:
        Number(
          data.designationId
        ),



      specialization:
        data.specialization
        ||
        null,



      experience:
        data.experience
        ||
        null,



      email:
        data.email
        ||
        null,



      phone:
        data.phone
        ||
        null,



      image:
        data.image
        ||
        null,



      bio:
        data.bio
        ||
        null,



      status:
        data.status
        ||
        "Active"


    };





    console.log(
      "CREATE TEAM SERVICE:",
      team
    );





    return await repo.create(
      team
    );


  }









  // ==========================================
  // GET ALL TEAM MEMBERS
  // ==========================================


  async getAll(){


    return await repo.findAll();


  }









  // ==========================================
  // GET TEAM BY ID
  // ==========================================


  async getById(
    id:number
  ){


    return await repo.findById(
      id
    );


  }









  // ==========================================
  // UPDATE TEAM MEMBER
  // ==========================================


  async update(

    id:number,

    data:any

  ){



    const team:Team = {


      name:
        data.name.trim(),



      designationId:
        Number(
          data.designationId
        ),



      specialization:
        data.specialization
        ||
        null,



      experience:
        data.experience
        ||
        null,



      email:
        data.email
        ||
        null,



      phone:
        data.phone
        ||
        null,



      bio:
        data.bio
        ||
        null,



      status:
        data.status
        ||
        "Active",



      // IMPORTANT
      // only update if image exists

      image:
        data.image
        ||
        undefined


    };





    console.log(
      "UPDATE TEAM SERVICE:",
      team
    );





    return await repo.update(

      id,

      team

    );


  }









  // ==========================================
  // DELETE
  // ==========================================


  async delete(

    id:number

  ){


    return await repo.delete(
      id
    );


  }



}