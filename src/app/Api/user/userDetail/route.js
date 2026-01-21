// import { verifyToken } from '../../utils/jwt';
import { verifyJWT } from "@/Utilities/jwt";

export async function GET(req) {
  try {
    const userDetails = await verifyJWT(req);
    console.log(userDetails);
    return new Response(JSON.stringify({ user: userDetails }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 401,
    });
  }
}
