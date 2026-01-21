import Image from "next/image";

const Search = () => {
  return (
    <div className="flex items-center h-16 bg-gray-800 rounded-full p-2 h-full ">
      <div className="relative w-full">
        <Image
          src="/download__2_-removebg-preview.png"
          alt="Search Icon"
          width={24}
          height={24}
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        />
        <input
          type="search"
          placeholder="What do you want to listen to?"
          className="w-full h-10 pl-12 pr-4 text-white bg-gray-700 rounded-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default Search;
