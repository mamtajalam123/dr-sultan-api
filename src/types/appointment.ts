export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Rejected";

export type PaymentStatus =
  | "Unpaid"
  | "Paid";

export interface Appointment  {
  id?: number;

  patientName: string;

  phone: string;



  doctor: string;

  treatment: string;

  appointmentDate: string;


email: string | null;
appointmentTime: string | null;
message: string | null;


  status?: AppointmentStatus;

  payment?: PaymentStatus;

  createdAt?: Date;

  updatedAt?: Date;
}