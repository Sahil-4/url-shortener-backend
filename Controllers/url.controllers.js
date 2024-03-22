import URL from "../Models/url.model.js";

export const getAllURLs = async (req, res) => {
  try {
    const userId = req.userId;

    const urls = await URL.find({ user_id: userId });

    return res.status(200).json({
      success: true,
      message: "urls fetched successfully",
      data: urls,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "failed to fetch urls" });
  }
};

export const createNewShortURL = async (req, res) => {
  try {
    const userId = req.userId;
    const { original_url } = req.body;

    if (!original_url) return res.status(400).send({ success: false, message: "original_url is required" });

    const newURL = await URL.create({
      original_url,
      short_url: original_url,
      user_id: userId,
    });

    return res.status(200).json({
      success: true,
      message: "url created successfully",
      data: newURL,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "failed to create new url" });
  }
};

export const handleRedirect = async (req, res) => {
  try {
    const hash = req.params.hash;
    const short_url = `${process.env.DOMAIN}/${hash}`;

    const url = await URL.findOne({ short_url });

    if (!url || !url.original_url) return res.status(404).json({ success: false, message: "url not found" });

    url.increamentHits();

    return res.status(301).redirect(url.original_url);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export const deleteURL = async (req, res) => {
  try {
    const userId = req.userId;
    const { short_url } = req.body;

    if (!short_url) return res.status(400).send({ success: false, message: "short_url is required" });

    const url = await URL.findOne({ short_url });

    if (!url) return res.status(404).json({ success: false, message: "url not found" });

    if (url.user_id != userId) return res.status(401).json({ success: false, message: "unauthorised request" });

    await URL.findByIdAndDelete(url._id);

    return res
      .status(200)
      .json({ success: true, message: "successfully deleted the url" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "failed to delete url" });
  }
};
