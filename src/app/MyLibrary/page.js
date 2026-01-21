import Footer from "@/Components/Main/Footer";
import MyPlaylists from "@/Components/Main/Myplaylist";
import Link from "next/link";
import React from "react";

function MyLibrary() {
  return (
    <div className=" bg-[linear-gradient(180deg,rgb(42_42_42),rgb(15_15_15))] rounded-[10px]  w-full ">
      <div className="bg-[#101010] h-15 text-2xl font-bold p-3 rounded-tr-[10px] rounded-tl-[10px] ">
        My Library
      </div>
      <div className="flex-1 h-5/6  overflow-y-auto p-6  overflow-x-hidden">
        <div className="">
          <MyPlaylists />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MyLibrary;
