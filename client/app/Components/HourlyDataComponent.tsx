import React from "react";
import { CustomCard, HourlyWeather } from "./HelperComponents";
import { useRequestData } from "./RequestDataContext";
import Loading from "./Loading";

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
    if (loading) return <Loading name="map" count={7} vertical={true} />;
    if (error) return `error: ${error}`;

    const hourlyData: IHourlyData[] =
        data.getForecastData.forecast.forecastday[0].hour;
    return (
        <CustomCard name="map">
            <div className="hourly-data flex overflow-x-auto gap-2 w-full">
                {hourlyData.map(hour => (
                    <HourlyWeather key={hour.time_epoch} hourData={hour} />
                ))}
            </div>
        </CustomCard>
    );
}
