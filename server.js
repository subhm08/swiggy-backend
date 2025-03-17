const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors()); // Allow all origins

app.get("/api/swiggy", async (req, res) => {
    const { lat, lng } = req.query;
    const swiggyApiUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    try {
        const response = await axios.get(swiggyApiUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0", // Bypass API blocks
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching Swiggy data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
