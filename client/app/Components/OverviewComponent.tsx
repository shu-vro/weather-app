import React from "react";
import { CustomCard } from "./HelperComponents";
import { Tab, Tabs } from "@nextui-org/react";
import Chart from "./Chart";
import { gql, useQuery } from "@apollo/client";
import { useRequestData } from "./RequestDataContext";
import Loading from "./Loading";

// const OVERVIEW_DATA = gql`
//     fragment ForecastFragment on Forecast {
//         forecastday {
//             hour {
//                 chance_of_rain
//                 humidity
//                 uv
//                 pressure_mb
//                 time_epoch
//             }
//         }
//     }

//     query HourlyInformation($q: String!, $day: String!) {
//         getHistoryData(q: $q, day: $day) {
//             forecast {
//                 ...ForecastFragment
//             }
//         }
//         getForecastData(q: $q, day: $day) {
//             forecast {
//                 ...ForecastFragment
//             }
//         }
//     }
// `;

export default function OverviewComponent() {
    // const { loading, data, error } = useQuery(OVERVIEW_DATA, {
    //     variables: {
    //         q: "Sherpur",
    //         day: "2024-04-05",
    //     },
    // });
    const { data, loading, error } = useRequestData();
    if (loading) return <Loading name="overview" />;
    if (error) return `error: ${error}`;

    const {
        getHistoryData,
        getForecastData,
    }: {
        getHistoryData: IOverviewDataGeneral;
        getForecastData: IOverviewDataGeneral;
    } = data;

    let holder: IOverviewDataGeneral["forecast"]["forecastday"][0]["hour"] = [];

    // let forecast_data_hour = getForecastData.forecast.forecastday;
    let x = getHistoryData.forecast.forecastday;

    for (let i = 0; i < x.length; i++) {
        const day = x[i];
        holder = holder.concat(day.hour);
    }
    let y = getForecastData.forecast.forecastday;

    for (let i = 0; i < y.length; i++) {
        const day = y[i];
        holder = holder.concat(day.hour);
    }

    return (
        <CustomCard name="overview" className="p-4">
            <div className="">
                <h1 className="text-3xl font-bold">Overview</h1>
                <Tabs
                    color="primary"
                    radius="full"
                    classNames={{
                        base: "float-right transform translate-y-[-30px]",
                        tabList: "bg-[#1e1f24]",
                        panel: "mt-4",
                    }}>
                    <Tab
                        title="Humidity"
                        key="Humidity"
                        className="rounded-full">
                        <Chart
                            className="h-24"
                            dataPoints={holder.map(hour => ({
                                x: new Date(hour.time_epoch * 1000),
                                y: hour.humidity,
                            }))}
                        />
                    </Tab>
                    <Tab
                        title="UV Index"
                        key="UV Index"
                        className="rounded-full">
                        <Chart
                            className="h-24"
                            dataPoints={holder.map(hour => {
                                const parsedTime = new Date(
                                    hour.time_epoch * 1000
                                );
                                return {
                                    x: parsedTime,
                                    y: hour.uv,
                                };
                            })}
                            suffix=" Index"
                        />
                    </Tab>
                    <Tab
                        title="Rainfall"
                        key="Rainfall"
                        className="rounded-full">
                        <Chart
                            className="h-24"
                            dataPoints={holder.map(hour => {
                                const parsedTime = new Date(
                                    hour.time_epoch * 1000
                                );
                                const now = new Date();
                                if (now.getHours() === parsedTime.getHours()) {
                                    return {
                                        x: parsedTime,
                                        y: hour.chance_of_rain,
                                        markerBorderColor: "white",
                                        markerColor: "black",
                                        markerType: "circle",
                                    };
                                }
                                return {
                                    x: parsedTime,
                                    y: hour.chance_of_rain,
                                };
                            })}
                        />
                    </Tab>
                    <Tab
                        title="Pressure"
                        key="Pressure"
                        className="rounded-full">
                        <Chart
                            className="h-24"
                            dataPoints={holder.map(hour => ({
                                x: new Date(hour.time_epoch * 1000),
                                y: hour.pressure_mb,
                            }))}
                            suffix=" Millibars"
                        />
                    </Tab>
                </Tabs>
            </div>
        </CustomCard>
    );
}
