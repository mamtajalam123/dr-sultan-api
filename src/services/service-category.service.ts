import { ServiceCategoryRepository } from "../repositories/service-category.repository";
import { ServiceCategory } from "../types/service-category";

export class ServiceCategoryService {
  private repository = new ServiceCategoryRepository();

  // ==========================================
  // CREATE CATEGORY
  // ==========================================
  async createCategory(category: ServiceCategory) {
    return await this.repository.create(category);
  }

  // ==========================================
  // GET ALL CATEGORIES
  // ==========================================
  async getCategories() {
    return await this.repository.findAll();
  }

  // ==========================================
  // GET CATEGORY BY ID
  // ==========================================
  async getCategoryById(id: number) {
    return await this.repository.findById(id);
  }

  // ==========================================
  // UPDATE CATEGORY
  // ==========================================
  async updateCategory(
    id: number,
    category: ServiceCategory
  ) {
    return await this.repository.update(
      id,
      category
    );
  }

  // ==========================================
  // DELETE CATEGORY
  // ==========================================
  async deleteCategory(id: number) {
    return await this.repository.delete(id);
  }
}