import { Request, Response } from "express";
import { FeedbackService } from "../services/feedback.service";

export class FeedbackController {
  private service = new FeedbackService();

  // ==========================================
  // CREATE FEEDBACK
  // POST /api/feedback
  // ==========================================
  create = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const id = await this.service.createFeedback(
        req.body
      );

      return res.status(201).json({
        success: true,
        status: "201 Created",
        message: "Feedback created successfully.",
        id,
      });

    } catch (error: any) {
      console.error("CREATE FEEDBACK ERROR:", error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message || "Failed to create feedback.",
      });
    }
  };

  // ==========================================
  // GET ALL FEEDBACK
  // GET /api/feedback
  // ==========================================
  getAll = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const feedback =
        await this.service.getFeedbacks();

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: feedback,
      });

    } catch (error: any) {
      console.error("GET FEEDBACK ERROR:", error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message || "Failed to fetch feedback.",
      });
    }
  };

  // ==========================================
  // GET FEEDBACK BY ID
  // GET /api/feedback/:id
  // ==========================================
  getById = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const id = Number(req.params.id);

      const feedback =
        await this.service.getFeedbackById(id);

      if (!feedback) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Feedback not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: feedback,
      });

    } catch (error: any) {
      console.error("GET FEEDBACK BY ID ERROR:", error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message || "Failed to fetch feedback.",
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
  ): Promise<Response> => {
    try {
      const id = Number(req.params.id);

      const updated =
        await this.service.updateFeedback(
          id,
          req.body
        );

      if (!updated) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Feedback not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message: "Feedback updated successfully.",
      });

    } catch (error: any) {
      console.error("UPDATE FEEDBACK ERROR:", error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message || "Failed to update feedback.",
      });
    }
  };

  // ==========================================
  // DELETE FEEDBACK
  // DELETE /api/feedback/:id
  // ==========================================
  remove = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const id = Number(req.params.id);

      const deleted =
        await this.service.deleteFeedback(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Feedback not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message: "Feedback deleted successfully.",
      });

    } catch (error: any) {
      console.error("DELETE FEEDBACK ERROR:", error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message:
          error.message || "Failed to delete feedback.",
      });
    }
  };
}