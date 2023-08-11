import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FavoriteWidgetComponent } from './shared/components/favorite-widget/favorite-widget.component';
import { ToastsComponent } from './shared/components/toasts/toasts.component';
import { WeatherImageComponent } from './shared/components/weather-image/weather-image.component';
import { TimestampToForamattedTimePipe } from './shared/pipes/timestamp-to-foramatted-time.pipe';
import { WeatherCityDisplayComponent } from './shared/components/weather-city-display/weather-city-display.component';
import { WindDirectionToDisplayPipe } from './shared/pipes/wind-direction-to-display.pipe';
import { SearchComponent } from './shared/components/search/search.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        FavoriteWidgetComponent,
        ToastsComponent,
        WeatherImageComponent,
        TimestampToForamattedTimePipe,
        WeatherCityDisplayComponent,
        WindDirectionToDisplayPipe,
        SearchComponent,
    ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
