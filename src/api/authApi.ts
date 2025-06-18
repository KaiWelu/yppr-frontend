export const loginApi = async (credentials: {
  name: string;
  password: string;
}) => {
  console.log(credentials);
  const res = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || "Login failed");
  }

  const data = await res.json(); // Should return { token: "..." }
  console.log(data);
  return data.token;
};
