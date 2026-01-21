"use client";
import { useUser } from "@/ContextApi/userContext";
import React, { useState } from "react";

const TermsPopup = () => {
  const { showTerms, setShowTerms, toggleTerms } = useUser();

  return (
    <div className=" ">
      {/* Popup and Overlay */}
      {showTerms && (
        <div>
          <div className="w-full h-full backdrop-brightness-50 backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 ">
            <div className="w-[100%] h-[100%] ss:w-[80%] ss:h-[80%] bg-[#0e1010] text-white shadow-lg rounded-lg overflow-auto relative p-5">
              {/* Close Button */}
              <div>
                <span className="text-2xl ss:text-3xl md:text-4xl font-extrabold">
                  Terms and Conditions
                </span>
                <p className="p-3 mt-3">
                  Welcome to Beatify! By accessing or using our website or
                  services, you agree to comply with and be bound by these Terms
                  and Conditions. Please read them carefully. If you do not
                  agree to these terms, you may not use our services.
                </p>

                <button
                  className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => setShowTerms(!showTerms)}
                >
                  X
                </button>
              </div>

              <div className="p-10 pt-5">
                <ol className="text-xl font-semibold list-decimal">
                  <li>
                    Use of Service
                    <ul className="text-[medium] font-medium list-disc m-2">
                      <li>You must be at least 13 years old to use Beatify</li>
                      <li>
                        You agree not to use the platform for any unlawful or
                        unauthorized purposes.
                      </li>
                      <li>
                        You are responsible for maintaining the confidentiality
                        of your account credentials.
                      </li>
                    </ul>
                  </li>
                  <li>
                    User Content
                    <ul className="text-[medium] font-medium list-disc m-2">
                      <li>
                        By uploading or sharing content on Beatify, you grant us
                        a non-exclusive, worldwide, royalty-free license to use,
                        modify, display, and distribute your content within the
                        platform.
                      </li>
                      <li>
                        You must own the rights to the content you upload or
                        have the necessary permissions to share it.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Intellectual Property
                    <ul className="text-[medium] font-medium list-disc m-2">
                      <li>
                        All trademarks, logos, and content on Beatify are the
                        intellectual property of Beatify and its affiliates. You
                        may not use them without prior written consent.
                      </li>
                    </ul>
                  </li>
                  <li>
                    Disclaimer
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
                        Beatify is not liable for any indirect, incidental, or
                        consequential damages arising out of your use or
                        inability to use the platform
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

export { TermsPopup };
