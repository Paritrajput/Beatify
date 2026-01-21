"use client";
import { useUser } from "@/ContextApi/userContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer = () => {
  const { setShowTerms, showTerms, setShowPolicy, showPolicy } = useUser();
  const router = useRouter();
  return (
    <div className=" text-white   mt-8">
      <div className="w-full h-[1px] bg-gray-700 mb-3"></div>
      <div className="flex justify-start max-ss:flex-col p-3 ss:p-6 ss:space-x-6">
        <div className="flex justify-between  space-x-6">
          <div className="space-y-2">
            <span className="font-semibold">Company</span>
            <div onClick={() => router.push("/About")}>About</div>
            <div onClick={() => router.push("/ContactUs")}>Contact Us</div>
          </div>

          <div className="space-y-2">
            <span className="font-semibold">Legal </span>
            <div
              onClick={() => setShowTerms(!showTerms)}
              className="hover:text-white hover:underline"
            >
              Terms & Conditions
            </div>
            <div
              onClick={() => setShowPolicy(!showPolicy)}
              className="hover:text-white hover:underline"
            >
              Privacy Policy
            </div>
          </div>
        </div>
        <div className="flex items-center h-16 space-x-4">
          <Link href="">
            <img src="/icons-twitter.svg" alt="Twitter" className="w-7 h-7" />
          </Link>
          <Link href="">
            {" "}
            <img src="/icons-linkedin.svg" alt="Linkdin" className="w-7 h-7" />
          </Link>
          <Link href="">
            <img
              src="/icons-instagram.svg"
              alt="Instagram"
              className="w-7 h-7"
            />
          </Link>
        </div>
      </div>
      <div className="text-center mt-6">© 2024 Beatify</div>
    </div>
  );
};

export default Footer;
