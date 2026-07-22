import { Request, Response } from "express";
import { GalleryService } from "../services/gallery.service";

export class GalleryController {
  private service = new GalleryService();

  // ==========================================
  // CREATE GALLERY
  // POST /api/gallery
  // ==========================================
  create = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = await this.service.createGallery(
        req.body
      );

      return res.status(201).json({
        success: true,
        status: "201 Created",
        message: "Gallery created successfully.",
        id,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: error.message || "Failed to create gallery.",
      });
    }
  };

  // ==========================================
  // GET ALL GALLERY
  // GET /api/gallery
  // ==========================================
  getAll = async (
    req: Request,
    res: Response
  ) => {
    try {
      const gallery = await this.service.getGallery();

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: gallery,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: error.message || "Failed to fetch gallery.",
      });
    }
  };

  // ==========================================
  // GET GALLERY BY ID
  // GET /api/gallery/:id
  // ==========================================
  getById = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const gallery = await this.service.getGalleryById(id);

      if (!gallery) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Gallery item not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: gallery,
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: error.message || "Failed to fetch gallery item.",
      });
    }
  };

  // ==========================================
  // UPDATE GALLERY
  // PUT /api/gallery/:id
  // ==========================================
  update = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const updated = await this.service.updateGallery(
        id,
        req.body
      );

      if (!updated) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Gallery item not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message: "Gallery updated successfully.",
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: error.message || "Failed to update gallery.",
      });
    }
  };

  // ==========================================
  // DELETE GALLERY
  // DELETE /api/gallery/:id
  // ==========================================
  remove = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const deleted = await this.service.deleteGallery(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Gallery item not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message: "Gallery deleted successfully.",
      });
    } catch (error: any) {
      console.error(error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: error.message || "Failed to delete gallery.",
      });
    }
  };
}