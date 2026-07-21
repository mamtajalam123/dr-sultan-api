import { Request, Response } from "express";
import { ServiceService } from "../services/service.service";

export class ServiceController {
  private service = new ServiceService();

  // ==========================================
  // CREATE SERVICE
  // POST /api/services
  // ==========================================
  create = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = await this.service.createService(
        req.body
      );

      return res.status(201).json({
        success: true,
        status: "201 Created",
        message: "Service created successfully.",
        id,
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: "Failed to create service.",
        error:
          error instanceof Error
            ? error.message
            : String(error),
      });
    }
  };

  // ==========================================
  // GET ALL SERVICES
  // GET /api/services
  // ==========================================
  getAll = async (
    req: Request,
    res: Response
  ) => {
    try {
      const services =
        await this.service.getServices();

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: services,
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: "Failed to fetch services.",
      });
    }
  };

  // ==========================================
  // GET SERVICE BY ID
  // GET /api/services/:id
  // ==========================================
  getById = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const service =
        await this.service.getServiceById(id);

      if (!service) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Service not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: service,
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: "Failed to fetch service.",
      });
    }
  };

  // ==========================================
  // UPDATE SERVICE
  // PUT /api/services/:id
  // ==========================================
  update = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const updated =
        await this.service.updateService(
          id,
          req.body
        );

      if (!updated) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Service not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message: "Service updated successfully.",
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: "Failed to update service.",
      });
    }
  };

  // ==========================================
  // DELETE SERVICE
  // DELETE /api/services/:id
  // ==========================================
  remove = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const deleted =
        await this.service.deleteService(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Service not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message: "Service deleted successfully.",
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: "Failed to delete service.",
      });
    }
  };
}