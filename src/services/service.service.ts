import { ServiceRepository } from "../repositories/service.repository";
import { Service } from "../types/service";


export class ServiceService {

  private repository =
    new ServiceRepository();



  // CREATE
  async createService(
    service: Service
  ): Promise<number> {

    return this.repository.create(
      service
    );

  }



  // GET ALL
  async getServices() {

    return this.repository.findAll();

  }



  // GET BY ID
  async getServiceById(
    id:number
  ) {

    return this.repository.findById(
      id
    );

  }



  // UPDATE
  async updateService(
    id:number,
    service:Service
  ):Promise<boolean>{

    return this.repository.update(
      id,
      service
    );

  }



  // DELETE
  async deleteService(
    id:number
  ):Promise<boolean>{

    return this.repository.delete(
      id
    );

  }

}