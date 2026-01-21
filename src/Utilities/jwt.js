import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

export const verifyJWT = (req) => {
  try {
    // Manually parse cookies from the request headers
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      throw new Error("Token not found");
    }

    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((cookie) => cookie.trim().split("="))
    );

    const token = cookies.token;

    if (!token) {
      throw new Error("Token not found");
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    throw new Error("Unauthorized");
  }
};
