import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div>
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              About Us
            </h2>
            <p className="mt-4 text-white text-lg">
              At NewsBase, we believe in the power of storytelling and staying
              informed. Our platform is a unique blend of news and creativity,
              designed to keep you connected to the world while giving you the
              freedom to express yourself. Whether you're a news enthusiast
              looking for the latest updates or a passionate writer eager to
              share your ideas, we've created a space where your voice matters.
              With user-generated blogs, trending news, and a vibrant community,
              YourVoiceHub empowers you to inform, inspire, and ignite
              conversations that matter. Join us in shaping a platform where
              every story counts and every opinion matters. Together, let's
              create, share, and grow!
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Connect with us
              </Link>
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
              alt="About Us Image"
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
