/* eslint-disable @typescript-eslint/naming-convention */
export interface ICitySearchGetApiResponse
{
    results: ICitySearchResult[];
    [k: string]: any;
}

export interface ICitySearchResult
{
    [k: string]: any;
    name: string;
    country_code: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
}


export interface IWeatherGetResponse
{
    [k: string]: any;
    daily: {
        // unix timestamp
        time: number[];
        // 1-6
        weathercode: number[];

        temperature_2m_min: number[];

        temperature_2m_max: number[];

        windspeed_10m_max: number[];

        precipitation_sum: number[];
    };

    daily_units: {
        time: string;

        weathercode: string;

        temperature_2m_min: string;

        temperature_2m_max: string;

        windspeed_10m_max: string;

        precipitation_sum: string;
    };

    current_weather: {
        temperature: number;
        windspeed: number;
        winddirection: number;
        weathercode: number;
        is_day: number;
        time: number;
    };
}

export interface ICity
{
    display: string;
    value: ICitySearchResult;
}

export function getWeatherImagePathByCode(weatherCode: number): string
{
    switch (weatherCode)
    {
        // sunny
        case 0:
        case 1:
            return 'sunny';

        // cloudy
        case 2:
            return 'overcast';
        case 3:
        case 45:
        case 48:
            return 'cloudy';

        // rain
        case 51:
        case 53:
        case 55:
        case 56:
        case 57:
        case 61:
        case 63:
        case 65:
        case 66:
        case 67:
        case 80:
        case 81:
        case 82:
            return 'rainy';
        // thunderstorm
        case 95:
        case 96:
        case 99:
            return 'thunderstorm';
        // snow
        case 71:
        case 73:
        case 75:
        case 77:
        case 85:
        case 86:
            return 'snowy';

        default:
            return 'sunny';
    }
}
