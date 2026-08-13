import pool from "../config/db";
import { Team } from "../types/team";


export class TeamRepository {


  // ==========================
  // CREATE TEAM MEMBER
  // ==========================

  async create(team: Team) {


    const sql = `

      INSERT INTO teams

      (
        name,
        designation_id,
        specialization,
        experience,
        email,
        phone,
        image,
        bio,
        status
      )

      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

    `;


    const values = [

      team.name,

      team.designationId,

      team.specialization ?? null,

      team.experience ?? null,

      team.email ?? null,

      team.phone ?? null,

      team.image ?? null,

      team.bio ?? null,

      team.status ?? "Active"

    ];



    const [result]: any =
      await pool.execute(
        sql,
        values
      );



    return {

      id: result.insertId,

      ...team

    };


  }





  // ==========================
  // GET ALL TEAM MEMBERS
  // ==========================


  async findAll(){


    const sql = `

      SELECT


      teams.id,

      teams.name,

      teams.designation_id,


      designations.name AS designation,


      teams.specialization,

      teams.experience,

      teams.email,

      teams.phone,

      teams.image,

      teams.bio,

      teams.status,

      teams.created_at,

      teams.updated_at



      FROM teams



      LEFT JOIN designations


      ON teams.designation_id = designations.id



      ORDER BY teams.id DESC


    `;



    const [rows]:any =

      await pool.execute(sql);



    return rows;


  }






  // ==========================
  // GET SINGLE TEAM MEMBER
  // ==========================


  async findById(
    id:number
  ){



    const sql = `


      SELECT


      teams.id,

      teams.name,

      teams.designation_id,


      designations.name AS designation,


      teams.specialization,

      teams.experience,

      teams.email,

      teams.phone,

      teams.image,

      teams.bio,

      teams.status,

      teams.created_at,

      teams.updated_at



      FROM teams



      LEFT JOIN designations


      ON teams.designation_id = designations.id



      WHERE teams.id=?



    `;



    const [rows]:any =

      await pool.execute(

        sql,

        [id]

      );



    return rows[0] || null;


  }







  // ==========================
  // UPDATE TEAM MEMBER
  // ==========================


  async update(

    id:number,

    team:Team

  ){



    const sql = `


      UPDATE teams SET


      name=?,


      designation_id=?,


      specialization=?,


      experience=?,


      email=?,


      phone=?,


      image=?,


      bio=?,


      status=?



      WHERE id=?


    `;




    const values = [


      team.name,


      team.designationId,


      team.specialization ?? null,


      team.experience ?? null,


      team.email ?? null,


      team.phone ?? null,


      team.image ?? null,


      team.bio ?? null,


      team.status ?? "Active",


      id


    ];




    await pool.execute(

      sql,

      values

    );




    return {

      id,

      ...team

    };


  }







  // ==========================
  // DELETE TEAM MEMBER
  // ==========================


  async delete(

    id:number

  ){



    await pool.execute(

      `

      DELETE FROM teams

      WHERE id=?

      `,

      [

        id

      ]

    );



    return true;


  }


}