"use client";
import { useUser } from "@/ContextApi/userContext";
import React, { useState } from "react";

const PolicyPopup = () => {
  const { showPolicy, setShowPolicy, togglePolicy } = useUser();

  return (
    <div className=" ">
      {/* Popup and Overlay */}
      {showPolicy && (
        <div>
          <div className="w-full h-full backdrop-brightness-50 backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 ">
            <div className="w-[100%] h-[100%] ss:w-[80%] ss:h-[80%] bg-[#0e1010] text-white shadow-lg rounded-lg overflow-auto relative p-5">
              {/* Close Button */}
              <div>
                <span className="text-2xl ss:text-3xl md:text-4xl font-extrabold">
                  Privicy and Policy
                </span>
                <p className="p-3 mt-3">
                  Beatify values your privacy and is committed to protecting
                  your personal information. This Privacy Policy outlines how we
                  collect, use, and share your information.
                </p>

                <button
                  className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => setShowPolicy(!showPolicy)}
                >
                  X
                </button>
              </div>

              <div className="p-10">
                <ol className="text-xl font-semibold list-decimal">
                  <li>
                    Information We Collect
                    <ul className="text-[medium] font-medium list-disc m-2">
                      <li>
                        Personal Information: Name, email address, and payment
                        details provided during account creation or purchases.
                      </li>
                      <li>
                        Usage Data: Information about how you use the app,
                        including playlists, likes, and preferences.
                      </li>
                      <li>
                        Device Information: Details about your device, browser,
                        and operating system
                      </li>
                    </ul>
                  </li>
                  <li>
                    How We Use Your Information
                    <ul className="text-[medium] font-medium list-disc m-2">
                      <li>To provide and improve our services.</li>
                      <li>
                        To communicate with you about updates, promotions, and
                        service-related information.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Cookies and Tracking
                    <ul className="text-[medium] font-medium list-disc m-2">
                      <li>
                        Beatify uses cookies to enhance your experience. These
                        track preferences and analyze site usage.
                      </li>
                      <li>
                        You can adjust your browser settings to refuse cookies,
                        but some features may not function correctly.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Children's Privacy
                    <ul className="text-[medium] font-medium list-disc m-2">
                      <li>
                        {" "}
                        Beatify is provided "as is" without warranties of any
                        kind, whether express or implied. We do not guarantee
                        uninterrupted or error-free access to the service..
                      </li>
                    </ul>
                  </li>
                  <li>
                    Limitation of Liability
                    <ul className="text-[medium] font-medium list-disc m-2">
                      <li>
                        {" "}
                        Beatify does not knowingly collect data from users under
                        13 years old. If you believe a child has provided us
                        with personal data, contact us immediately.
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { PolicyPopup };
