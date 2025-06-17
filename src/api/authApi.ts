export const loginApi = async (credentials: {
  username: string;
  password: string;
}) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody.message || "Login failed");
  }

  const data = await res.json(); // Should return { token: "..." }
  return data.token;
};
