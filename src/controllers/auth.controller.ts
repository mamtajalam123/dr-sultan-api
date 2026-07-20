import { Request, Response } from "express";
import bcrypt from "bcrypt";
import db from "../config/db";
import { generateToken } from "../utils/generateToken";

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("========== LOGIN START ==========");

    const { email, password } = req.body;

    console.log("Email:", email);

    // Find Admin
    console.log("Step 1: Finding admin...");

    const [rows]: any = await db.query(
      "SELECT * FROM admins WHERE email = ?",
      [email]
    );

    console.log("Database Result:", rows);

    if (rows.length === 0) {
      console.log("Admin not found");

      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = rows[0];

    console.log("Step 2: Admin Found");
    console.log(user);

    // Compare Password
    console.log("Step 3: Comparing Password");

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    console.log("Step 4: Generating JWT");

    const token = generateToken(
      user.id.toString()
    );

    console.log("Generated Token:");
    console.log(token);

    console.log("========== LOGIN SUCCESS ==========");

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("========== LOGIN ERROR ==========");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error:
        error instanceof Error
          ? error.message
          : String(error),
    });
  }
};