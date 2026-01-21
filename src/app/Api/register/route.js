import User from "@/Models/user.model";
import dbConnect from "@/Utilities/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    // Connect to the database
    await dbConnect();

    // Get data from the request body
    const { username, email, password } = await req.json();

    // Validate the input fields
    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
        }
      );
    }

    // Check if the username or email already exists
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername) {
      return new Response(
        JSON.stringify({ error: "Username already exists" }),
        { status: 400 }
      );
    }

    if (existingEmail) {
      return new Response(JSON.stringify({ error: "Email already exists" }), {
        status: 400,
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Return success response
    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while registering user:", error);
    return new Response(
      JSON.stringify({ error: "Error while registering user" }),
      { status: 500 }
    );
  }
}
