import Playlists from "@/Components/Main/Playlists";
import MyPlaylists from "@/Components/Main/Myplaylist";
import Artists from "@/Components/Main/Artists";
import Footer from "@/Components/Main/Footer";


export default function HomePage() {
  return (
    <div className="min-h-full px-4 sm:px-6 box-border py-4 bg-gradient-to-b from-[#2a2a2a] to-[#0f0f0f] h-full overflow-y-auto rounded-lg">
      {/* Page header */}
      <div className="bg-[#101010] text-xl sm:text-2xl font-bold px-4 py-3 rounded-lg mb-8">
        Browse Playlists
      </div>

      {/* Sections */}
      <div className="space-y-12">
        <Playlists />
        <MyPlaylists />
        <Artists />
      </div>

      {/* Bottom spacing so footer doesn't feel glued */}

      <div className="h-6" />
      <Footer/>
    </div>
  );
}
