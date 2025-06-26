/* export const loginApi = async (credentials: {
  name: string;
  password: string;
}) => {
  
  const res = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || "Login failed");
  }

  const data = await res.json();
  
  return data.token;
};
 */
import axios from "axios";

export const loginApi = async (credentials: {
  name: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/login",
      credentials,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // response.data = { token: "..." }
    return response.data.token;
  } catch (error: any) {
    // axios errors have a response property with server error info
    // look into this to get a better understanding if it's needed
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Login failed");
  }
};
