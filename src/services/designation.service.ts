import { DesignationRepository } from "../repositories/designation.repository";
import { Designation } from "../types/designation";

export class DesignationService {
  private repository = new DesignationRepository();

  // ==========================================
  // CREATE DESIGNATION
  // ==========================================
  async createDesignation(
    designation: Designation
  ) {
    return await this.repository.create(
      designation
    );
  }

  // ==========================================
  // GET ALL DESIGNATIONS
  // ==========================================
  async getDesignations() {
    return await this.repository.findAll();
  }

  // ==========================================
  // GET DESIGNATION BY ID
  // ==========================================
  async getDesignationById(
    id: number
  ) {
    return await this.repository.findById(
      id
    );
  }

  // ==========================================
  // UPDATE DESIGNATION
  // ==========================================
  async updateDesignation(
    id: number,
    designation: Designation
  ) {
    return await this.repository.update(
      id,
      designation
    );
  }

  // ==========================================
  // DELETE DESIGNATION
  // ==========================================
  async deleteDesignation(
    id: number
  ) {
    return await this.repository.delete(
      id
    );
  }

  // ==========================================
  // CHECK DESIGNATION EXISTS
  // ==========================================
  async designationExists(
    name: string
  ) {
    return await this.repository.findDesignationByName(
      name
    );
  }
}