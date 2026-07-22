import { GalleryRepository } from "../repositories/gallery.repository";
import { Gallery } from "../types/gallery";

export class GalleryService {
  private repository = new GalleryRepository();

  // ==========================================
  // CREATE GALLERY
  // ==========================================
  async createGallery(gallery: Gallery) {
    return await this.repository.create(gallery);
  }

  // ==========================================
  // GET ALL GALLERY
  // ==========================================
  async getGallery() {
    return await this.repository.findAll();
  }

  // ==========================================
  // GET GALLERY BY ID
  // ==========================================
  async getGalleryById(id: number) {
    return await this.repository.findById(id);
  }

  // ==========================================
  // UPDATE GALLERY
  // ==========================================
  async updateGallery(
    id: number,
    gallery: Gallery
  ) {
    return await this.repository.update(
      id,
      gallery
    );
  }

  // ==========================================
  // DELETE GALLERY
  // ==========================================
  async deleteGallery(id: number) {
    return await this.repository.delete(id);
  }
}