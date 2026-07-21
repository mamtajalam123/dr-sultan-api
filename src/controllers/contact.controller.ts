import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";

class ContactController {
  private service = new ContactService();

  // ==========================================
  // CREATE CONTACT
  // POST /contact
  // ==========================================
  create = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = await this.service.createContact(req.body);

      return res.status(201).json({
        success: true,
        status: "201 Created",
        message: "Contact message sent successfully.",
        id,
      });
    } catch (error) {
      console.error("CREATE CONTACT ERROR:", error);

      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: "Failed to send contact message.",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  // ==========================================
  // GET ALL CONTACTS
  // ==========================================
  getAll = async (
    req: Request,
    res: Response
  ) => {
    try {
      const contacts = await this.service.getContacts();

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: contacts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: "Failed to fetch contacts.",
      });
    }
  };

  // ==========================================
  // GET CONTACT BY ID
  // ==========================================
 getById = async (req: Request, res: Response) => {

    try {
      const id = Number(req.params.id);

      const contact = await this.service.getContactById(id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Contact not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        data: contact,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: "Failed to fetch contact.",
      });
    }
  };

  // ==========================================
  // UPDATE CONTACT
  // ==========================================
  update = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const updated = await this.service.updateContact(id, req.body);

      if (!updated) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Contact not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message: "Contact updated successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: "Failed to update contact.",
      });
    }
  };

  // ==========================================
  // UPDATE STATUS
  // ==========================================
  updateStatus = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;

      const allowedStatus = ["New", "Replied", "Archived"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          status: "400 Bad Request",
          message: "Invalid contact status.",
          allowedValues: allowedStatus,
        });
      }

      const updated = await this.service.updateStatus(id, status);

      if (!updated) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Contact not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message: "Contact status updated successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: "Failed to update contact status.",
      });
    }
  };

  // ==========================================
  // DELETE CONTACT
  // ==========================================
  remove = async (
    req: Request,
    res: Response
  ) => {
    try {
      const id = Number(req.params.id);

      const deleted = await this.service.deleteContact(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          status: "404 Not Found",
          message: "Contact not found.",
        });
      }

      return res.status(200).json({
        success: true,
        status: "200 OK",
        message: "Contact deleted successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        status: "500 Internal Server Error",
        message: "Failed to delete contact.",
      });
    }
  };
}

export default ContactController;