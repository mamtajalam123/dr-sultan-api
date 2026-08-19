import pool from "../config/db";

import {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";

import { Service } from "../types/service";



export class ServiceRepository {



  // ==========================================
  // CREATE SERVICE
  // ==========================================

  async create(
    service: Service
  ): Promise<number> {


    let slug = "";


    if(service.categoryId){

      slug =
        await this.generateSlugFromCategory(
          service.categoryId
        );

    }


    if(!slug){

      slug =
        this.generateSlug(
          service.name ?? "service"
        );

    }



    const sql = `

      INSERT INTO services
      (
        name,
        slug,
        category_id,
        duration,
        short_description,
        description,
        image,
        status
      )

      VALUES (?, ?, ?, ?, ?, ?, ?, ?)

    `;



    const values = [

      service.name ?? "",

      slug,

      service.categoryId ?? null,

      service.duration ?? "",

      service.shortDescription ?? "",

      service.description ?? "",

      service.image ?? null,

      service.status ?? "Active"

    ];



    const [result] =
      await pool.execute<ResultSetHeader>(
        sql,
        values
      );


    return result.insertId;

  }







  // ==========================================
  // GET ALL
  // ==========================================

  async findAll()
  :Promise<RowDataPacket[]> {


    const [rows] =
      await pool.execute<RowDataPacket[]>(

        `
        SELECT

        s.*,

        c.name AS categoryName

        FROM services s

        LEFT JOIN service_categories c

        ON s.category_id=c.id

        ORDER BY s.created_at DESC

        `

      );


    return rows;

  }







  // ==========================================
  // GET BY ID
  // ==========================================

  async findById(
    id:number
  ):Promise<RowDataPacket|null>{


    const [rows] =
      await pool.execute<RowDataPacket[]>(

        `
        SELECT

        s.*,

        c.name AS categoryName

        FROM services s

        LEFT JOIN service_categories c

        ON s.category_id=c.id

        WHERE s.id=?

        LIMIT 1

        `,

        [id]

      );


    return rows.length
      ? rows[0]
      : null;

  }







  // ==========================================
  // GET BY SLUG
  // ==========================================

  async findBySlug(
    slug:string
  ):Promise<RowDataPacket|null>{


    const [rows] =
      await pool.execute<RowDataPacket[]>(

        `
        SELECT

        s.*,

        c.name AS categoryName

        FROM services s

        LEFT JOIN service_categories c

        ON s.category_id=c.id

        WHERE s.slug=?

        LIMIT 1

        `,

        [slug]

      );


    return rows.length
      ? rows[0]
      : null;


  }








  // ==========================================
  // UPDATE SERVICE
  // ==========================================

  async update(
    id:number,
    service:Service
  ):Promise<boolean>{


    let image =
      service.image ?? null;



    if(!image){

      const [oldImage] =
        await pool.execute<RowDataPacket[]>(

          `
          SELECT image
          FROM services
          WHERE id=?
          `,

          [id]

        );


      image =
        oldImage.length
        ?
        oldImage[0].image
        :
        null;

    }





    const oldService =
      await this.findById(id);



    if(!oldService){

      return false;

    }





    let slug =
      oldService.slug;





    // category change = update slug

    if(service.categoryId){


      const categorySlug =
        await this.generateSlugFromCategory(
          service.categoryId
        );


      if(categorySlug){

        slug = categorySlug;

      }

    }







    const [result] =
      await pool.execute<ResultSetHeader>(


        `
        UPDATE services

        SET

        name=?,

        slug=?,

        category_id=?,

        duration=?,

        short_description=?,

        description=?,

        image=?,

        status=?

        WHERE id=?

        `,


        [

          service.name ?? "",

          slug,

          service.categoryId ?? null,

          service.duration ?? "",

          service.shortDescription ?? "",

          service.description ?? "",

          image,

          service.status ?? "Active",

          id

        ]


      );



    return result.affectedRows > 0;


  }








  // ==========================================
  // DELETE SERVICE
  // ==========================================

  async delete(
    id:number
  ):Promise<boolean>{


    const [result] =
      await pool.execute<ResultSetHeader>(


        `
        DELETE FROM services
        WHERE id=?
        `,


        [id]

      );


    return result.affectedRows > 0;


  }








  // ==========================================
  // CATEGORY SLUG
  // ==========================================

  private async generateSlugFromCategory(
    categoryId:number
  ):Promise<string>{


    const [rows] =
      await pool.execute<RowDataPacket[]>(


        `
        SELECT name

        FROM service_categories

        WHERE id=?

        LIMIT 1

        `,


        [categoryId]

      );



    if(rows.length===0){

      return "";

    }



    return this.generateSlug(
      rows[0].name
    );


  }








  // ==========================================
  // SLUG GENERATOR
  // ==========================================

  private generateSlug(
    text:string
  ):string{


    return text

    .toLowerCase()

    .trim()

    .replace(
      /[^a-z0-9]+/g,
      "-"
    )

    .replace(
      /^-+|-+$/g,
      "" 
    );


  }



}