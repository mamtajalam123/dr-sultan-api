const API_URL =
  process.env.NEXT_PUBLIC_API_URL;


export const appointmentAPI = {


  create: async (data:any) => {

    const token =
      localStorage.getItem("token");


    const response =
      await fetch(
        `${API_URL}/appointments`,
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body:
            JSON.stringify(data),
        }
      );


    return response.json();

  },



  getAll: async()=>{

    const token =
      localStorage.getItem("token");


    const response =
      await fetch(
        `${API_URL}/appointments`,
        {

          headers:{
            Authorization:
              `Bearer ${token}`,
          },

        }
      );


    return response.json();

  }


};