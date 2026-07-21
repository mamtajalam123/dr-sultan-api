import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Service } from "../types/service";

export class ServiceRepository {
  // ==========================================
  // CREATE SERVICE
  // ==========================================
  async create(service: Service): Promise<number> {
    const sql = `
      INSERT INTO services
      (
        name,
        category,
        duration,
        description,
        image,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values: (string | null)[] = [
      service.name ?? "",
      service.category ?? "",
      service.duration ?? "",
      service.description ?? "",
      service.image ?? null,
      service.status ?? "Active",
    ];

    const [result] = await pool.execute<ResultSetHeader>(
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
      SELECT *
      FROM services
      ORDER BY created_at DESC
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(sql);

    return rows;
  }

  // ==========================================
  // GET SERVICE BY ID
  // ==========================================
  async findById(id: number) {
    const sql = `
      SELECT *
      FROM services
      WHERE id = ?
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(
      sql,
      [id]
    );

    return rows.length > 0 ? rows[0] : null;
  }

  // ==========================================
  // UPDATE SERVICE
  // ==========================================
  async update(
    id: number,
    service: Service
  ): Promise<boolean> {
    const sql = `
      UPDATE services
      SET
        name = ?,
        category = ?,
        duration = ?,
        description = ?,
        image = ?,
        status = ?
      WHERE id = ?
    `;

    const values: (string | number | null)[] = [
      service.name ?? "",
      service.category ?? "",
      service.duration ?? "",
      service.description ?? "",
      service.image ?? null,
      service.status ?? "Active",
      id,
    ];

    const [result] = await pool.execute<ResultSetHeader>(
      sql,
      values
    );

    return result.affectedRows > 0;
  }

  // ==========================================
  // DELETE SERVICE
  // ==========================================
  async delete(id: number): Promise<boolean> {
    const sql = `
      DELETE FROM services
      WHERE id = ?
    `;

    const [result] = await pool.execute<ResultSetHeader>(
      sql,
      [id]
    );

    return result.affectedRows > 0;
  }
}