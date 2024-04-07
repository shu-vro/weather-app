import React from "react";
import { CustomCard, HourlyWeather } from "./HelperComponents";
import { useRequestData } from "./RequestDataContext";

// const GET_HOURLY_DATA = gql`
//     query HourlyInformation($q: String!, $day: String!) {
//         getForecastData(q: $q, day: $day) {
//             forecast {
//                 forecastday {
//                     hour {
//                         time_epoch
//                         temp_c
//                         condition {
//                             icon
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `;

export default function HourlyDataComponent() {
    const { data, loading, error } = useRequestData();
    // const { data, loading, error } = useRequestData();
    if (loading) return "loading...";
    if (error) return `error: ${error}`;

    const hourlyData: IHourlyData[] =
        data.getForecastData.forecast.forecastday[0].hour;
    return (
        <CustomCard name="map" loading={false}>
            <div className="hourly-data flex overflow-x-auto gap-2 w-full">
                {hourlyData.map(hour => (
                    <HourlyWeather key={hour.time_epoch} hourData={hour} />
                ))}
            </div>
        </CustomCard>
    );
}
