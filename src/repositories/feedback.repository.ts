import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Feedback } from "../types/feedback";

export class FeedbackRepository {
  // ==========================================
  // CREATE FEEDBACK
  // ==========================================
  async create(feedback: Feedback): Promise<number> {
    const sql = `
      INSERT INTO feedback
      (
        patient_name,
        treatment,
        rating,
        review,
        image,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      feedback.patient_name,
      feedback.treatment,
      feedback.rating,
      feedback.review,
      feedback.image ?? null,
      feedback.status ?? "Pending",
    ];

    const [result] = await pool.execute<ResultSetHeader>(
      sql,
      values
    );

    return result.insertId;
  }

  // ==========================================
  // GET ALL FEEDBACK
  // ==========================================
  async findAll() {
    const sql = `
      SELECT *
      FROM feedback
      ORDER BY created_at DESC
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(sql);

    return rows;
  }

  // ==========================================
  // GET FEEDBACK BY ID
  // ==========================================
  async findById(id: number) {
    const sql = `
      SELECT *
      FROM feedback
      WHERE id = ?
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(
      sql,
      [id]
    );

    return rows.length ? rows[0] : null;
  }

  // ==========================================
  // UPDATE FEEDBACK
  // ==========================================
  async update(
    id: number,
    feedback: Feedback
  ): Promise<boolean> {
    const sql = `
      UPDATE feedback
      SET
        patient_name = ?,
        treatment = ?,
        rating = ?,
        review = ?,
        image = ?,
        status = ?
      WHERE id = ?
    `;

    const values = [
      feedback.patient_name,
      feedback.treatment,
      feedback.rating,
      feedback.review,
      feedback.image ?? null,
      feedback.status ?? "Pending",
      id,
    ];

    const [result] = await pool.execute<ResultSetHeader>(
      sql,
      values
    );

    return result.affectedRows > 0;
  }

  // ==========================================
  // DELETE FEEDBACK
  // ==========================================
  async delete(id: number): Promise<boolean> {
    const sql = `
      DELETE FROM feedback
      WHERE id = ?
    `;

    const [result] = await pool.execute<ResultSetHeader>(
      sql,
      [id]
    );

    return result.affectedRows > 0;
  }
}