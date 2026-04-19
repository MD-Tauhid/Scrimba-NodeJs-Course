import { data } from "../data/data.js";

export async function getDataFromDB() {
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(data);
    //     }, 1000);
    // });
    return data;
}