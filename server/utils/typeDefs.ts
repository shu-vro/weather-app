export const typeDefs = `#graphql
"""
Represents the forecast weather data for a specific location.
"""
type WeatherForecastData {
    """
    The geographical location of the weather data.
    """
    location: Location
    """
    The current weather conditions at the specified location.
    """
    current: Current # Day
    """
    The forecast for the upcoming days at the specified location.
    """
    forecast: Forecast
}

"""
Represents the history weather data for a specific location.
"""
type WeatherHistoryData {
    """
    The geographical location of the weather data.
    """
    location: Location
    """
    The forecast for the upcoming days at the specified location.
    """
    forecast: Forecast
}

"""
Contains information about the geographical location.
"""
type Location {
    """
    The name of the location.
    """
    name: String
    """
    The region where the location is located.
    """
    region: String
    """
    The country where the location is located.
    """
    country: String
    """
    The latitude of the location.
    """
    lat: Float
    """
    The longitude of the location.
    """
    lon: Float
    """
    The timezone identifier for the location.
    """
    tz_id: String
    """
    The local time at the location in epoch format.
    """
    localtime_epoch: Int
    """
    The local time at the location in a human-readable format.
    """
    localtime: String
}

"""
Provides the current weather conditions at a specific location.
"""
type Current {
    """
    The last time the weather data was updated in epoch format.
    """
    last_updated_epoch: Int
    """
    The last time the weather data was updated in a human-readable format.
    """
    last_updated: String
    """
    The current temperature in Celsius.
    """
    temp_c: Float
    """
    The current temperature in Fahrenheit.
    """
    temp_f: Float
    """
    Indicates whether it is day (1) or night (0).
    """
    is_day: Int
    """
    The current weather condition.
    """
    condition: Condition
    """
    The current wind speed in miles per hour.
    """
    wind_mph: Float
    """
    The current wind speed in kilometers per hour.
    """
    wind_kph: Float
    """
    The current wind direction in degrees.
    """
    wind_degree: Int
    """
    The current wind direction in cardinal points.
    """
    wind_dir: String
    """
    The current atmospheric pressure in millibars.
    """
    pressure_mb: Float
    """
    The current atmospheric pressure in inches of mercury.
    """
    pressure_in: Float
    """
    The current precipitation amount in millimeters.
    """
    precip_mm: Float
    """
    The current precipitation amount in inches.
    """
    precip_in: Float
    """
    The current snowfall amount in centimeters.
    """
    snow_cm: Float
    """
    The current humidity percentage.
    """
    humidity: Int
    """
    The current cloud cover percentage.
    """
    cloud: Int
    """
    The current "feels like" temperature in Celsius.
    """
    feelslike_c: Float
    """
    The current "feels like" temperature in Fahrenheit.
    """
    feelslike_f: Float
    """
    The current wind chill temperature in Celsius.
    """
    windchill_c: Float
    """
    The current wind chill temperature in Fahrenheit.
    """
    windchill_f: Float
    """
    The current heat index temperature in Celsius.
    """
    heatindex_c: Float
    """
    The current heat index temperature in Fahrenheit.
    """
    heatindex_f: Float
    """
    The current dew point temperature in Celsius.
    """
    dewpoint_c: Float
    """
    The current dew point temperature in Fahrenheit.
    """
    dewpoint_f: Float
    """
    Indicates whether it will rain (1) or not (0).
    """
    will_it_rain: Int
    """
    The chance of rain percentage.
    """
    chance_of_rain: Int
    """
    Indicates whether it will snow (1) or not (0).
    """
    will_it_snow: Int
    """
    The chance of snow percentage.
    """
    chance_of_snow: Int
    """
    The current visibility in kilometers.
    """
    vis_km: Float
    """
    The current visibility in miles.
    """
    vis_miles: Float
    """
    The current UV index.
    """
    uv: Float
    """
    The current wind gust speed in miles per hour.
    """
    gust_mph: Float
    """
    The current wind gust speed in kilometers per hour.
    """
    gust_kph: Float
}

"""
Describes the current weather condition.
"""
type Condition {
    """
    The textual description of the weather condition.
    """
    text: String
    """
    The icon representing the weather condition.
    """
    icon: String
    """
    The code representing the weather condition.
    """
    code: Int
}

"""
Contains the forecast data for the upcoming days.
"""
type Forecast {
    """
    A list of forecast data for each day.
    """
    forecastday: [ForecastDay]
}

"""
Represents the forecast data for a specific day.
"""
type ForecastDay {
    """
    The date of the forecast in a human-readable format.
    """
    date: String
    """
    The date of the forecast in epoch format.
    """
    date_epoch: Int
    """
    The daily weather data for the forecast day.
    """
    day: Day
    """
    The astronomical data for the forecast day.
    """
    astro: Astro
    """
    A list of hourly forecast data for the day.
    """
    hour: [Hour]
}

"""
Contains daily weather data for a specific day.
"""
type Day {
    """
    The maximum temperature for the day in Celsius.
    """
    maxtemp_c: Float
    """
    The maximum temperature for the day in Fahrenheit.
    """
    maxtemp_f: Float
    """
    The minimum temperature for the day in Celsius.
    """
    mintemp_c: Float
    """
    The minimum temperature for the day in Fahrenheit.
    """
    mintemp_f: Float
    """
    The average temperature for the day in Celsius.
    """
    avgtemp_c: Float
    """
    The average temperature for the day in Fahrenheit.
    """
    avgtemp_f: Float
    """
    The maximum wind speed for the day in miles per hour.
    """
    maxwind_mph: Float
    """
    The maximum wind speed for the day in kilometers per hour.
    """
    maxwind_kph: Float
    """
    The total precipitation amount for the day in millimeters.
    """
    totalprecip_mm: Float
    """
    The total precipitation amount for the day in inches.
    """
    totalprecip_in: Float
    """
    The total snowfall amount for the day in centimeters.
    """
    totalsnow_cm: Float
    """
    The average visibility for the day in kilometers.
    """
    avgvis_km: Float
    """
    The average visibility for the day in miles.
    """
    avgvis_miles: Float
    """
    The average humidity for the day in percentage.
    """
    avghumidity: Int
    """
    Indicates whether it will rain (1) or not (0) for the day.
    """
    daily_will_it_rain: Int
    """
    The chance of rain percentage for the day.
    """
    daily_chance_of_rain: Int
    """
    Indicates whether it will snow (1) or not (0) for the day.
    """
    daily_will_it_snow: Int
    """
    The chance of snow percentage for the day.
    """
    daily_chance_of_snow: Int
    """
    The weather condition for the day.
    """
    condition: Condition
    """
    The UV index for the day.
    """
    uv: Float
}

"""
Contains astronomical data for a specific day.
"""
type Astro {
    """
    The time of sunrise for the day.
    """
    sunrise: String
    """
    The time of sunset for the day.
    """
    sunset: String
    """
    The time of moonrise for the day.
    """
    moonrise: String
    """
    The time of moonset for the day.
    """
    moonset: String
    """
    The phase of the moon for the day.
    """
    moon_phase: String
    """
    The illumination of the moon for the day.
    """
    moon_illumination: Int
}

"""
Contains hourly weather data for a specific day.
"""
type Hour {
    """
    The time of the forecast in epoch format.
    """
    time_epoch: Int
    """
    The time of the forecast in a human-readable format.
    """
    time: String
    """
    The temperature for the hour in Celsius.
    """
    temp_c: Float
    """
    The temperature for the hour in Fahrenheit.
    """
    temp_f: Float
    """
    Indicates whether it is day (1) or night (0) for the hour.
    """
    is_day: Int
    """
    The weather condition for the hour.
    """
    condition: Condition
    """
    The wind speed for the hour in miles per hour.
    """
    wind_mph: Float
    """
    The wind speed for the hour in kilometers per hour.
    """
    wind_kph: Float
    """
    The wind direction in degrees.
    """
    wind_degree: Int
    """
    The wind direction in cardinal points.
    """
    wind_dir: String
    """
    The atmospheric pressure in millibars.
    """
    pressure_mb: Float
    """
    The atmospheric pressure in inches of mercury.
    """
    pressure_in: Float
    """
    The precipitation amount in millimeters.
    """
    precip_mm: Float
    """
    The precipitation amount in inches.
    """
    precip_in: Float
    """
    The snowfall amount in centimeters.
    """
    snow_cm: Float
    """
    The humidity percentage.
    """
    humidity: Int
    """
    The cloud cover percentage.
    """
    cloud: Int
    """
    The "feels like" temperature in Celsius.
    """
    feelslike_c: Float
    """
    The "feels like" temperature in Fahrenheit.
    """
    feelslike_f: Float
    """
    The wind chill temperature in Celsius.
    """
    windchill_c: Float
    """
    The wind chill temperature in Fahrenheit.
    """
    windchill_f: Float
    """
    The heat index temperature in Celsius.
    """
    heatindex_c: Float
    """
    The heat index temperature in Fahrenheit.
    """
    heatindex_f: Float
    """
    The dew point temperature in Celsius.
    """
    dewpoint_c: Float
    """
    The dew point temperature in Fahrenheit.
    """
    dewpoint_f: Float
    """
    Indicates whether it will rain (1) or not (0) for the hour.
    """
    will_it_rain: Int
    """
    The chance of rain percentage for the hour.
    """
    chance_of_rain: Int
    """
    Indicates whether it will snow (1) or not (0) for the hour.
    """
    will_it_snow: Int
    """
    The chance of snow percentage for the hour.
    """
    chance_of_snow: Int
    """
    The visibility in kilometers.
    """
    vis_km: Float
    """
    The visibility in miles.
    """
    vis_miles: Float
    """
    The wind gust speed in miles per hour.
    """
    gust_mph: Float
    """
    The wind gust speed in kilometers per hour.
    """
    gust_kph: Float
    """
    The UV index.
    """
    uv: Float
    """
    The shortwave radiation.
    """
    short_rad: Float
    """
    The diffuse radiation.
    """
    diff_rad: Float
}

type Query {
    getHistoryData(q: String!, day: String): WeatherHistoryData
    getForecastData(q: String!, day: String!): WeatherForecastData
}
`;
