const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // ==========================================
  // GET TOKEN
  // ==========================================

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // ==========================================
  // CHECK BODY TYPE
  // ==========================================

  const isFormData =
    typeof FormData !== "undefined" &&
    options.body instanceof FormData;

  // ==========================================
  // HEADERS
  // ==========================================

  const headers = new Headers(
    options.headers
  );

  // Accept JSON response
  if (!headers.has("Accept")) {
    headers.set(
      "Accept",
      "application/json"
    );
  }

  // JWT token
  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  // ==========================================
  // CONTENT-TYPE
  // ==========================================

  // IMPORTANT:
  // Do NOT manually set Content-Type for FormData.
  //
  // Browser automatically creates:
  // multipart/form-data; boundary=...
  //
  // For normal JSON requests, set JSON.
  if (
    !isFormData &&
    options.body !== undefined &&
    !headers.has("Content-Type")
  ) {
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

  console.log("=================================");
  console.log("API REQUEST");
  console.log("URL:", url);
  console.log(
    "METHOD:",
    options.method || "GET"
  );
  console.log(
    "BODY:",
    isFormData
      ? "FormData"
      : options.body || null
  );
  console.log(
    "TOKEN:",
    token ? "YES" : "NO"
  );
  console.log("=================================");

  // ==========================================
  // FETCH
  // ==========================================

  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error(
      "NETWORK ERROR:",
      error
    );

    throw new Error(
      "Unable to connect to API server. Make sure the backend is running on port 5000."
    );
  }

  // ==========================================
  // RESPONSE CONTENT TYPE
  // ==========================================

  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  let data: unknown = null;

  // ==========================================
  // HANDLE 204 NO CONTENT
  // ==========================================

  if (response.status === 204) {
    data = null;
  } else {
    try {
      if (
        contentType.includes(
          "application/json"
        )
      ) {
        data = await response.json();
      } else {
        const text =
          await response.text();

        data = text || null;
      }
    } catch (error) {
      console.error(
        "RESPONSE PARSE ERROR:",
        error
      );

      data = null;
    }
  }

  // ==========================================
  // DEBUG RESPONSE
  // ==========================================

  console.log("=================================");
  console.log("API RESPONSE");
  console.log(
    "STATUS:",
    response.status
  );
  console.log(
    "OK:",
    response.ok
  );
  console.log(
    "DATA:",
    data
  );
  console.log("=================================");

  // ==========================================
  // HANDLE API ERROR
  // ==========================================

  if (!response.ok) {
    console.error(
      "========== API ERROR =========="
    );

    console.error(
      "URL:",
      url
    );

    console.error(
      "METHOD:",
      options.method || "GET"
    );

    console.error(
      "STATUS:",
      response.status
    );

    console.error(
      "STATUS TEXT:",
      response.statusText
    );

    console.error(
      "RESPONSE:",
      data
    );

    console.error(
      "=============================="
    );

    let message =
      `HTTP ${response.status}`;

    // ----------------------------------------
    // String error
    // ----------------------------------------

    if (
      typeof data === "string" &&
      data.trim()
    ) {
      message = data;
    }

    // ----------------------------------------
    // Object error
    // ----------------------------------------

    if (
      typeof data === "object" &&
      data !== null
    ) {
      const errorData =
        data as {
          message?: unknown;
          error?: unknown;
          errors?: unknown;
        };

      if (
        typeof errorData.message ===
          "string" &&
        errorData.message.trim()
      ) {
        message =
          errorData.message;
      } else if (
        typeof errorData.error ===
          "string" &&
        errorData.error.trim()
      ) {
        message =
          errorData.error;
      } else if (
        Array.isArray(
          errorData.errors
        )
      ) {
        message =
          errorData.errors
            .map((error) =>
              typeof error ===
              "string"
                ? error
                : JSON.stringify(error)
            )
            .join(", ");
      }
    }

    console.error(
      "FINAL ERROR MESSAGE:",
      message
    );

    throw new Error(message);
  }

  // ==========================================
  // SUCCESS
  // ==========================================

  return data as T;
}