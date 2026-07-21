import pool from "../config/db";
import { Contact } from "../types/contact";

export class ContactRepository {

  // ==========================================
  // CREATE CONTACT
  // ==========================================
  async create(contact: Contact) {

    const sql = `
      INSERT INTO contacts (
        full_name,
        email,
        phone,
        subject,
        message
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
      contact.fullName,
      contact.email,
      contact.phone ?? null,
      contact.subject,
      contact.message,
    ];

    const [result]: any = await pool.execute(sql, values);

    return result.insertId;
  }

  // ==========================================
  // GET ALL CONTACTS
  // ==========================================
  async findAll() {

    const sql = `
      SELECT *
      FROM contacts
      ORDER BY created_at DESC
    `;

    const [rows] = await pool.execute(sql);

    return rows;
  }

  // ==========================================
  // GET CONTACT BY ID
  // ==========================================
  async findById(id: number) {

    const sql = `
      SELECT *
      FROM contacts
      WHERE id = ?
    `;

    const [rows]: any = await pool.execute(sql, [id]);

    return rows[0] ?? null;
  }

  // ==========================================
  // UPDATE CONTACT
  // ==========================================
  async update(
    id: number,
    contact: Contact
  ) {

    const sql = `
      UPDATE contacts
      SET
        full_name = ?,
        email = ?,
        phone = ?,
        subject = ?,
        message = ?
      WHERE id = ?
    `;

    const values = [
      contact.fullName,
      contact.email,
      contact.phone ?? null,
      contact.subject,
      contact.message,
      id,
    ];

    const [result]: any = await pool.execute(sql, values);

    return result.affectedRows > 0;
  }

  // ==========================================
  // UPDATE STATUS
  // ==========================================
  async updateStatus(
    id: number,
    status: string
  ) {

    const sql = `
      UPDATE contacts
      SET status = ?
      WHERE id = ?
    `;

    const [result]: any = await pool.execute(sql, [
      status,
      id,
    ]);

    return result.affectedRows > 0;
  }

  // ==========================================
  // DELETE CONTACT
  // ==========================================
  async delete(id: number) {

    const sql = `
      DELETE FROM contacts
      WHERE id = ?
    `;

    const [result]: any = await pool.execute(sql, [id]);

    return result.affectedRows > 0;
  }

}