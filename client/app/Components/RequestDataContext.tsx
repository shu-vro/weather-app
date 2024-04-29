"use client";

import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import axios from "axios";
import { createContext, useContext, useEffect } from "react";

const WEATHER_DATA = gql`
    query CombinedForecast($q: String!, $day: String!) {
        getHistoryData(q: $q, day: $day) {
            forecast {
                ...ForecastFragment
            }
        }
        getForecastData(q: $q, day: $day) {
            forecast {
                ...ForecastFragment
            }
            current {
                temp_c
                temp_f
                condition {
                    icon
                    text
                }
                last_updated_epoch
                humidity
                wind_kph
            }
            location {
                name
            }
        }
    }
    fragment ForecastFragment on Forecast {
        forecastday {
            date
            day {
                avgtemp_c
                mintemp_c
                avgtemp_f
                mintemp_f
                condition {
                    icon
                }
            }
            hour {
                time_epoch
                temp_c
                temp_f
                humidity
                uv
                pressure_mb
                chance_of_rain
                condition {
                    icon
                }
            }
        }
    }
`;

const Context = createContext({} as ContextType);

type ContextType = {
    loading: boolean;
    error?: ApolloError;
    data: any;
};

export default function RequestDataContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [getData, { data, error, loading }] = useLazyQuery(WEATHER_DATA, {
        variables: {
            q: "Sherpur",
            day: formatDate(),
        },
    });
    useEffect(() => {
        (async () => {
            try {
                if (!localStorage.city) {
                    const data2 = await axios.get("https://ipinfo.io/");
                    localStorage.city = data2.data.city;
                }
                getData({
                    variables: {
                        q: localStorage.city,
                    },
                });
            } catch (error) {
                console.log(error);
            }
        })();
    }, [getData]);

    return (
        <Context.Provider value={{ data, error, loading: loading || !data }}>
            {children}
        </Context.Provider>
    );
}

export function useRequestData() {
    return useContext(Context);
}

function formatDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
