import { GalleryRepository } from "../repositories/gallery.repository";
import { Gallery } from "../types/gallery";

export class GalleryService {
  private repository = new GalleryRepository();

  // ==========================================
  // CREATE GALLERY
  // ==========================================

  async createGallery(gallery: Gallery): Promise<number> {
    const payload: Gallery = {
      title: gallery.title?.trim() || "",

      description:
        gallery.description?.trim() || null,

      serviceId:
        gallery.serviceId ?? null,

      type:
        gallery.type?.trim() || "Image",

      image:
        gallery.image || null,

      status:
        gallery.status === "Inactive"
          ? "Inactive"
          : "Active",
    };

    console.log("========== SERVICE CREATE ==========");
    console.log("CREATE PAYLOAD:", payload);

    return await this.repository.create(payload);
  }

  // ==========================================
  // GET ALL GALLERY
  // ==========================================

  async getGallery(): Promise<Gallery[]> {
    return await this.repository.findAll();
  }

  // ==========================================
  // GET GALLERY BY ID
  // ==========================================

  async getGalleryById(
    id: number
  ): Promise<Gallery | null> {
    return await this.repository.findById(id);
  }

  // ==========================================
  // UPDATE GALLERY
  // ==========================================

  async updateGallery(
    id: number,
    gallery: Gallery
  ): Promise<boolean> {
    const payload: Gallery = {
      title:
        gallery.title?.trim() || "",

      description:
        gallery.description?.trim() || null,

      serviceId:
        gallery.serviceId ?? null,

      type:
        gallery.type?.trim() || "Image",

      image:
        gallery.image || null,

      status:
        gallery.status === "Inactive"
          ? "Inactive"
          : "Active",
    };

    console.log("========== SERVICE UPDATE ==========");
    console.log("ID:", id);
    console.log("UPDATE PAYLOAD:", payload);

    return await this.repository.update(
      id,
      payload
    );
  }

  // ==========================================
  // DELETE GALLERY
  // ==========================================

  async deleteGallery(
    id: number
  ): Promise<boolean> {
    console.log(
      "SERVICE DELETE GALLERY:",
      id
    );

    return await this.repository.delete(id);
  }
}