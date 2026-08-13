import pool from "../config/db";

import {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

import { Service } from "../types/service";


export class ServiceRepository {


  // ==========================================
  // CREATE SERVICE
  // ==========================================
  async create(
    service: Service
  ): Promise<number> {


    const sql = `
      INSERT INTO services
      (
        name,
        category_id,
        duration,
        description,
        image,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;



    const values = [

      service.name || "",


      service.categoryId > 0
        ? service.categoryId
        : null,


      service.duration || "",


      service.description || "",


      // save only filename
      service.image || null,


      service.status || "Active",

    ];



    const [result] =
      await pool.execute<ResultSetHeader>(
        sql,
        values
      );



    return result.insertId;

  }







  // ==========================================
  // GET ALL SERVICES
  // ==========================================
  async findAll() {


    const sql = `
      SELECT

        s.id,

        s.name,

        s.category_id,

        c.name AS categoryName,

        s.duration,

        s.description,

        s.image,

        s.status,

        s.created_at,

        s.updated_at


      FROM services s


      LEFT JOIN service_categories c

        ON s.category_id = c.id


      ORDER BY s.created_at DESC
    `;



    const [rows] =
      await pool.execute<RowDataPacket[]>(
        sql
      );



    return rows;

  }








  // ==========================================
  // GET SERVICE BY ID
  // ==========================================
  async findById(
    id:number
  ) {


    const sql = `
      SELECT

        s.id,

        s.name,

        s.category_id,

        c.name AS categoryName,

        s.duration,

        s.description,

        s.image,

        s.status,

        s.created_at,

        s.updated_at


      FROM services s


      LEFT JOIN service_categories c

        ON s.category_id = c.id


      WHERE s.id = ?
    `;



    const [rows] =
      await pool.execute<RowDataPacket[]>(
        sql,
        [id]
      );



    return rows.length
      ? rows[0]
      : null;

  }








  // ==========================================
  // UPDATE SERVICE
  // ==========================================
  async update(
    id:number,
    service:Service
  ):Promise<boolean>{



    const sql = `
      UPDATE services

      SET

        name = ?,

        category_id = ?,

        duration = ?,

        description = ?,

        image = ?,

        status = ?


      WHERE id = ?
    `;



    const values = [


      service.name || "",



      service.categoryId > 0
        ? service.categoryId
        : null,



      service.duration || "",



      service.description || "",



      /*
        If new image uploaded:
        save new filename

        If not:
        keep old image
      */
      service.image || null,



      service.status || "Active",



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
  // DELETE SERVICE
  // ==========================================
  async delete(
    id:number
  ):Promise<boolean>{



    const sql = `
      DELETE FROM services

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