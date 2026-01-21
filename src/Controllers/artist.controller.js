import { Artist, Artist } from "@/Models/artist.model";

const getAllArtists = async (req, res) => {
  try {
    const Artists = await Artist.find();

    return res.status(200).json({
      message: "Artists fetched successfully",
      Artists,
    });
  } catch (error) {
    console.error("Error fetching artists:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getArtist = async (req, res) => {
  try {
    const { _id } = req.body();
    const Artist = await Artist.findById({ _id });

    return res.status(200).json({
      message: "Attist fetched successfully",
      Artist,
    });
  } catch (error) {
    console.error("Error fetching artists:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllArtists, getArtist };
