import { Request, Response } from "express";
import { DesignationService } from "../services/designation.service";

export class DesignationController {
  private service = new DesignationService();

  // ==========================================
  // CREATE DESIGNATION
  // POST /api/designations
  // ==========================================
  create = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { name } = req.body;

      console.log("Checking designation:", name);

      const exists =
        await this.service.designationExists(
          name
        );

      console.log("Exists:", exists);

      if (exists) {
        return res.status(409).json({
          success: false,
          status: "409 Conflict",
          message: "Designation already exists.",
        });
      }

      const id =
        await this.service.createDesignation(
          req.body
        );

      return res.status(201).json({
        success: true,
        status: "201 Created",
        message:
          "Designation created successfully.",
        id,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message ||
          "Failed to create designation.",
      });
    }
  };

  // ==========================================
  // GET ALL DESIGNATIONS
  // GET /api/designations
  // ==========================================
  getAll = async (
    req: Request,
    res: Response
  ) => {
    try {
      const designations =
        await this.service.getDesignations();

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: designations,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message ||
          "Failed to fetch designations.",
      });
    }
  };

  // ==========================================
  // GET DESIGNATION BY ID
  // GET /api/designations/:id
  // ==========================================
  getById = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const designation =
        await this.service.getDesignationById(
          id
        );

      if (!designation) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Designation not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: designation,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message ||
          "Failed to fetch designation.",
      });
    }
  };

  // ==========================================
  // UPDATE DESIGNATION
  // PUT /api/designations/:id
  // ==========================================
  update = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const updated =
        await this.service.updateDesignation(
          id,
          req.body
        );

      if (!updated) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Designation not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message:
          "Designation updated successfully.",
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message ||
          "Failed to update designation.",
      });
    }
  };

  // ==========================================
  // DELETE DESIGNATION
  // DELETE /api/designations/:id
  // ==========================================
  remove = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const deleted =
        await this.service.deleteDesignation(
          id
        );

      if (!deleted) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Designation not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message:
          "Designation deleted successfully.",
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message ||
          "Failed to delete designation.",
      });
    }
  };
}