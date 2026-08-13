import pool from "../config/db";

import {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

// ==========================================
// TYPES
// ==========================================

export type FeedbackStatus =
  | "Pending"
  | "Approved"
  | "Rejected";

interface FeedbackRow
  extends RowDataPacket {
  id: number;

  patientName: string;

  patientImage: string | null;

  treatment: string;

  rating: number;

  review: string;

  status: FeedbackStatus;

  date: string | null;

  createdAt: string | null;

  updatedAt: string | null;
}

interface FeedbackRepositoryData {
  patientName: string;

  patientImage?: string | null;

  treatment: string;

  rating: number;

  review: string;

  status: FeedbackStatus;

  date?: string | null;
}

// ==========================================
// REPOSITORY
// ==========================================

export class FeedbackRepository {

  // ==========================================
  // NORMALIZE IMAGE PATH
  // ==========================================

  private normalizeImagePath(
    image?: string | null
  ): string | null {

    if (
      typeof image !== "string"
    ) {
      return null;
    }

    const value =
      image.trim();

    if (!value) {
      return null;
    }

    // ----------------------------------------
    // Already a complete URL
    // ----------------------------------------

    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    // ----------------------------------------
    // Remove leading slash
    // ----------------------------------------

    const cleanValue =
      value.replace(/^\/+/, "");

    // ----------------------------------------
    // Already uploads path
    //
    // uploads/feedback/image.jpg
    // ----------------------------------------

    if (
      cleanValue.startsWith(
        "uploads/"
      )
    ) {
      return `/${cleanValue}`;
    }

    // ----------------------------------------
    // Filename only
    //
    // image.jpg
    //
    // becomes:
    //
    // /uploads/feedback/image.jpg
    // ----------------------------------------

    return `/uploads/feedback/${cleanValue}`;
  }

  // ==========================================
  // MAP DATABASE ROW
  // ==========================================

  private mapRow(
    row: FeedbackRow
  ): FeedbackRow {

    return {
      ...row,

      patientImage:
        this.normalizeImagePath(
          row.patientImage
        ),
    };
  }

  // ==========================================
  // GET ALL FEEDBACK
  // ==========================================

  async findAll(): Promise<
    FeedbackRow[]
  > {

    const sql = `
      SELECT
        id,
        patient_name AS patientName,
        patient_image AS patientImage,
        treatment,
        rating,
        review,
        status,
        date,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM feedback
      ORDER BY id DESC
    `;

    const [rows] =
      await pool.execute<
        FeedbackRow[]
      >(sql);

    const feedbacks =
      rows.map((row) =>
        this.mapRow(row)
      );

    console.log(
      "========== FEEDBACK FIND ALL =========="
    );

    console.log(
      "FEEDBACK ROW COUNT:",
      feedbacks.length
    );

    if (
      feedbacks.length > 0
    ) {
      console.log(
        "FIRST FEEDBACK IMAGE:",
        feedbacks[0]
          .patientImage
      );
    }

    return feedbacks;
  }

  // ==========================================
  // GET SINGLE FEEDBACK
  // ==========================================

  async findById(
    id: number
  ): Promise<
    FeedbackRow | null
  > {

    const sql = `
      SELECT
        id,
        patient_name AS patientName,
        patient_image AS patientImage,
        treatment,
        rating,
        review,
        status,
        date,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM feedback
      WHERE id = ?
      LIMIT 1
    `;

    const [rows] =
      await pool.execute<
        FeedbackRow[]
      >(
        sql,
        [id]
      );

    const row =
      rows[0] ?? null;

    if (!row) {
      console.log(
        "FEEDBACK NOT FOUND:",
        id
      );

      return null;
    }

    const feedback =
      this.mapRow(row);

    console.log(
      "========== FEEDBACK FIND BY ID =========="
    );

    console.log(
      "FEEDBACK ID:",
      id
    );

    console.log(
      "PATIENT IMAGE:",
      feedback.patientImage
    );

    return feedback;
  }

  // ==========================================
  // CREATE FEEDBACK
  // ==========================================

  async create(
    data: FeedbackRepositoryData
  ): Promise<number> {

    const patientImage =
      this.normalizeImagePath(
        data.patientImage
      );

    const sql = `
      INSERT INTO feedback (
        patient_name,
        patient_image,
        treatment,
        rating,
        review,
        status,
        date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.patientName,
      patientImage,
      data.treatment,
      data.rating,
      data.review,
      data.status,
      data.date ?? null,
    ];

    console.log(
      "========== FEEDBACK CREATE =========="
    );

    console.log(
      "PATIENT NAME:",
      data.patientName
    );

    console.log(
      "PATIENT IMAGE:",
      patientImage
    );

    console.log(
      "SQL VALUES:",
      values
    );

    const [result] =
      await pool.execute<
        ResultSetHeader
      >(
        sql,
        values
      );

    console.log(
      "CREATED FEEDBACK ID:",
      result.insertId
    );

    return result.insertId;
  }

  // ==========================================
  // UPDATE FEEDBACK
  // ==========================================

  async update(
    id: number,
    data: FeedbackRepositoryData
  ): Promise<boolean> {

    const patientImage =
      this.normalizeImagePath(
        data.patientImage
      );

    const sql = `
      UPDATE feedback
      SET
        patient_name = ?,
        patient_image = ?,
        treatment = ?,
        rating = ?,
        review = ?,
        status = ?,
        date = ?
      WHERE id = ?
    `;

    const values = [
      data.patientName,
      patientImage,
      data.treatment,
      data.rating,
      data.review,
      data.status,
      data.date ?? null,
      id,
    ];

    console.log(
      "========== FEEDBACK UPDATE =========="
    );

    console.log(
      "FEEDBACK ID:",
      id
    );

    console.log(
      "PATIENT IMAGE:",
      patientImage
    );

    console.log(
      "SQL VALUES:",
      values
    );

    const [result] =
      await pool.execute<
        ResultSetHeader
      >(
        sql,
        values
      );

    console.log(
      "UPDATE AFFECTED ROWS:",
      result.affectedRows
    );

    return (
      result.affectedRows > 0
    );
  }

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  async updateStatus(
    id: number,
    status: FeedbackStatus
  ): Promise<boolean> {

    const sql = `
      UPDATE feedback
      SET
        status = ?
      WHERE id = ?
    `;

    const [result] =
      await pool.execute<
        ResultSetHeader
      >(
        sql,
        [
          status,
          id,
        ]
      );

    console.log(
      "UPDATE FEEDBACK STATUS:",
      {
        id,
        status,
        affectedRows:
          result.affectedRows,
      }
    );

    return (
      result.affectedRows > 0
    );
  }

  // ==========================================
  // DELETE FEEDBACK
  // ==========================================

  async delete(
    id: number
  ): Promise<boolean> {

    const sql = `
      DELETE FROM feedback
      WHERE id = ?
    `;

    const [result] =
      await pool.execute<
        ResultSetHeader
      >(
        sql,
        [id]
      );

    console.log(
      "DELETE FEEDBACK:",
      {
        id,
        affectedRows:
          result.affectedRows,
      }
    );

    return (
      result.affectedRows > 0
    );
  }
}