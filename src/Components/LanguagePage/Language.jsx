"use client";
import { useUser } from "@/ContextApi/userContext";
import React, { useState } from "react";

const LanguagePopup = () => {
  const { showPopup, setShowPopup } = useUser();

  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = ["English", "Spanish", "French", "German", "Chinese"];

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowPopup(false);
  };

  return (
    <div className=" ">
      {/* Popup and Overlay */}
      {showPopup && (
        <div>
          {/* Popup */}
          <div className="w-full h-full backdrop-brightness-50 backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50 ">
            <div className="w-[80%] h-[80%] bg-[#0e1010] text-white shadow-lg rounded-lg overflow-auto relative">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-md"
                onClick={togglePopup}
              >
                X
              </button>

              {/* Popup Content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Choose a Language
                </h2>
                <ul className="space-y-2">
                  {languages.map((language) => (
                    <li
                      key={language}
                      className={`p-3 cursor-pointer rounded-md ${
                        selectedLanguage === language
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-gray-100 hover:text-black "
                      }`}
                      onClick={() => handleLanguageSelect("English")}
                    >
                      <div className="flex justify-between">
                        {language}
                        {language !== "English" && (
                          <span>(Not Available Right Now)</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { LanguagePopup };
