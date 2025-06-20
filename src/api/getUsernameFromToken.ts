export function getUsernameFromToken(token: string): string | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    return decodedPayload.sub || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
