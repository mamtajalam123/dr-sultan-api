import pool from "../config/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Gallery } from "../types/gallery";

export class GalleryRepository {
  // ==========================================
  // CREATE GALLERY
  // ==========================================
  async create(gallery: Gallery) {
    const sql = `
      INSERT INTO gallery
      (
        title,
        description,
        category,
        type,
        image,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      gallery.title,
      gallery.description,
      gallery.category,
      gallery.type,
      gallery.image ?? null,
      gallery.status ?? "Active",
    ];

    const [result] = await pool.execute<ResultSetHeader>(
      sql,
      values
    );

    return result.insertId;
  }

  // ==========================================
  // GET ALL GALLERY
  // ==========================================
  async findAll() {
    const sql = `
      SELECT *
      FROM gallery
      ORDER BY created_at DESC
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(sql);

    return rows;
  }

  // ==========================================
  // GET GALLERY BY ID
  // ==========================================
  async findById(id: number) {
    const sql = `
      SELECT *
      FROM gallery
      WHERE id = ?
    `;

    const [rows] = await pool.execute<RowDataPacket[]>(
      sql,
      [id]
    );

    return rows.length ? rows[0] : null;
  }

  // ==========================================
  // UPDATE GALLERY
  // ==========================================
  async update(
    id: number,
    gallery: Gallery
  ) {
    const sql = `
      UPDATE gallery
      SET
        title = ?,
        description = ?,
        category = ?,
        type = ?,
        image = ?,
        status = ?
      WHERE id = ?
    `;

    const values = [
      gallery.title,
      gallery.description,
      gallery.category,
      gallery.type,
      gallery.image ?? null,
      gallery.status ?? "Active",
      id,
    ];

    const [result] = await pool.execute<ResultSetHeader>(
      sql,
      values
    );

    return result.affectedRows > 0;
  }

  // ==========================================
  // DELETE GALLERY
  // ==========================================
  async delete(id: number) {
    const sql = `
      DELETE FROM gallery
      WHERE id = ?
    `;

    const [result] = await pool.execute<ResultSetHeader>(
      sql,
      [id]
    );

    return result.affectedRows > 0;
  }
}