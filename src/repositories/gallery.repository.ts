import pool from "../config/db";
import {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

import { Gallery } from "../types/gallery";

export class GalleryRepository {
  // ==========================================
  // CREATE GALLERY
  // ==========================================

  async create(gallery: Gallery): Promise<number> {
    const sql = `
      INSERT INTO gallery
      (
        title,
        description,
        service_id,
        type,
        image,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      gallery.title,
      gallery.description ?? null,
      gallery.serviceId ?? null,
      gallery.type || "Image",
      gallery.image ?? null,
      gallery.status || "Active",
    ];

    console.log("========== CREATE GALLERY REPOSITORY ==========");
    console.log("GALLERY:", gallery);
    console.log("SQL VALUES:", values);

    const [result] =
      await pool.execute<ResultSetHeader>(
        sql,
        values
      );

    return result.insertId;
  }

  // ==========================================
  // GET ALL GALLERY
  // ==========================================

  async findAll(): Promise<Gallery[]> {
    const sql = `
      SELECT
        g.id,
        g.title,
        g.description,

        g.service_id AS serviceId,

        sc.name AS serviceName,

        g.type,
        g.image,
        g.status,
        g.created_at,
        g.updated_at

      FROM gallery g

      LEFT JOIN service_categories sc
        ON sc.id = g.service_id

      ORDER BY g.created_at DESC
    `;

    const [rows] =
      await pool.execute<RowDataPacket[]>(
        sql
      );

    return rows as Gallery[];
  }

  // ==========================================
  // GET GALLERY BY ID
  // ==========================================

  async findById(
    id: number
  ): Promise<Gallery | null> {
    const sql = `
      SELECT
        g.id,
        g.title,
        g.description,

        g.service_id AS serviceId,

        sc.name AS serviceName,

        g.type,
        g.image,
        g.status,
        g.created_at,
        g.updated_at

      FROM gallery g

      LEFT JOIN service_categories sc
        ON sc.id = g.service_id

      WHERE g.id = ?

      LIMIT 1
    `;

    const [rows] =
      await pool.execute<RowDataPacket[]>(
        sql,
        [id]
      );

    if (rows.length === 0) {
      return null;
    }

    return rows[0] as Gallery;
  }

  // ==========================================
  // UPDATE GALLERY
  // ==========================================

  async update(
    id: number,
    gallery: Gallery
  ): Promise<boolean> {
    const sql = `
      UPDATE gallery
      SET
        title = ?,
        description = ?,
        service_id = ?,
        type = ?,
        image = ?,
        status = ?

      WHERE id = ?
    `;

    const values = [
      gallery.title,
      gallery.description ?? null,
      gallery.serviceId ?? null,
      gallery.type || "Image",
      gallery.image ?? null,
      gallery.status || "Active",
      id,
    ];

    console.log("========== UPDATE GALLERY REPOSITORY ==========");
    console.log("ID:", id);
    console.log("GALLERY:", gallery);
    console.log("SQL VALUES:", values);

    const [result] =
      await pool.execute<ResultSetHeader>(
        sql,
        values
      );

    return result.affectedRows > 0;
  }

  // ==========================================
  // DELETE GALLERY
  // ==========================================

  async delete(
    id: number
  ): Promise<boolean> {
    const sql = `
      DELETE FROM gallery
      WHERE id = ?
    `;

    console.log(
      "========== DELETE GALLERY REPOSITORY =========="
    );

    console.log("DELETE ID:", id);

    const [result] =
      await pool.execute<ResultSetHeader>(
        sql,
        [id]
      );

    return result.affectedRows > 0;
  }
}