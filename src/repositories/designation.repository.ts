import pool from "../config/db";
import {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";
import { Designation } from "../types/designation";

export class DesignationRepository {
  // ==========================================
  // CREATE DESIGNATION
  // ==========================================
  async create(designation: Designation) {
    const sql = `
      INSERT INTO team_designations
      (
        name,
        status
      )
      VALUES (?, ?)
    `;

    const values = [
      designation.name,
      designation.status ?? "Active",
    ];

    const [result] =
      await pool.execute<ResultSetHeader>(
        sql,
        values
      );

    return result.insertId;
  }

  // ==========================================
  // GET ALL DESIGNATIONS
  // ==========================================
  async findAll() {
    const sql = `
      SELECT *
      FROM team_designations
      ORDER BY created_at DESC
    `;

    const [rows] =
      await pool.execute<RowDataPacket[]>(sql);

    return rows;
  }

  // ==========================================
  // GET DESIGNATION BY ID
  // ==========================================
  async findById(id: number) {
    const sql = `
      SELECT *
      FROM team_designations
      WHERE id = ?
    `;

    const [rows] =
      await pool.execute<RowDataPacket[]>(
        sql,
        [id]
      );

    return rows.length ? rows[0] : null;
  }

  // ==========================================
  // UPDATE DESIGNATION
  // ==========================================
  async update(
    id: number,
    designation: Designation
  ) {
    const sql = `
      UPDATE team_designations
      SET
        name = ?,
        status = ?
      WHERE id = ?
    `;

    const values = [
      designation.name,
      designation.status ?? "Active",
      id,
    ];

    const [result] =
      await pool.execute<ResultSetHeader>(
        sql,
        values
      );

    return result.affectedRows > 0;
  }

  // ==========================================
  // FIND DESIGNATION BY NAME
  // ==========================================
  async findDesignationByName(
    name: string
  ) {
    const sql = `
      SELECT *
      FROM team_designations
      WHERE LOWER(name) = LOWER(?)
      LIMIT 1
    `;

    const [rows] =
      await pool.execute<RowDataPacket[]>(
        sql,
        [name.trim()]
      );

    return rows.length
      ? rows[0]
      : null;
  }

  // ==========================================
  // DELETE DESIGNATION
  // ==========================================
  async delete(id: number) {
    const sql = `
      DELETE FROM team_designations
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