import { ServiceRepository } from "../repositories/service.repository";
import { Service } from "../types/service";

export class ServiceService {
  private repository = new ServiceRepository();

  // ==========================================
  // CREATE SERVICE
  // ==========================================
  async createService(
    service: Service
  ) {
    return await this.repository.create(
      service
    );
  }

  // ==========================================
  // GET ALL SERVICES
  // ==========================================
  async getServices() {
    return await this.repository.findAll();
  }

  // ==========================================
  // GET SERVICE BY ID
  // ==========================================
  async getServiceById(
    id: number
  ) {
    return await this.repository.findById(
      id
    );
  }

  // ==========================================
  // UPDATE SERVICE
  // ==========================================
  async updateService(
    id: number,
    service: Service
  ) {
    return await this.repository.update(
      id,
      service
    );
  }

  // ==========================================
  // DELETE SERVICE
  // ==========================================
  async deleteService(
    id: number
  ) {
    return await this.repository.delete(
      id
    );
  }
}