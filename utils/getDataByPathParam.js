export const getDataByPathParam = (sourceData, targetKey, targetValue) => {
    return sourceData.filter((item) => item[targetKey].toLocaleLowerCase() === targetValue.toLocaleLowerCase());
}