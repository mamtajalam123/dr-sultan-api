import { Request, Response } from "express";

import { GalleryService } from "../services/gallery.service";
import { Gallery } from "../types/gallery";

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
      console.log(
        "========== CREATE GALLERY =========="
      );

      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      // ======================================
      // TITLE
      // ======================================

      const title =
        typeof req.body.title === "string"
          ? req.body.title.trim()
          : "";

      if (!title) {
        return res.status(400).json({
          success: false,
          status: "400 Bad Request",
          message: "Gallery title is required.",
        });
      }

      // ======================================
      // SERVICE ID
      // ======================================

      let serviceId: number | null = null;

      if (
        req.body.serviceId !== undefined &&
        req.body.serviceId !== null &&
        req.body.serviceId !== ""
      ) {
        const parsedServiceId = Number(
          req.body.serviceId
        );

        if (
          !Number.isInteger(parsedServiceId) ||
          parsedServiceId <= 0
        ) {
          return res.status(400).json({
            success: false,
            status: "400 Bad Request",
            message: "Invalid service ID.",
          });
        }

        serviceId = parsedServiceId;
      }

      // ======================================
      // DESCRIPTION
      // ======================================

      const description =
        typeof req.body.description === "string"
          ? req.body.description.trim() || null
          : null;

      // ======================================
      // TYPE
      // ======================================

      const type =
        typeof req.body.type === "string" &&
        req.body.type.trim()
          ? req.body.type.trim()
          : "Image";

      // ======================================
      // STATUS
      // ======================================

      const status =
        req.body.status === "Inactive"
          ? "Inactive"
          : "Active";

      // ======================================
      // IMAGE
      // ======================================

      const image = req.file
        ? `/uploads/gallery/${req.file.filename}`
        : null;

      // ======================================
      // FINAL GALLERY
      // ======================================

      const gallery: Gallery = {
        title,
        description,
        serviceId,
        type,
        status,
        image,
      };

      console.log(
        "========== FINAL CREATE GALLERY =========="
      );

      console.log(
        "TITLE:",
        title
      );

      console.log(
        "SERVICE ID:",
        serviceId
      );

      console.log(
        "DESCRIPTION:",
        description
      );

      console.log(
        "TYPE:",
        type
      );

      console.log(
        "STATUS:",
        status
      );

      console.log(
        "IMAGE:",
        image
      );

      console.log(
        "FINAL GALLERY:",
        gallery
      );

      // ======================================
      // CREATE
      // ======================================

      const id =
        await this.service.createGallery(
          gallery
        );

      // ======================================
      // GET CREATED RECORD
      // ======================================

      const createdGallery =
        await this.service.getGalleryById(
          id
        );

      // ======================================
      // RESPONSE
      // ======================================

      return res.status(201).json({
        success: true,
        status: "201 Created",
        message:
          "Gallery created successfully.",
        data:
          createdGallery ?? {
            id,
            ...gallery,
          },
      });
    } catch (error: any) {
      console.error(
        "CREATE GALLERY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        status:
          "500 Internal Server Error",
        message:
          error?.message ||
          "Failed to create gallery.",
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
      console.log(
        "========== GET ALL GALLERY =========="
      );

      const gallery =
        await this.service.getGallery();

      console.log(
        "GALLERY DATA:",
        gallery
      );

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: gallery,
      });
    } catch (error: any) {
      console.error(
        "GET GALLERY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        status:
          "500 Internal Server Error",
        message:
          error?.message ||
          "Failed to fetch gallery.",
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
      console.log(
        "========== GET GALLERY BY ID =========="
      );

      const id =
        Number(req.params.id);

      console.log(
        "GALLERY ID:",
        id
      );

      // ======================================
      // VALIDATE ID
      // ======================================

      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        return res.status(400).json({
          success: false,
          status:
            "400 Bad Request",
          message:
            "Invalid gallery ID.",
        });
      }

      // ======================================
      // GET GALLERY
      // ======================================

      const gallery =
        await this.service.getGalleryById(
          id
        );

      console.log(
        "GALLERY FROM DATABASE:",
        gallery
      );

      if (!gallery) {
        return res.status(404).json({
          success: false,
          status:
            "404 Not Found",
          message:
            "Gallery item not found.",
        });
      }

      // ======================================
      // IMPORTANT DEBUG
      // ======================================

      console.log(
        "========== GALLERY API RESPONSE =========="
      );

      console.log(
        "RAW GALLERY:",
        gallery
      );

      console.log(
        "CATEGORY:",
        (gallery as any).category
      );

      console.log(
        "SERVICE ID:",
        gallery.serviceId
      );

      console.log(
        "SERVICE NAME:",
        (gallery as any).serviceName
      );

      console.log(
        "=========================================="
      );

      // ======================================
      // RESPONSE
      // ======================================

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: gallery,
      });
    } catch (error: any) {
      console.error(
        "GET BY ID ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        status:
          "500 Internal Server Error",
        message:
          error?.message ||
          "Failed to fetch gallery item.",
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
      console.log(
        "========== UPDATE GALLERY =========="
      );

      console.log(
        "BODY:",
        req.body
      );

      console.log(
        "FILE:",
        req.file
      );

      const id =
        Number(req.params.id);

      console.log(
        "GALLERY ID:",
        id
      );

      // ======================================
      // VALIDATE ID
      // ======================================

      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        return res.status(400).json({
          success: false,
          status:
            "400 Bad Request",
          message:
            "Invalid gallery ID.",
        });
      }

      // ======================================
      // GET OLD GALLERY
      // ======================================

      const oldGallery =
        await this.service.getGalleryById(
          id
        );

      console.log(
        "OLD GALLERY:",
        oldGallery
      );

      if (!oldGallery) {
        return res.status(404).json({
          success: false,
          status:
            "404 Not Found",
          message:
            "Gallery item not found.",
        });
      }

      // ======================================
      // SERVICE ID
      // ======================================

      let serviceId =
        oldGallery.serviceId ?? null;

      /*
       * IMPORTANT:
       *
       * Frontend must send:
       *
       * serviceId = category.id
       *
       * Example:
       *
       * serviceId = "3"
       */

      if (
        req.body.serviceId !== undefined
      ) {
        console.log(
          "NEW SERVICE ID FROM REQUEST:",
          req.body.serviceId
        );

        if (
          req.body.serviceId === null ||
          req.body.serviceId === ""
        ) {
          serviceId = null;
        } else {
          const parsedServiceId =
            Number(
              req.body.serviceId
            );

          if (
            !Number.isInteger(
              parsedServiceId
            ) ||
            parsedServiceId <= 0
          ) {
            return res.status(400).json({
              success: false,
              status:
                "400 Bad Request",
              message:
                "Invalid service ID.",
            });
          }

          serviceId =
            parsedServiceId;
        }
      }

      console.log(
        "FINAL SERVICE ID:",
        serviceId
      );

      // ======================================
      // TITLE
      // ======================================

      const title =
        req.body.title !== undefined
          ? typeof req.body.title === "string"
            ? req.body.title.trim() ||
              oldGallery.title
            : oldGallery.title
          : oldGallery.title;

      // ======================================
      // DESCRIPTION
      // ======================================

      const description =
        req.body.description !== undefined
          ? typeof req.body.description === "string"
            ? req.body.description.trim() ||
              null
            : null
          : oldGallery.description;

      // ======================================
      // TYPE
      // ======================================

      const type =
        req.body.type !== undefined
          ? typeof req.body.type === "string" &&
            req.body.type.trim()
            ? req.body.type.trim()
            : oldGallery.type || "Image"
          : oldGallery.type || "Image";

      // ======================================
      // STATUS
      // ======================================

      let status =
        oldGallery.status || "Active";

      if (
        req.body.status === "Active"
      ) {
        status = "Active";
      }

      if (
        req.body.status === "Inactive"
      ) {
        status = "Inactive";
      }

      // ======================================
      // IMAGE
      // ======================================

      const image =
        req.file
          ? `/uploads/gallery/${req.file.filename}`
          : oldGallery.image ?? null;

      // ======================================
      // FINAL GALLERY
      // ======================================

      const gallery: Gallery = {
        title,
        description,
        serviceId,
        type,
        status,
        image,
      };

      console.log(
        "========== FINAL UPDATE GALLERY =========="
      );

      console.log(
        "TITLE:",
        title
      );

      console.log(
        "OLD SERVICE ID:",
        oldGallery.serviceId
      );

      console.log(
        "NEW SERVICE ID:",
        serviceId
      );

      console.log(
        "DESCRIPTION:",
        description
      );

      console.log(
        "TYPE:",
        type
      );

      console.log(
        "STATUS:",
        status
      );

      console.log(
        "IMAGE:",
        image
      );

      console.log(
        "FINAL GALLERY:",
        gallery
      );

      // ======================================
      // UPDATE DATABASE
      // ======================================

      const updated =
        await this.service.updateGallery(
          id,
          gallery
        );

      console.log(
        "UPDATE RESULT:",
        updated
      );

      if (!updated) {
        return res.status(400).json({
          success: false,
          status:
            "400 Bad Request",
          message:
            "Gallery could not be updated.",
        });
      }

      // ======================================
      // GET UPDATED RECORD
      // ======================================

      const updatedGallery =
        await this.service.getGalleryById(
          id
        );

      console.log(
        "UPDATED GALLERY FROM DATABASE:",
        updatedGallery
      );

      // ======================================
      // RESPONSE
      // ======================================

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message:
          "Gallery updated successfully.",
        data: updatedGallery,
      });
    } catch (error: any) {
      console.error(
        "UPDATE GALLERY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        status:
          "500 Internal Server Error",
        message:
          error?.message ||
          "Failed to update gallery.",
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
      console.log(
        "========== DELETE GALLERY =========="
      );

      const id =
        Number(req.params.id);

      console.log(
        "GALLERY ID:",
        id
      );

      // ======================================
      // VALIDATE ID
      // ======================================

      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        return res.status(400).json({
          success: false,
          status:
            "400 Bad Request",
          message:
            "Invalid gallery ID.",
        });
      }

      // ======================================
      // DELETE
      // ======================================

      const deleted =
        await this.service.deleteGallery(
          id
        );

      if (!deleted) {
        return res.status(404).json({
          success: false,
          status:
            "404 Not Found",
          message:
            "Gallery item not found.",
        });
      }

      // ======================================
      // RESPONSE
      // ======================================

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message:
          "Gallery deleted successfully.",
      });
    } catch (error: any) {
      console.error(
        "DELETE GALLERY ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        status:
          "500 Internal Server Error",
        message:
          error?.message ||
          "Failed to delete gallery.",
      });
    }
  };
}