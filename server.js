import axios from "axios";

export default async function handler(req, res) {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    const swiggyApiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    try {
        const response = await axios.get(swiggyApiUrl, {
            headers: { "User-Agent": "Mozilla/5.0" }, // Helps bypass API restrictions
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error fetching Swiggy data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
