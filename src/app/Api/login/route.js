import User from "@/Models/user.model";
import dbConnect from "@/Utilities/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { setCookie } from "cookies-next";
export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User does not exist" }), {
        status: 404,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return new Response(JSON.stringify({ error: "Incorrect password" }), {
        status: 400,
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "4h" }
    );

    const serializedCookie = serialize("token", token, {
      // httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "strict",
      maxAge: 14400,
      path: "/",
    });

    return new Response(JSON.stringify({ message: "Login successful" }), {
      headers: { "Set-Cookie": serializedCookie },
      status: 200,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
