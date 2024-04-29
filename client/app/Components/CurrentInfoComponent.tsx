import React from "react";
import { CustomCard, SmallCard } from "./HelperComponents";
import { Divider, Image } from "@nextui-org/react";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { IoTimerOutline, IoWaterOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { BsThermometerHalf, BsWind } from "react-icons/bs";
import { useRequestData } from "./RequestDataContext";
import Loading from "./Loading";
import { useCelsiusOrFahrenheit } from "./CelsiusOrFahrenheitContext";
// import { gql, useQuery } from "@apollo/client";

// const GET_FORECAST = gql`
//     query CurrentInformation($q: String!, $day: String!) {
//         getForecastData(q: $q, day: $day) {
//             current {
//                 temp_c
//                 condition {
//                     icon
//                     text
//                 }
//                 last_updated_epoch
//                 humidity
//                 wind_kph
//             }
//             location {
//                 name
//             }
//         }
//     }
// `;

export default function CurrentInfoComponent() {
    const { data, loading, error } = useRequestData();
    const { celsius } = useCelsiusOrFahrenheit();
    if (loading) return <Loading name="hourly" count={3} />;
    if (error) return `error: ${error}`;
    const currentData: ICurrentInfo = data?.getForecastData;
    const last_updated = new Date(
        currentData.current.last_updated_epoch * 1000
    );

    return (
        <CustomCard
            name="hourly"
            className="flex flex-row items-center justify-between min-w-[600px]">
            <div className="w-2/5">
                <Image
                    src={currentData.current.condition.icon}
                    alt={currentData.current.condition.text}
                    className="w-44 h-44"
                />
                <div className="flex flex-row items-center text-lg mb-4">
                    <TiWeatherWindyCloudy className="mr-1" />
                    <span className="font-bold">
                        {currentData.current.condition.text}
                    </span>
                </div>
                <Divider />
                <div className="mt-4">
                    <div className="flex flex-row items-center text-lg">
                        <IoTimerOutline className="mr-1" />
                        <span>
                            {isToday(
                                currentData.current.last_updated_epoch * 1000
                            )}
                        </span>
                        <span className="text-gray-400">
                            ,{" "}
                            {last_updated.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </span>
                    </div>
                    <div className="flex flex-row items-center text-lg">
                        <CiLocationOn className="mr-1" />
                        <span>{currentData.location.name}</span>
                    </div>
                </div>
            </div>
            <Divider orientation="vertical" />
            <div className="w-2/5">
                <SmallCard
                    stats={
                        <div className="flex flex-row">
                            <BsThermometerHalf className="mr-4" />{" "}
                            <span>
                                {celsius
                                    ? currentData.current.temp_c
                                    : currentData.current.temp_f}
                            </span>
                            <small>
                                &deg;
                                <span className="align-baseline text-medium">
                                    {celsius ? "C" : "F"}
                                </span>
                            </small>
                        </div>
                    }
                    label="Temperature"
                />

                <Divider />
                <SmallCard
                    stats={
                        <div className="flex flex-row">
                            <IoWaterOutline className="mr-4" />
                            <div>
                                <span>{currentData.current.humidity}</span>
                                <span className="align-baseline text-lg">
                                    %
                                </span>
                            </div>
                        </div>
                    }
                    label="Humidity"
                />
                <Divider />
                <SmallCard
                    stats={
                        <div className="flex flex-row">
                            <BsWind className="transform rotate-180 mr-4" />{" "}
                            <div>
                                <span>{currentData.current.wind_kph}</span>
                                <small className="align-baseline text-lg">
                                    &nbsp;km/h
                                </small>
                            </div>
                        </div>
                    }
                    label="Wind Speed"
                />
            </div>
        </CustomCard>
    );
}

function isToday(timestamp: number) {
    const date = new Date(timestamp);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    date.setHours(0, 0, 0, 0);

    if (date.getTime() === today.getTime()) {
        return "today";
    } else {
        return date.toLocaleDateString("default", {
            day: "numeric",
            month: "short",
        });
    }
}
