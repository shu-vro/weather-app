import { ScrollShadow } from "@nextui-org/react";
import { CustomCard, ForecastCard } from "./HelperComponents";
import { useRequestData } from "./RequestDataContext";
// import { gql, useQuery } from "@apollo/client";

// const GET_FORECAST = gql`
//     query BasicForecast($q: String!, $day: String!) {
//         getForecastData(q: $q, day: $day) {
//             forecast {
//                 forecastday {
//                     date
//                     day {
//                         avgtemp_c
//                         mintemp_c
//                         condition {
//                             icon
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `;

export default function ForecastComponent() {
    const { data, loading, error } = useRequestData();
    if (loading) return "loading...";
    if (error) return `error: ${error}`;
    const forecastData: IBasicForecastData[] =
        data?.getForecastData?.forecast?.forecastday;
    return (
        <CustomCard name="forecast" loading={loading}>
            <h1 className="font-bold text-3xl my-3">Forecast</h1>
            <ScrollShadow className="grid grid-cols-1 gap-4 h-[400px] overflow-y-auto">
                {forecastData.map(forecast => (
                    <ForecastCard key={forecast.date} forecast={forecast} />
                ))}
            </ScrollShadow>
        </CustomCard>
    );
}
