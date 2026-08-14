const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api"
).replace(/\/+$/, "");



export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {


  // ==========================================
  // TOKEN
  // ==========================================

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;



  // ==========================================
  // BODY TYPE
  // ==========================================

  const isFormData =
    typeof FormData !== "undefined" &&
    options.body instanceof FormData;



  // ==========================================
  // HEADERS
  // ==========================================

  const headers =
    new Headers(
      options.headers
    );



  if(!headers.has("Accept")){

    headers.set(
      "Accept",
      "application/json"
    );

  }



  if(token){

    headers.set(
      "Authorization",
      `Bearer ${token}`
    );

  }



  // JSON only
  // Never set for FormData

  if(
    !isFormData &&
    options.body &&
    !headers.has(
      "Content-Type"
    )
  ){

    headers.set(
      "Content-Type",
      "application/json"
    );

  }





  // ==========================================
  // URL
  // ==========================================


  const cleanEndpoint =
    endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;



  const url =
    `${API_URL}${cleanEndpoint}`;





  // ==========================================
  // DEBUG REQUEST
  // ==========================================


  console.log(
    "=============================="
  );

  console.log(
    "API REQUEST"
  );

  console.log(
    "URL:",
    url
  );

  console.log(
    "METHOD:",
    options.method || "GET"
  );

  console.log(
    "BODY:",
    isFormData
      ? "FORM DATA"
      : options.body || null
  );

  console.log(
    "TOKEN:",
    token ? "YES":"NO"
  );

  console.log(
    "=============================="
  );





  // ==========================================
  // FETCH
  // ==========================================


  let response:Response;


  try{


    response =
      await fetch(
        url,
        {
          ...options,
          headers,
        }
      );


  }
  catch(error){


    console.error(
      "NETWORK ERROR:",
      error
    );


    throw new Error(
      "Backend server not running."
    );


  }





  // ==========================================
  // PARSE RESPONSE
  // ==========================================


  let data:any = null;


  const contentType =
    response.headers.get(
      "content-type"
    ) || "";



  try{


    if(
      response.status !== 204
    ){

      if(
        contentType.includes(
          "application/json"
        )
      ){

        data =
          await response.json();

      }
      else{

        data =
          await response.text();

      }

    }


  }
  catch(error){


    console.error(
      "JSON PARSE ERROR",
      error
    );


  }







  // ==========================================
  // DEBUG RESPONSE
  // ==========================================


  console.log(
    "=============================="
  );

  console.log(
    "API RESPONSE"
  );

  console.log(
    "STATUS:",
    response.status
  );

  console.log(
    "DATA:",
    data
  );

  console.log(
    "=============================="
  );






  // ==========================================
  // ERROR
  // ==========================================


  if(
    !response.ok
  ){


    let message =
      `HTTP ${response.status}`;



    if(
      data?.message
    ){

      message =
        data.message;

    }


    throw new Error(
      message
    );


  }





  return data as T;

}