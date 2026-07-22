import { Request, Response } from "express";
import { ServiceCategoryService } from "../services/service-category.service";

export class ServiceCategoryController {
  private service = new ServiceCategoryService();

  // ==========================================
  // CREATE CATEGORY
  // POST /api/service-categories
  // ==========================================
  create = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = await this.service.createCategory(
        req.body
      );

      return res.status(201).json({
        success: true,
        status: "201 Created",
        message: "Service category created successfully.",
        id,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message ||
          "Failed to create service category.",
      });
    }
  };

  // ==========================================
  // GET ALL CATEGORIES
  // GET /api/service-categories
  // ==========================================
  getAll = async (
    req: Request,
    res: Response
  ) => {
    try {
      const categories =
        await this.service.getCategories();

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: categories,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message ||
          "Failed to fetch service categories.",
      });
    }
  };

  // ==========================================
  // GET CATEGORY BY ID
  // GET /api/service-categories/:id
  // ==========================================
  getById = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const category =
        await this.service.getCategoryById(id);

      if (!category) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Service category not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: category,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message ||
          "Failed to fetch service category.",
      });
    }
  };

  // ==========================================
  // UPDATE CATEGORY
  // PUT /api/service-categories/:id
  // ==========================================
  update = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const updated =
        await this.service.updateCategory(
          id,
          req.body
        );

      if (!updated) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Service category not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message:
          "Service category updated successfully.",
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message ||
          "Failed to update service category.",
      });
    }
  };

  // ==========================================
  // DELETE CATEGORY
  // DELETE /api/service-categories/:id
  // ==========================================
  remove = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const deleted =
        await this.service.deleteCategory(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Service category not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message:
          "Service category deleted successfully.",
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message ||
          "Failed to delete service category.",
      });
    }
  };
}