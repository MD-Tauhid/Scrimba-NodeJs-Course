export const getDataByQueryParams = (data, queryObj) => {
    const { country, continent, is_open_to_public } = queryObj;

    if (country) {
        data = data.filter((item) => item.country.toLocaleLowerCase() === country.toLocaleLowerCase());
    }
    if (continent) {
        data = data.filter((item) => item.continent.toLocaleLowerCase() === continent.toLocaleLowerCase());
    }
    if (is_open_to_public) {
        data = data.filter((item) => item.is_open_to_public === JSON.parse(is_open_to_public));
    }
    return data;
};