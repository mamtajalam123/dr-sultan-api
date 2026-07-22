import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ServiceCategory } from "../types/service-category";

export class ServiceCategoryRepository {
  // ==========================================
  // CREATE CATEGORY
  // ==========================================
  async create(category: ServiceCategory) {
    const sql = `
      INSERT INTO service_categories
      (
        name,
        status
      )
      VALUES (?, ?)
    `;

    const values = [
      category.name,
      category.status ?? "Active",
    ];

    const [result] =
      await pool.execute<ResultSetHeader>(
        sql,
        values
      );

    return result.insertId;
  }

  // ==========================================
  // GET ALL CATEGORIES
  // ==========================================
  async findAll() {
    const sql = `
      SELECT *
      FROM service_categories
      ORDER BY created_at DESC
    `;

    const [rows] =
      await pool.execute<RowDataPacket[]>(sql);

    return rows;
  }

  // ==========================================
  // GET CATEGORY BY ID
  // ==========================================
  async findById(id: number) {
    const sql = `
      SELECT *
      FROM service_categories
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
  // UPDATE CATEGORY
  // ==========================================
  async update(
    id: number,
    category: ServiceCategory
  ) {
    const sql = `
      UPDATE service_categories
      SET
        name = ?,
        status = ?
      WHERE id = ?
    `;

    const values = [
      category.name,
      category.status ?? "Active",
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
  // DELETE CATEGORY
  // ==========================================
  async delete(id: number) {
    const sql = `
      DELETE FROM service_categories
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