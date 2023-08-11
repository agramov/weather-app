import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

import { Observable, ReplaySubject, Subject, merge, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap, filter, map, takeUntil } from 'rxjs/operators';

import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

import { ICity, ICitySearchGetApiResponse, ICitySearchResult, IWeatherGetResponse } from 'src/app/model/weather.model';
import { WeatherService } from 'src/app/services/weather.service';
import { calcCityDisplayFromCitySearchResult } from 'src/app/app.component.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: [ './search.component.scss' ],
})
export class SearchComponent
{
    @Output()
    public citySelected = new EventEmitter<ICity>();

    @ViewChild('instance', { static: true })
    public instance?: NgbTypeahead;

    public focus$ = new Subject<string>();

    private blur$ = new Subject<string>();

    public model: any;

    public isSearchInProgress = false;

    public hasSearchFailed = false;


    private destroyed$ = new ReplaySubject<void>(1);

    public active = 1;

    public isSelectedCityFavourited = false;

    public result?: IWeatherGetResponse;

    public favCities: { key: string; value: any }[] = [];

    constructor(
        private readonly weatherService: WeatherService,
        private readonly elRef: ElementRef,
    )
    {
        this.blur$
            .pipe(
                takeUntil(this.destroyed$),
            )
            .subscribe(() =>
            {
                this.isSearchInProgress = false;
            });
    }

    public handleOnBlur(event: any)
    {
        this.blur$.next(event.target.value);
    }

    public handleOnFocus(event: any)
    {
        this.focus$.next(event.target.value);
    }

    public handleItemSelected(evt: any)
    {
        const item = <{ display: string; value: ICitySearchResult }> evt.item;

        this.model = '';
        this.isSearchInProgress = false;
        this.elRef.nativeElement.querySelector('input').blur();

        this.citySelected.emit(item);

        setTimeout(() =>
        {
            this.model = '';
        });
    }

    public searchForCity = (text$: Observable<string>,
        calcCityDisplayFn: (entry: ICitySearchResult) => string = calcCityDisplayFromCitySearchResult) =>
    {
        const debouncedText$ = this.getAutocompleteTextObservable(text$);

        const inputFocus$ = this.focus$;

        return merge(debouncedText$, inputFocus$)
            .pipe(
                filter((value) => value.length > 2),
                tap(() =>
                {
                    this.hasSearchFailed = false;
                    this.isSearchInProgress = true;
                }),
                switchMap((term) =>
                    this.weatherService.searchForCity(term)
                        .pipe(
                            tap((actionResponse) =>
                            {
                                if (!actionResponse.isSuccessful)
                                {
                                    this.hasSearchFailed = true;
                                    this.isSearchInProgress = false;
                                }
                            }),
                            filter((actionResponse) => actionResponse.isSuccessful),
                            map(actionResponse =>
                                (<ICitySearchGetApiResponse>actionResponse.payload).results.map(result =>
                                    ({
                                        display: calcCityDisplayFn(result),
                                        value: result,
                                    })),
                            ),

                            catchError(() =>
                            {
                                this.hasSearchFailed = true;
                                this.isSearchInProgress = false;

                                return of([]);
                            }),
                        ),
                ),
            );
    };

    public formatter = (x: { display: string }) => x.display;

    private getAutocompleteTextObservable(observble: Observable<any>): Observable<any>
    {
        return observble.pipe(
            debounceTime(500),
            distinctUntilChanged(),
        );
    }

}
