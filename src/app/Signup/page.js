"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/Api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        console.log("registerd successfully");
        window.location.href = "/";
      }
    } catch {
      console.log("failed to register");
    }
  };
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-800 to-black min-h-screen">
      <nav className="w-full flex items-center h-15 bg-gray-900 p-5">
        <img
          src="/logo_beatify.png"
          alt="Beatify Logo"
          className="h-14  ml-10"
          onClick={() => router.push("/")}
        />
      </nav>

      <div className="w-[90%] ss:w-[70%] md:w-5/12 bg-gray-900 flex flex-col items-center rounded-lg py-10 my-12 p-5">
        <h1 className="text-3xl ss:text-4xl font-bold text-white text-center mb-6">
          Sign up to start listening
        </h1>

        <form
          onSubmit={register}
          method="post"
          className="flex flex-col w-full items-center"
        >
          <div className="mb-4 w-full max-w-sm">
            <label className="block text-white mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-600 rounded-md bg-transparent text-white px-4 py-2 focus:border-green-500 focus:outline-none"
            />
          </div>
          <div className="mb-4 w-full max-w-sm">
            <label className="block text-white mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="name@domain.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-600 rounded-md bg-transparent text-white px-4 py-2 focus:border-green-500 focus:outline-none"
            />
          </div>
          <div className="mb-4 w-full max-w-sm">
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-600 rounded-md bg-transparent text-white px-4 py-2 focus:border-green-500 focus:outline-none"
            />
          </div>
          <a
            href="#"
            className="text-green-500 hover:underline mb-4 text-center block"
          >
            Use phone number instead
          </a>
          <button
            type="submit"
            className="bg-green-500 w-full max-w-sm py-2 rounded-full text-white font-bold hover:bg-green-600"
          >
            Next
          </button>
        </form>

        {/* <div className="my-8 w-10/12 border-t border-gray-600"></div>

        <div className="space-y-4 w-full flex flex-col items-center">
          <button className="w-full max-w-sm flex items-center justify-center border border-gray-600 rounded-full px-4 py-2 hover:border-white">
            <img src="/googlelogo.svg" alt="Google" className="h-6 w-6" />
            <span className="ml-4 text-white">Signup with Google</span>
          </button>
        </div>

        <div className="my-8 w-10/12 border-t border-gray-600"></div> */}

        <div className="text-center text-gray-500 mt-3">
          <span className="block">
            Already have an account?{" "}
            <Link href="/Login" className="text-green-500 hover:underline">
              Log in here
            </Link>
          </span>
          {/* <p className="mt-4 text-xs text-gray-400">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p> */}
        </div>
      </div>
    </div>
  );
}
