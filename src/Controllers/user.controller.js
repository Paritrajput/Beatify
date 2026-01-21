import { User } from "@/Models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body();
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const Username = User.findOne({ username });
    const Email = await User.findOne({ email });
    if (Username) {
      return res.status(400).json({ error: "username already exists" });
    }
    if (Email) {
      return res.status(400).json({ error: "email already exists" });
    }

    const hashedPassward = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassward,
    });
    await newUser.save();
  } catch {
    return res.status(400).json({ error: "error while registering user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body();
    if (!email || !password) {
      return res.json({ message: "all the fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "user does not exist" });
    }
    const isPasswardCorrect = bcrypt.compare(password, user.password);
    if (!isPasswardCorrect) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, username: user.username },
      process.env.Access_Token_Secret,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ massage: "User logged in successfully", accessToken });
  } catch {
    return res.status(400).json({ error: "error while login" });
  }
};
export { registerUser, loginUser };
