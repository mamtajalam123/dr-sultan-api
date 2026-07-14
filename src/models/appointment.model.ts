import db from "../config/db";

export const getAppointments = async () => {
  const [rows] = await db.query(
    "SELECT * FROM appointments ORDER BY id DESC"
  );

  return rows;
};

export const getAppointmentById = async (id: number) => {
  const [rows]: any = await db.query(
    "SELECT * FROM appointments WHERE id=?",
    [id]
  );

  return rows[0];
};

export const createAppointment = async (data: any) => {
  const sql = `
    INSERT INTO appointments
    (
      patientName,
      phone,
      email,
      treatment,
      doctor,
      date,
      time,
      notes,
      status,
      payment
    )
    VALUES(?,?,?,?,?,?,?,?,?,?)
  `;

  const values = [
    data.patientName,
    data.phone,
    data.email,
    data.treatment,
    data.doctor,
    data.date,
    data.time,
    data.notes,
    data.status,
    data.payment,
  ];

  const [result] = await db.query(sql, values);

  return result;
};