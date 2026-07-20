import { AppointmentRepository } from "../repositories/appointment.repository";
import { Appointment } from "../types/appointment";

export class AppointmentService {
  private repository =
    new AppointmentRepository();


  // ==========================================
  // Create Appointment
  // ==========================================
  async createAppointment(
    appointment: Appointment
  ) {
    return await this.repository.create(
      appointment
    );
  }



  // ==========================================
  // Get All Appointments
  // ==========================================
  async getAppointments() {

    return await this.repository.findAll();

  }



  // ==========================================
  // Get Appointment By ID
  // ==========================================
  async getAppointmentById(
    id: number
  ) {

    return await this.repository.findById(
      id
    );

  }



  // ==========================================
  // Update Appointment
  // ==========================================
  async updateAppointment(
    id: number,
    appointment: Appointment
  ) {

    const result =
      await this.repository.update(
        id,
        appointment
      );

    return result;

  }



  // ==========================================
  // Update Status
  // ==========================================
  async updateStatus(
    id: number,
    status: string
  ) {

    const result =
      await this.repository.updateStatus(
        id,
        status
      );

    return result;

  }



  // ==========================================
  // Update Payment
  // ==========================================
  async updatePayment(
    id: number,
    payment: string
  ) {

    const result =
      await this.repository.updatePayment(
        id,
        payment
      );

    return result;

  }



  // ==========================================
  // Delete Appointment
  // ==========================================
  async deleteAppointment(
    id: number
  ) {

    const result =
      await this.repository.delete(
        id
      );

    return result;

  }

}