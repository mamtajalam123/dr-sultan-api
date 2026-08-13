import { FeedbackRepository } from "../repositories/feedback.repository";

// ==========================================
// FEEDBACK TYPES
// ==========================================

interface FeedbackData {
  patientName: string;
  patientImage: string | null;
  treatment: string;
  rating: number;
  review: string;
  status:
    | "Pending"
    | "Approved"
    | "Rejected";
  date: string | null;
}

interface CreateFeedbackInput {
  patientName: string;
  patientImage?: string | null;
  treatment: string;
  rating: number | string;
  review: string;
  status?:
    | "Pending"
    | "Approved"
    | "Rejected";
  date?: string | null;
}

interface UpdateFeedbackInput {
  patientName: string;
  patientImage?: string | null;
  treatment: string;
  rating: number | string;
  review: string;
  status?:
    | "Pending"
    | "Approved"
    | "Rejected";
  date?: string | null;
}

// ==========================================
// SERVICE
// ==========================================

export class FeedbackService {
  private repository =
    new FeedbackRepository();

  // ==========================================
  // CONSTANTS
  // ==========================================

  private readonly allowedStatuses = [
    "Pending",
    "Approved",
    "Rejected",
  ] as const;

  // ==========================================
  // GET ALL FEEDBACK
  // ==========================================

  async getAll() {
    return await this.repository.findAll();
  }

  // ==========================================
  // GET SINGLE FEEDBACK
  // ==========================================

  async getById(id: number) {
    this.validateId(id);

    return await this.repository.findById(id);
  }

  // ==========================================
  // CREATE FEEDBACK
  // ==========================================

  async create(
    data: CreateFeedbackInput
  ) {
    if (!data) {
      throw new Error(
        "Feedback data is required"
      );
    }

    // ========================================
    // PATIENT NAME
    // ========================================

    const patientName =
      typeof data.patientName ===
        "string"
        ? data.patientName.trim()
        : "";

    if (!patientName) {
      throw new Error(
        "Patient name is required"
      );
    }

    // ========================================
    // TREATMENT
    // ========================================

    const treatment =
      typeof data.treatment ===
        "string"
        ? data.treatment.trim()
        : "";

    if (!treatment) {
      throw new Error(
        "Treatment is required"
      );
    }

    // ========================================
    // REVIEW
    // ========================================

    const review =
      typeof data.review ===
        "string"
        ? data.review.trim()
        : "";

    if (!review) {
      throw new Error(
        "Review is required"
      );
    }

    // ========================================
    // RATING
    // ========================================

    const rating =
      Number(data.rating);

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      throw new Error(
        "Rating must be between 1 and 5"
      );
    }

    // ========================================
    // STATUS
    // ========================================

    const status =
      data.status ?? "Pending";

    this.validateStatus(status);

    // ========================================
    // PATIENT IMAGE
    // ========================================
    //
    // Controller already converts an uploaded
    // file into:
    //
    // /uploads/feedback/filename.jpg
    //
    // Here we only normalize the value.
    // ========================================

    const patientImage =
      this.normalizeImagePath(
        data.patientImage
      );

    console.log(
      "SERVICE CREATE PATIENT IMAGE:",
      patientImage
    );

    // ========================================
    // DATE
    // ========================================

    const date =
      typeof data.date === "string" &&
      data.date.trim()
        ? data.date.trim()
        : new Date()
            .toISOString()
            .split("T")[0];

    // ========================================
    // FINAL DATA
    // ========================================

    const feedback: FeedbackData = {
      patientName,

      patientImage,

      treatment,

      rating,

      review,

      status,

      date,
    };

    console.log(
      "SERVICE CREATE DATA:",
      feedback
    );

    return await this.repository.create(
      feedback
    );
  }

  // ==========================================
  // UPDATE FEEDBACK
  // ==========================================

  async update(
    id: number,
    data: UpdateFeedbackInput
  ) {
    this.validateId(id);

    if (!data) {
      throw new Error(
        "Feedback data is required"
      );
    }

    // ========================================
    // GET EXISTING RECORD
    // ========================================

    const existing =
      await this.repository.findById(id);

    if (!existing) {
      throw new Error(
        "Feedback not found"
      );
    }

    // ========================================
    // PATIENT NAME
    // ========================================

    const patientName =
      typeof data.patientName ===
        "string"
        ? data.patientName.trim()
        : "";

    if (!patientName) {
      throw new Error(
        "Patient name is required"
      );
    }

    // ========================================
    // TREATMENT
    // ========================================

    const treatment =
      typeof data.treatment ===
        "string"
        ? data.treatment.trim()
        : "";

    if (!treatment) {
      throw new Error(
        "Treatment is required"
      );
    }

    // ========================================
    // REVIEW
    // ========================================

    const review =
      typeof data.review ===
        "string"
        ? data.review.trim()
        : "";

    if (!review) {
      throw new Error(
        "Review is required"
      );
    }

    // ========================================
    // RATING
    // ========================================

    const rating =
      Number(data.rating);

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      throw new Error(
        "Rating must be between 1 and 5"
      );
    }

    // ========================================
    // STATUS
    // ========================================

    const status =
      data.status ??
      existing.status ??
      "Pending";

    this.validateStatus(status);

    // ========================================
    // PATIENT IMAGE
    // ========================================
    //
    // If a new image exists, use it.
    //
    // If no new image was uploaded, keep the
    // existing database image.
    // ========================================

    const normalizedInputImage =
      this.normalizeImagePath(
        data.patientImage
      );

    const patientImage =
      normalizedInputImage ??
      this.normalizeImagePath(
        (existing as any)
          .patientImage
      );

    console.log(
      "SERVICE UPDATE EXISTING IMAGE:",
      (existing as any)
        .patientImage
    );

    console.log(
      "SERVICE UPDATE NEW IMAGE:",
      normalizedInputImage
    );

    console.log(
      "SERVICE UPDATE FINAL IMAGE:",
      patientImage
    );

    // ========================================
    // DATE
    // ========================================

    const date =
      typeof data.date === "string" &&
      data.date.trim()
        ? data.date.trim()
        : existing.date ??
          new Date()
            .toISOString()
            .split("T")[0];

    // ========================================
    // FINAL DATA
    // ========================================

    const feedback: FeedbackData = {
      patientName,

      patientImage,

      treatment,

      rating,

      review,

      status,

      date,
    };

    console.log(
      "SERVICE UPDATE DATA:",
      feedback
    );

    // ========================================
    // UPDATE
    // ========================================

    const updated =
      await this.repository.update(
        id,
        feedback
      );

    if (!updated) {
      throw new Error(
        "Feedback not found"
      );
    }

    return updated;
  }

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  async updateStatus(
    id: number,
    status: string
  ) {
    this.validateId(id);

    this.validateStatus(status);

    const updated =
      await this.repository.updateStatus(
        id,
        status
      );

    if (!updated) {
      throw new Error(
        "Feedback not found"
      );
    }

    return updated;
  }

  // ==========================================
  // DELETE FEEDBACK
  // ==========================================

  async delete(id: number) {
    this.validateId(id);

    const deleted =
      await this.repository.delete(id);

    if (!deleted) {
      throw new Error(
        "Feedback not found"
      );
    }

    return deleted;
  }

  // ==========================================
  // NORMALIZE IMAGE PATH
  // ==========================================

  private normalizeImagePath(
    image?: string | null
  ): string | null {
    if (
      typeof image !== "string"
    ) {
      return null;
    }

    const value =
      image.trim();

    if (!value) {
      return null;
    }

    // ----------------------------------------
    // Already a full URL
    // ----------------------------------------

    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    // ----------------------------------------
    // Uploaded relative path
    // ----------------------------------------

    if (
      value.startsWith(
        "/uploads/"
      )
    ) {
      return value;
    }

    // ----------------------------------------
    // Missing leading slash
    //
    // uploads/feedback/a.jpg
    // becomes
    // /uploads/feedback/a.jpg
    // ----------------------------------------

    if (
      value.startsWith(
        "uploads/"
      )
    ) {
      return `/${value}`;
    }

    // ----------------------------------------
    // Just filename
    //
    // filename.jpg
    // becomes
    // /uploads/feedback/filename.jpg
    // ----------------------------------------

    return `/uploads/feedback/${value.replace(
      /^\/+/,
      ""
    )}`;
  }

  // ==========================================
  // VALIDATE ID
  // ==========================================

  private validateId(
    id: number
  ) {
    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      throw new Error(
        "Invalid feedback ID"
      );
    }
  }

  // ==========================================
  // VALIDATE STATUS
  // ==========================================

  private validateStatus(
    status: string
  ): asserts status is
    | "Pending"
    | "Approved"
    | "Rejected" {
    if (
      !this.allowedStatuses.includes(
        status as
          | "Pending"
          | "Approved"
          | "Rejected"
      )
    ) {
      throw new Error(
        "Invalid feedback status"
      );
    }
  }
}