import { Request, Response } from "express";

export const getAppointments = async (
  req: Request,
  res: Response
) => {
  res.json({
    success: true,
    message: "Get all appointments",
  });
};

export const getAppointmentById = async (
  req: Request,
  res: Response
) => {
  res.json({
    success: true,
    message: `Get appointment ${req.params.id}`,
  });
};

export const createAppointment = async (
  req: Request,
  res: Response
) => {
  res.json({
    success: true,
    message: "Appointment created",
  });
};

export const updateAppointment = async (
  req: Request,
  res: Response
) => {
  res.json({
    success: true,
    message: `Appointment ${req.params.id} updated`,
  });
};

export const deleteAppointment = async (
  req: Request,
  res: Response
) => {
  res.json({
    success: true,
    message: `Appointment ${req.params.id} deleted`,
  });
};