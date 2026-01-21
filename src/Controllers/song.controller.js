const { Song } = require("@/Models/song.model");

async function addSong(req, res) {
  const { title, coverImg, link, artists } = req.body();
  if (!title || !coverImg || !link || !artists) {
    return res.json({ error: "all fields are required" });
  }
  const newSong = new Song({
    title,
    coverImg,
    link,
    artists,
  });

  try {
    await newSong.save(); // Save the new song to the database
    console.log("Song added successfully!");
  } catch (error) {
    console.error("Error adding song:", error);
  }
}

const getSongs = async (req, res) => {
  try {
    const query = req.body();
    const song = Song.find(query);
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    return res.status(200).json({ massage: "song found", song });
  } catch {
    return res.status(500).json({ error: "error while getting song" });
  }
};

const getSong = async (req, res) => {
  try {
    const { id } = req.body();
    const song = Song.findById({ id });
    if (!song) {
      return res.status(404).json({ error: "Song not found" });
    }
    return res.status(200).json({ massage: "song found", song });
  } catch {
    return res.status(500).json({ error: "error while getting song" });
  }
};

export { addSong, getSongs, getSong };
