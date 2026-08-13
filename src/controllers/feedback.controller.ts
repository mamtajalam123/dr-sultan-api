import { Request, Response } from "express";

import { FeedbackService } from "../services/feedback.service";

import {
  FeedbackStatus,
} from "../repositories/feedback.repository";

export class FeedbackController {
  private service =
    new FeedbackService();

  // ==========================================
  // ALLOWED STATUSES
  // ==========================================

  private readonly allowedStatuses: FeedbackStatus[] = [
    "Pending",
    "Approved",
    "Rejected",
  ];

  // ==========================================
  // GET ALL FEEDBACK
  // GET /api/feedback
  // ==========================================

  getAll = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      console.log(
        "========== GET ALL FEEDBACK =========="
      );

      const data =
        await this.service.getAll();

      console.log(
        "FEEDBACK COUNT:",
        data.length
      );

      if (data.length > 0) {
        console.log(
          "FIRST PATIENT IMAGE:",
          data[0].patientImage
        );
      }

      res.status(200).json(data);
    } catch (error) {
      console.error(
        "GET FEEDBACK ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch feedback",
      });
    }
  };

  // ==========================================
  // GET SINGLE FEEDBACK
  // GET /api/feedback/:id
  // ==========================================

  getById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id =
        Number(req.params.id);

      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        res.status(400).json({
          success: false,
          message:
            "Invalid feedback ID",
        });

        return;
      }

      const data =
        await this.service.getById(id);

      if (!data) {
        res.status(404).json({
          success: false,
          message:
            "Feedback not found",
        });

        return;
      }

      console.log(
        "========== GET FEEDBACK BY ID =========="
      );

      console.log(
        "FEEDBACK ID:",
        id
      );

      console.log(
        "PATIENT IMAGE:",
        data.patientImage
      );

      res.status(200).json(data);
    } catch (error) {
      console.error(
        "GET FEEDBACK BY ID ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch feedback",
      });
    }
  };

  // ==========================================
  // CREATE FEEDBACK
  // POST /api/feedback
  // ==========================================

  create = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      console.log(
        "================================="
      );

      console.log(
        "CREATE FEEDBACK"
      );

      console.log(
        "BODY:",
        req.body
      );

      console.log(
        "FILE:",
        req.file
      );

      console.log(
        "================================="
      );

      const {
        patientName,
        patientImage,
        treatment,
        rating,
        review,
        status,
        date,
      } = req.body;

      // =====================================
      // PATIENT NAME
      // =====================================

      if (
        typeof patientName !==
          "string" ||
        !patientName.trim()
      ) {
        res.status(400).json({
          success: false,
          message:
            "Patient name is required",
        });

        return;
      }

      // =====================================
      // TREATMENT
      // =====================================

      if (
        typeof treatment !==
          "string" ||
        !treatment.trim()
      ) {
        res.status(400).json({
          success: false,
          message:
            "Treatment is required",
        });

        return;
      }

      // =====================================
      // REVIEW
      // =====================================

      if (
        typeof review !==
          "string" ||
        !review.trim()
      ) {
        res.status(400).json({
          success: false,
          message:
            "Review is required",
        });

        return;
      }

      // =====================================
      // RATING
      // =====================================

      const numericRating =
        Number(rating);

      if (
        !Number.isInteger(
          numericRating
        ) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        res.status(400).json({
          success: false,
          message:
            "Rating must be between 1 and 5",
        });

        return;
      }

      // =====================================
      // STATUS
      // =====================================

      if (
        !this.allowedStatuses.includes(
          status
        )
      ) {
        res.status(400).json({
          success: false,
          message:
            "Invalid feedback status",
        });

        return;
      }

      // =====================================
      // PATIENT IMAGE
      // =====================================

      let normalizedPatientImage:
        string | null = null;

      // -------------------------------------
      // NEW UPLOADED FILE
      // -------------------------------------

      if (req.file) {
        normalizedPatientImage =
          `/uploads/feedback/${req.file.filename}`;
      }

      // -------------------------------------
      // IMAGE PATH SENT AS TEXT
      // -------------------------------------

      else if (
        typeof patientImage ===
          "string" &&
        patientImage.trim()
      ) {
        normalizedPatientImage =
          patientImage.trim();
      }

      console.log(
        "PATIENT IMAGE TO SAVE:",
        normalizedPatientImage
      );

      // =====================================
      // CREATE
      // =====================================

      const id =
        await this.service.create({
          patientName:
            patientName.trim(),

          patientImage:
            normalizedPatientImage,

          treatment:
            treatment.trim(),

          rating:
            numericRating,

          review:
            review.trim(),

          status,

          date:
            typeof date === "string" &&
            date.trim()
              ? date.trim()
              : null,
        });

      console.log(
        "FEEDBACK CREATED ID:",
        id
      );

      // =====================================
      // GET CREATED FEEDBACK
      // =====================================

      const created =
        await this.service.getById(
          id
        );

      // =====================================
      // RESPONSE
      // =====================================

      res.status(201).json({
        success: true,

        message:
          "Feedback created successfully",

        data:
          created ?? {
            id,

            patientName:
              patientName.trim(),

            patientImage:
              normalizedPatientImage,

            treatment:
              treatment.trim(),

            rating:
              numericRating,

            review:
              review.trim(),

            status,

            date:
              typeof date === "string" &&
              date.trim()
                ? date.trim()
                : null,

            createdAt: null,

            updatedAt: null,
          },
      });
    } catch (error) {
      console.error(
        "================================="
      );

      console.error(
        "CREATE FEEDBACK ERROR"
      );

      console.error(error);

      console.error(
        "================================="
      );

      res.status(500).json({
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to create feedback",
      });
    }
  };

  // ==========================================
  // UPDATE FEEDBACK
  // PUT /api/feedback/:id
  // ==========================================

  update = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id =
        Number(req.params.id);

      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        res.status(400).json({
          success: false,
          message:
            "Invalid feedback ID",
        });

        return;
      }

      console.log(
        "================================="
      );

      console.log(
        "UPDATE FEEDBACK"
      );

      console.log(
        "ID:",
        id
      );

      console.log(
        "BODY:",
        req.body
      );

      console.log(
        "FILE:",
        req.file
      );

      console.log(
        "================================="
      );

      const {
        patientName,
        patientImage,
        treatment,
        rating,
        review,
        status,
        date,
      } = req.body;

      // =====================================
      // GET EXISTING FEEDBACK
      // =====================================

      const existing =
        await this.service.getById(
          id
        );

      if (!existing) {
        res.status(404).json({
          success: false,
          message:
            "Feedback not found",
        });

        return;
      }

      // =====================================
      // PATIENT NAME
      // =====================================

      if (
        typeof patientName !==
          "string" ||
        !patientName.trim()
      ) {
        res.status(400).json({
          success: false,
          message:
            "Patient name is required",
        });

        return;
      }

      // =====================================
      // TREATMENT
      // =====================================

      if (
        typeof treatment !==
          "string" ||
        !treatment.trim()
      ) {
        res.status(400).json({
          success: false,
          message:
            "Treatment is required",
        });

        return;
      }

      // =====================================
      // REVIEW
      // =====================================

      if (
        typeof review !==
          "string" ||
        !review.trim()
      ) {
        res.status(400).json({
          success: false,
          message:
            "Review is required",
        });

        return;
      }

      // =====================================
      // RATING
      // =====================================

      const numericRating =
        Number(rating);

      if (
        !Number.isInteger(
          numericRating
        ) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        res.status(400).json({
          success: false,
          message:
            "Rating must be between 1 and 5",
        });

        return;
      }

      // =====================================
      // STATUS
      // =====================================

      if (
        !this.allowedStatuses.includes(
          status
        )
      ) {
        res.status(400).json({
          success: false,
          message:
            "Invalid feedback status",
        });

        return;
      }

      // =====================================
      // PATIENT IMAGE
      // =====================================

      let normalizedPatientImage:
        string | null;

      // -------------------------------------
      // NEW IMAGE UPLOADED
      // -------------------------------------

      if (req.file) {
        normalizedPatientImage =
          `/uploads/feedback/${req.file.filename}`;
      }

      // -------------------------------------
      // IMAGE PATH SENT
      // -------------------------------------

      else if (
        typeof patientImage ===
          "string" &&
        patientImage.trim()
      ) {
        normalizedPatientImage =
          patientImage.trim();
      }

      // -------------------------------------
      // KEEP EXISTING IMAGE
      // -------------------------------------

      else {
        normalizedPatientImage =
          existing.patientImage ??
          null;
      }

      console.log(
        "EXISTING PATIENT IMAGE:",
        existing.patientImage
      );

      console.log(
        "UPDATED PATIENT IMAGE:",
        normalizedPatientImage
      );

      // =====================================
      // UPDATE
      // =====================================

      const updated =
        await this.service.update(
          id,
          {
            patientName:
              patientName.trim(),

            patientImage:
              normalizedPatientImage,

            treatment:
              treatment.trim(),

            rating:
              numericRating,

            review:
              review.trim(),

            status,

            date:
              typeof date === "string" &&
              date.trim()
                ? date.trim()
                : null,
          }
        );

      if (!updated) {
        res.status(404).json({
          success: false,
          message:
            "Feedback not found",
        });

        return;
      }

      // =====================================
      // GET UPDATED FEEDBACK
      // =====================================

      const updatedFeedback =
        await this.service.getById(
          id
        );

      console.log(
        "UPDATED FEEDBACK:",
        updatedFeedback
      );

      // =====================================
      // RESPONSE
      // =====================================

      res.status(200).json({
        success: true,

        message:
          "Feedback updated successfully",

        data:
          updatedFeedback,
      });
    } catch (error) {
      console.error(
        "================================="
      );

      console.error(
        "UPDATE FEEDBACK ERROR"
      );

      console.error(error);

      console.error(
        "================================="
      );

      res.status(500).json({
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to update feedback",
      });
    }
  };

  // ==========================================
  // UPDATE STATUS
  // PATCH /api/feedback/:id/status
  // ==========================================

  updateStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id =
        Number(req.params.id);

      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        res.status(400).json({
          success: false,
          message:
            "Invalid feedback ID",
        });

        return;
      }

      const {
        status,
      } = req.body;

      if (
        !this.allowedStatuses.includes(
          status
        )
      ) {
        res.status(400).json({
          success: false,
          message:
            "Invalid status",
        });

        return;
      }

      const updated =
        await this.service.updateStatus(
          id,
          status
        );

      if (!updated) {
        res.status(404).json({
          success: false,
          message:
            "Feedback not found",
        });

        return;
      }

      res.status(200).json({
        success: true,

        message:
          "Status updated successfully",
      });
    } catch (error) {
      console.error(
        "STATUS UPDATE ERROR:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to update status",
      });
    }
  };

  // ==========================================
  // DELETE FEEDBACK
  // DELETE /api/feedback/:id
  // ==========================================

  delete = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id =
        Number(req.params.id);

      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        res.status(400).json({
          success: false,
          message:
            "Invalid feedback ID",
        });

        return;
      }

      const deleted =
        await this.service.delete(
          id
        );

      if (!deleted) {
        res.status(404).json({
          success: false,
          message:
            "Feedback not found",
        });

        return;
      }

      res.status(200).json({
        success: true,

        message:
          "Feedback deleted successfully",
      });
    } catch (error) {
      console.error(
        "DELETE FEEDBACK ERROR:",
        error
      );

      res.status(500).json({
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to delete feedback",
      });
    }
  };
}