import { Component, Input } from '@angular/core';
import { getWeatherImagePathByCode } from 'src/app/model/weather.model';

@Component({
    selector: 'app-weather-image',
    templateUrl: './weather-image.component.html',
    styleUrls: [ './weather-image.component.scss' ],
})
export class WeatherImageComponent
{
    @Input()
    public set weatherCode(code: number)
    {
        this.weatherImagePath = getWeatherImagePathByCode(code);
    }

    public weatherImagePath = '';
}
