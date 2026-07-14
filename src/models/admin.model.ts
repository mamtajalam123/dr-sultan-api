import db from "../config/db";

export const findAdminByEmail = async (email: string) => {
  const [rows]: any = await db.query(
    "SELECT * FROM admins WHERE email = ?",
    [email]
  );

  return rows[0];
};