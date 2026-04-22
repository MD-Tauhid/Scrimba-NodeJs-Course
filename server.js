import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSONResponse } from "./utils/sendJSONResponse.js";
import { getDataByPathParam } from "./utils/getDataByPathParam.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
    const data = await getDataFromDB();

    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const queryObj = Object.fromEntries(urlObj.searchParams);

    if (urlObj.pathname === "/api" && req.method === "GET") {
        let filteredData = data;
        if (queryObj.country) {
            filteredData = filteredData.filter((item) => item.country.toLocaleLowerCase() === queryObj.country.toLocaleLowerCase());
        }
        if (queryObj.continent) {
            filteredData = filteredData.filter((item) => item.continent.toLocaleLowerCase() === queryObj.continent.toLocaleLowerCase());
        }
        if (queryObj.openToPublic) {
            filteredData = filteredData.filter((item) => item.is_open_to_public === queryObj.openToPublic);
        }
        sendJSONResponse(res, 200, filteredData);
    }
    else if (req.url.startsWith("/api/continent") && req.method === "GET") {
        const continent = req.url.split('/').pop();
        const filteredData = getDataByPathParam(data, "continent", continent);
        sendJSONResponse(res, 200, filteredData);
    }
    else if (req.url.startsWith("/api/country") && req.method === "GET") {
        const country = req.url.split('/').pop();
        const filteredData = getDataByPathParam(data, "country", country);
        sendJSONResponse(res, 200, filteredData);
    }
    else {
        sendJSONResponse(res, 404, { error: "Not Found", message: "The requested resource is not available" });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});