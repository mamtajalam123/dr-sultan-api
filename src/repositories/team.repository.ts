import pool from "../config/db";
import { ResultSetHeader } from "mysql2";
import { Team } from "../types/team";

export class TeamRepository {

  // ==========================================
  // CREATE TEAM MEMBER
  // ==========================================
  async create(team: Team) {

    const sql = `
      INSERT INTO teams
      (
        name,
        designation,
        specialization,
        experience,
        email,
        phone,
        image,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const values = [
      team.name ?? null,
      team.designation ?? null,
      team.specialization ?? null,
      team.experience ?? null,
      team.email ?? null,
      team.phone ?? null,
      team.image ?? null,
      team.status ?? "Active",
    ];


    const [result] =
      await pool.execute<ResultSetHeader>(
        sql,
        values
      );


    return result.insertId;
  }



  // ==========================================
  // GET ALL TEAM MEMBERS
  // ==========================================
  async findAll() {

    const sql = `
      SELECT *
      FROM teams
      ORDER BY created_at DESC
    `;


    const [rows] =
      await pool.execute(sql);


    return rows;
  }



  // ==========================================
  // GET TEAM MEMBER BY ID
  // ==========================================
  async findById(id:number) {

    const sql = `
      SELECT *
      FROM teams
      WHERE id = ?
    `;


    const [rows]:any =
      await pool.execute(
        sql,
        [id]
      );


    return rows[0] || null;
  }



  // ==========================================
  // UPDATE TEAM MEMBER
  // ==========================================
  async update(
    id:number,
    team:Team
  ) {

    const sql = `
      UPDATE teams
      SET
        name = ?,
        designation = ?,
        specialization = ?,
        experience = ?,
        email = ?,
        phone = ?,
        image = ?,
        status = ?
      WHERE id = ?
    `;


    const values = [

      team.name ?? null,

      team.designation ?? null,

      team.specialization ?? null,

      team.experience ?? null,

      team.email ?? null,

      team.phone ?? null,

      team.image ?? null,

      team.status ?? "Active",

      id

    ];



    const [result] =
      await pool.execute<ResultSetHeader>(
        sql,
        values
      );


    return result.affectedRows > 0;

  }



  // ==========================================
  // DELETE TEAM MEMBER
  // ==========================================
  async delete(id:number) {

    const sql = `
      DELETE FROM teams
      WHERE id = ?
    `;


    const [result] =
      await pool.execute<ResultSetHeader>(
        sql,
        [id]
      );


    return result.affectedRows > 0;

  }

}