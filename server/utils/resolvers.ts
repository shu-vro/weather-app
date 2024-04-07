import Redis from "redis";
import { getPreviousDate, weatherAPI } from "./req.ts";
// import util from "util";

const redis = await Redis.createClient({
    url: "redis://redis:6379",
})
    .on("error", err => {
        console.log("Redis Client Error", err);
        process.exit(1);
    })
    .connect();

export const resolvers = {
    Query: {
        async getHistoryData(_: any, args: { q: string; day: string }) {
            const { q, day } = args;
            const forecastKey = `history:${q.toUpperCase()}:${getPreviousDate(
                day
            )}`;
            const check = await redis.exists(forecastKey);
            if (check && day) {
                console.log("CACHE HIT");
                const result = await redis.json.get(forecastKey);
                return result;
            } else {
                console.log("CACHE MISS");

                const {
                    data: data,
                    error,
                }: { data: WeatherData | null; error: any } = await weatherAPI(
                    q,
                    day
                );

                if (data !== null) {
                    for (let i = 0; i < data.forecast.forecastday.length; i++) {
                        let data_new = structuredClone(data);
                        const forecast = data.forecast.forecastday[i];
                        data_new.forecast.forecastday = [forecast];
                        const forecastKey = `history:${q.toUpperCase()}:${
                            forecast.date
                        }`;

                        // store 6 days data and return `dt` day
                        const check = await redis.exists(forecastKey);
                        if (!check) {
                            await redis_json_set(forecastKey, data_new, -1);
                        }

                        if (i === data.forecast.forecastday.length - 1) {
                            await redis_json_set(forecastKey, data, -1);
                            return data;
                        }
                    }
                } else {
                    console.log("[ ERROR ]: " + error);
                }
                return data;
            }
        },
        async getForecastData(_: any, args: { q: string; day: string }) {
            const { q, day } = args;
            const forecastKey_1 = `forecast:${q.toUpperCase()}:${day}`;
            const check_1 = await redis.exists(forecastKey_1);
            if (check_1 && day) {
                console.log("CACHE HIT");
                const result = await redis.json.get(forecastKey_1);
                return result;
            } else {
                console.log("CACHE MISS");

                // get today's forecast
                const {
                    data,
                    error,
                }: { data: WeatherData | null; error: any } = await weatherAPI(
                    q,
                    day,
                    {},
                    "forecast"
                );

                await redis_json_set(forecastKey_1, data);

                return data;
            }
        },
    },
};

async function redis_json_set(
    key: string,
    value: any,
    expire: number = 60 * 60 * 3
) {
    await redis.json.set(key, "$", value as any);
    if (expire > 0) {
        await redis.expire(key, expire, "NX");
    }
    return "Ok";
}
