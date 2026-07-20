import API_URL from "@/lib/api";

export const createAppointment = async (data: any) => {
  const response = await fetch(
    `${API_URL}/appointments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const getAppointments = async () => {
  const response = await fetch(
    `${API_URL}/appointments`
  );

  return response.json();
};

export const getAppointmentById = async (
  id: number
) => {
  const response = await fetch(
    `${API_URL}/appointments/${id}`
  );

  return response.json();
};

export const updateAppointment = async (
  id: number,
  data: any
) => {
  const response = await fetch(
    `${API_URL}/appointments/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return response.json();
};

export const deleteAppointment = async (
  id: number
) => {
  const response = await fetch(
    `${API_URL}/appointments/${id}`,
    {
      method: "DELETE",
    }
  );

  return response.json();
};