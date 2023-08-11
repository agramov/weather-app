import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of } from 'rxjs';

import { IActionResponse } from '../model/app.model';
import { ICitySearchGetApiResponse, IWeatherGetResponse } from '../model/weather.model';

@Injectable({
    providedIn: 'root',
})
export class WeatherService
{
    constructor(
        private readonly httpClient: HttpClient,
    ) {}

    public getWeatherByLatLon(lat: number, lon: number, timezone: string): Observable<IActionResponse<IWeatherGetResponse | any>>
    {
        return this.httpClient.get<ICitySearchGetApiResponse>('http://localhost:3339/getWeatherByLatLon', {
            params: {
                lat: lat,
                lon: lon,
                timezone: timezone,
            },
        })
            .pipe(

                map((response) =>
                    ({
                        isSuccessful: true,
                        payload: response,
                    }),
                ),

                catchError(errResponse =>
                    (of({
                        isSuccessful: false,
                        payload: errResponse,
                    })),
                ),
            );
    }

    public searchForCity(cityName: string): Observable<IActionResponse<ICitySearchGetApiResponse | any>>
    {
        return this.httpClient.get('http://localhost:3339/getCoordsByCityName', {
            params: {
                name: cityName,
            },
        })
            .pipe(

                map((response) =>
                    ({
                        isSuccessful: true,
                        payload: response,
                    }),
                ),

                catchError(errResponse =>
                    (of({
                        isSuccessful: false,
                        payload: errResponse,
                    })),
                ),
            );
    }
}
