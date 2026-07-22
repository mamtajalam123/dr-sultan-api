import { FeedbackRepository } from "../repositories/feedback.repository";
import { Feedback } from "../types/feedback";

export class FeedbackService {
  private repository = new FeedbackRepository();

  // ==========================================
  // CREATE FEEDBACK
  // ==========================================
  async createFeedback(
    feedback: Feedback
  ): Promise<number> {
    return await this.repository.create(feedback);
  }

  // ==========================================
  // GET ALL FEEDBACK
  // ==========================================
  async getFeedbacks() {
    return await this.repository.findAll();
  }

  // ==========================================
  // GET FEEDBACK BY ID
  // ==========================================
  async getFeedbackById(
    id: number
  ) {
    return await this.repository.findById(id);
  }

  // ==========================================
  // UPDATE FEEDBACK
  // ==========================================
  async updateFeedback(
    id: number,
    feedback: Feedback
  ): Promise<boolean> {
    return await this.repository.update(
      id,
      feedback
    );
  }

  // ==========================================
  // DELETE FEEDBACK
  // ==========================================
  async deleteFeedback(
    id: number
  ): Promise<boolean> {
    return await this.repository.delete(id);
  }
}