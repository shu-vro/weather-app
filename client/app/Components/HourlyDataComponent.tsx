import React from "react";
import { CustomCard, HourlyWeather } from "./HelperComponents";
import { useRequestData } from "./RequestDataContext";
import Loading from "./Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

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

    const hour_number = new Date().getHours();
    return (
        <CustomCard name="map">
            <div>
                <Swiper
                    freeMode
                    spaceBetween={12}
                    modules={[FreeMode, Mousewheel]}
                    mousewheel
                    roundLengths
                    width={112}
                    onInit={swiper => {
                        swiper.slideTo(hour_number);
                    }}>
                    {hourlyData.map((hour, i) => (
                        <SwiperSlide
                            key={hour.time_epoch}
                            // className="!w-fit"
                        >
                            <HourlyWeather
                                hourData={hour}
                                active={hour_number === i}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* <div className="hourly-data flex overflow-x-auto gap-2 w-full">
                {hourlyData.map(hour => (
                    <HourlyWeather key={hour.time_epoch} hourData={hour} />
                ))}
            </div> */}
        </CustomCard>
    );
}
