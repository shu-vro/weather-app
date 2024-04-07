declare interface IBasicForecastData {
    date: string;
    day: {
        avgtemp_c: number;
        mintemp_c: number;
        condition: {
            icon: string;
        };
    };
}

declare interface ICurrentInfo {
    current: {
        temp_c: number;
        condition: {
            icon: string;
            text: string;
        };
        last_updated_epoch: number;
        humidity: number;
        wind_kph: number;
    };
    location: {
        name: string;
    };
}

declare interface IHourlyData {
    time_epoch: number;
    temp_c: number;
    condition: {
        icon: string;
    };
}

declare interface IOverviewDataGeneral {
    forecast: {
        forecastday: {
            hour: {
                chance_of_rain: number;
                pressure_mb: number;
                time_epoch: number;
                humidity: number;
                uv: number;
            }[];
        }[];
    };
}
