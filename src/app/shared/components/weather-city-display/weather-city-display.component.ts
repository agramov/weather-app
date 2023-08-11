import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { ICity, IWeatherGetResponse } from 'src/app/model/weather.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToastService } from 'src/app/services/toast-service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
    selector: 'app-weather-city-display',
    templateUrl: './weather-city-display.component.html',
    styleUrls: [ './weather-city-display.component.scss' ],
    encapsulation: ViewEncapsulation.None,
})
export class WeatherCityDisplayComponent implements OnChanges
{
    @Input()
    public city?: ICity;

    @Output()
    public removedFromFavorites = new EventEmitter<boolean>();

    public weatherData?: IWeatherGetResponse;

    public isSelectedCityFavourited = false;

    public active = 1;

    constructor(
        private readonly storageService: LocalStorageService,
        private readonly weatherService: WeatherService,
        private readonly toastService: ToastService,
    )
    {

    }

    ngOnChanges(changes: SimpleChanges): void
    {
        if (changes['city'].currentValue)
        {
            this.initialize(changes['city'].currentValue);
        }
    }

    private initialize(city: ICity)
    {
        const storageFetchResult = this.storageService.get(city.display);

        if (storageFetchResult.isSuccessful && storageFetchResult.payload)
        {
            this.isSelectedCityFavourited = !!storageFetchResult.payload.value;
        }
        else
        {
            this.isSelectedCityFavourited = false;
        }


        this.weatherService.getWeatherByLatLon(
            city.value.latitude,
            city.value.longitude,
            city.value.timezone,
        )
            .pipe()
            .subscribe((value) =>
            {
                this.weatherData = value.payload;
            });
    }

    public handleOnFavoriteChanged(isFavorited: boolean)
    {
        let response;

        if (isFavorited)
        {
            response = this.storageService.set(this.city?.display, this.city);
        }
        else
        {
            response = this.storageService.set(this.city?.display, false);
            this.removedFromFavorites.emit(true);
        }

        if (response.isSuccessful)
        {
            this.isSelectedCityFavourited = isFavorited;

            this.toastService.show(`${ isFavorited ? 'Saved to' : 'Removed from' } favorites!`,
                { classname: 'bg-success text-light', delay: 5000 });
        }
        else
        {
            this.toastService.show('Couldn\'t save to favorites... Please try again later',
                { isError: true, classname: 'bg-danger text-light', delay: 15000 });

            this.isSelectedCityFavourited = !isFavorited;
        }
    }
}
