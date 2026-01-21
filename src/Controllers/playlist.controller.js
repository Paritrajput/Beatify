const { Playlist } = require("@/Models/playlist.model");

const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();

    return res.status(200).json({
      message: "Playlists fetched successfully",
      playlists,
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getPlaylist = async (req, res) => {
  try {
    const { _id } = req.body();
    const playlist = await Playlist.findById({ _id });

    return res.status(200).json({
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllPlaylists, getPlaylist };
