import pool from "../config/db";

import {
  ResultSetHeader,
  RowDataPacket,
} from "mysql2";


// ==========================================
// TYPES
// ==========================================

export type FeedbackStatus =
  | "Pending"
  | "Approved"
  | "Rejected";


interface FeedbackRow extends RowDataPacket {

  id:number;

  patientName:string;

  patientImage:string | null;

  treatment:string;

  rating:number;

  review:string;

  status:FeedbackStatus;

  date:string | null;

  createdAt:string | null;

  updatedAt:string | null;

}



export interface FeedbackRepositoryData {

  patientName:string;

  patientImage?:string | null;

  treatment:string;

  rating:number;

  review:string;

  status:FeedbackStatus;

  date?:string | null;

}



// ==========================================
// REPOSITORY
// ==========================================

class FeedbackRepository {



private normalizeImagePath(
  image?: string | null
) {

  if (!image) {
    return null;
  }


  let value = image.trim();


  if (!value) {
    return null;
  }


  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }


  value = value.replace(/^\/+/, "");


  if(
    value.startsWith("uploads/")
  ){
    return "/" + value;
  }


  return `/uploads/feedback/${value}`;

}




private mapRow(
 row:FeedbackRow
){

 return {

   ...row,

   patientImage:
   this.normalizeImagePath(
    row.patientImage
   )

 };

}




// ==========================================
// FIND ALL
// ==========================================

async findAll()
:Promise<FeedbackRow[]>{


const sql=`

SELECT

id,

patient_name AS patientName,

patient_image AS patientImage,

treatment,

rating,

review,

status,

date,

created_at AS createdAt,

updated_at AS updatedAt


FROM feedback

ORDER BY id DESC

`;



const [rows]=
await pool.execute<FeedbackRow[]>(
 sql
);



return rows.map(
 row=>this.mapRow(row)
);



}





// ==========================================
// FIND BY ID
// ==========================================

async findById(
 id:number
)
:Promise<FeedbackRow|null>{


const sql=`

SELECT

id,

patient_name AS patientName,

patient_image AS patientImage,

treatment,

rating,

review,

status,

date,

created_at AS createdAt,

updated_at AS updatedAt


FROM feedback

WHERE id=?

LIMIT 1

`;



const [rows]=
await pool.execute<FeedbackRow[]>(
 sql,
 [id]
);



if(rows.length===0){

 return null;

}



return this.mapRow(rows[0]);

}





// ==========================================
// CREATE
// ==========================================

async create(
 data:FeedbackRepositoryData
)
:Promise<number>{



const sql=`

INSERT INTO feedback

(

patient_name,

patient_image,

treatment,

rating,

review,

status,

date

)

VALUES(?,?,?,?,?,?,?)

`;



const values=[

data.patientName,

this.normalizeImagePath(
 data.patientImage
),

data.treatment,

data.rating,

data.review,

data.status,

data.date ?? null

];



const [result]=
await pool.execute<ResultSetHeader>(
 sql,
 values
);



return result.insertId;


}





// ==========================================
// UPDATE
// ==========================================

async update(

id:number,

data:FeedbackRepositoryData

)
:Promise<boolean>{



const sql=`

UPDATE feedback

SET

patient_name=?,

patient_image=?,

treatment=?,

rating=?,

review=?,

status=?,

date=?

WHERE id=?

`;



const values=[


data.patientName,


this.normalizeImagePath(
 data.patientImage
),


data.treatment,


data.rating,


data.review,


data.status,


data.date ?? null,


id

];



const [result]=
await pool.execute<ResultSetHeader>(
 sql,
 values
);



return result.affectedRows>0;


}





// ==========================================
// UPDATE STATUS
// ==========================================

async updateStatus(

id:number,

status:FeedbackStatus

)
:Promise<boolean>{



const sql=`

UPDATE feedback

SET status=?

WHERE id=?

`;



const [result]=
await pool.execute<ResultSetHeader>(
 sql,
 [
  status,
  id
 ]
);



return result.affectedRows>0;


}





// ==========================================
// DELETE
// ==========================================

async delete(
 id:number
)
:Promise<boolean>{



const sql=`

DELETE FROM feedback

WHERE id=?

`;



const [result]=
await pool.execute<ResultSetHeader>(
 sql,
 [id]
);



return result.affectedRows>0;


}



}



export default FeedbackRepository;