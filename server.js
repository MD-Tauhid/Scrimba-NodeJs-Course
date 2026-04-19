import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utils/sendJSONResponse.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
    const data = await getDataFromDB();

    if (req.url === "/api" && req.method === "GET") {
        sendJSONResponse(res, 200, data);
    }
    else if (req.url.startsWith("/api/continent/") && req.method === "GET") {
        const continent = req.url.split('/').pop();
        const filteredData = data.filter((item) => item.continent.toLocaleLowerCase() === continent.toLocaleLowerCase());
        sendJSONResponse(res, 200, filteredData);
    }
    else {
        sendJSONResponse(res, 404, { error: "Not Found", message: "The requested resource is not available" });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});