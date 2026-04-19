export const sendJSONResponse = (res, status, payload) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = status;
    res.end(JSON.stringify(payload));
};