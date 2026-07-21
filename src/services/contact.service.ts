import { ContactRepository } from "../repositories/contact.repository";
import { Contact } from "../types/contact";

export class ContactService {
  private repository = new ContactRepository();

  // ==========================================
  // CREATE CONTACT
  // ==========================================
  async createContact(contact: Contact) {
    return await this.repository.create(contact);
  }

  // ==========================================
  // GET ALL CONTACTS
  // ==========================================
  async getContacts() {
    return await this.repository.findAll();
  }

  // ==========================================
  // GET CONTACT BY ID
  // ==========================================
  async getContactById(id: number) {
    return await this.repository.findById(id);
  }

  // ==========================================
  // UPDATE CONTACT
  // ==========================================
  async updateContact(
    id: number,
    contact: Contact
  ) {
    return await this.repository.update(
      id,
      contact
    );
  }

  // ==========================================
  // UPDATE STATUS
  // ==========================================
  async updateStatus(
    id: number,
    status: string
  ) {
    return await this.repository.updateStatus(
      id,
      status
    );
  }

  // ==========================================
  // DELETE CONTACT
  // ==========================================
  async deleteContact(id: number) {
    return await this.repository.delete(id);
  }
}