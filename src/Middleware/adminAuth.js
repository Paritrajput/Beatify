import jwt from "jsonwebtoken";

export async function adminAuth(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Authentication failed: No token provided" }),
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return new Response(JSON.stringify({ error: "Unauthorized access" }), {
        status: 403,
      });
    }
    return true; // Valid admin
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 401,
    });
  }
}
