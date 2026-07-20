import pool from "../config/db";
import { Appointment } from "../types/appointment";

export class AppointmentRepository {

  // ==========================================
  // Create Appointment
  // ==========================================
  async create(
    appointment: Appointment
  ) {

    const sql = `
      INSERT INTO appointments (
        patient_name,
        phone,
        email,
        doctor,
        treatment,
        appointment_date,
        appointment_time,
        message
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const values = [
      appointment.patientName,
      appointment.phone,
      appointment.email ?? null,
      appointment.doctor,
      appointment.treatment,
      appointment.appointmentDate,
      appointment.appointmentTime ?? null,
      appointment.message ?? null,
    ];


    const [result]: any =
      await pool.execute(
        sql,
        values
      );


    return result.insertId;
  }



  // ==========================================
  // Get All Appointments
  // ==========================================
  async findAll() {

    const sql = `
      SELECT *
      FROM appointments
      ORDER BY appointment_date DESC
    `;


    const [rows] =
      await pool.execute(sql);


    return rows;
  }



  // ==========================================
  // Get Appointment By ID
  // ==========================================
  async findById(
    id: number
  ) {

    const sql = `
      SELECT *
      FROM appointments
      WHERE id = ?
    `;


    const [rows]: any =
      await pool.execute(
        sql,
        [id]
      );


    return rows[0];

  }



  // ==========================================
  // Update Appointment
  // ==========================================
  async update(
    id: number,
    appointment: Appointment
  ) {

    const sql = `
      UPDATE appointments
      SET
        patient_name = ?,
        phone = ?,
        email = ?,
        doctor = ?,
        treatment = ?,
        appointment_date = ?,
        appointment_time = ?,
        message = ?
      WHERE id = ?
    `;


    const values = [
      appointment.patientName,
      appointment.phone,
      appointment.email ?? null,
      appointment.doctor,
      appointment.treatment,
      appointment.appointmentDate,
      appointment.appointmentTime ?? null,
      appointment.message ?? null,
      id,
    ];


    const [result]: any =
      await pool.execute(
        sql,
        values
      );


    return result.affectedRows > 0;

  }



  // ==========================================
  // Update Status
  // ==========================================
  async updateStatus(
    id: number,
    status: string
  ) {

    const sql = `
      UPDATE appointments
      SET status = ?
      WHERE id = ?
    `;


    const [result]: any =
      await pool.execute(
        sql,
        [
          status,
          id
        ]
      );


    return result.affectedRows > 0;

  }



  // ==========================================
  // Update Payment
  // ==========================================
  async updatePayment(
    id: number,
    payment: string
  ) {

    const sql = `
      UPDATE appointments
      SET payment = ?
      WHERE id = ?
    `;


    const [result]: any =
      await pool.execute(
        sql,
        [
          payment,
          id
        ]
      );


    return result.affectedRows > 0;

  }



  // ==========================================
  // Delete Appointment
  // ==========================================
  async delete(
    id: number
  ) {

    const sql = `
      DELETE FROM appointments
      WHERE id = ?
    `;


    const [result]: any =
      await pool.execute(
        sql,
        [
          id
        ]
      );


    return result.affectedRows > 0;

  }

}