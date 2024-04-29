import axios from "axios";
// import { inspect } from "util";

function getPrevious_6_Date(dateString: string) {
    let date = new Date(dateString);

    date.setDate(date.getDate() - 5);

    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function getPreviousDate(dateString: string) {
    let date = new Date(dateString);

    date.setDate(date.getDate() - 1);

    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export async function weatherAPI(
    q: string,
    dt: string,
    additional: { [key: string]: any } = {},
    endpoint: string | undefined | null = "history",
    key = process.env.WEATHER_API_KEY || null
) {
    if (!key) {
        return {
            data: null,
            error: "API key is required",
        };
    }
    if (!q) {
        return {
            data: null,
            error: "Parameter `q` is required",
        };
    }
    if (!endpoint) {
        endpoint = "history";
    }
    if (endpoint === "history") {
        dt = getPreviousDate(dt);
        let end_dt = getPrevious_6_Date(dt);
        const instance = axios.create({
            baseURL: `http://api.weatherapi.com/v1/`,
            timeout: 10000,
            params: {
                key,
                q,
                dt: end_dt,
                end_dt: dt,
                ...additional,
            },
        });
        try {
            const data = await instance.get(`${endpoint}.json`);
            // console.log(
            //     inspect(data, { depth: Infinity }),
            //     instance.getUri(),
            //     dt,
            //     end_dt
            // );
            return { data: data.data as WeatherData, error: null };
        } catch (error: any) {
            return {
                data: null,
                error: error.message,
            };
        }
    }
    //  if (endpoint === "forecast")
    else {
        //  💩   repeat. We will figure it out later.
        const instance = axios.create({
            baseURL: `http://api.weatherapi.com/v1/`,
            timeout: 10000,
            params: {
                key,
                q,
                days: 7,
                ...additional,
            },
        });
        try {
            const data = await instance.get(`${endpoint}.json`);
            return { data: data.data as WeatherData, error: null };
        } catch (error: any) {
            return {
                data: null,
                error: error.message,
            };
        }
    }
}
