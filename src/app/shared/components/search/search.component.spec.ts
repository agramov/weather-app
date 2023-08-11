/* eslint-disable @typescript-eslint/dot-notation */
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';

import { NEVER, Observable, Subject, of, throwError } from 'rxjs';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { WeatherService } from 'src/app/services/weather.service';
import { IActionResponse } from 'src/app/model/app.model';
import { ICitySearchGetApiResponse } from 'src/app/model/weather.model';
import { SearchComponent } from './search.component';

describe('search.component.ts', () =>
{
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    let weatherServiceStub: WeatherService;

    const beforeEachFn = () =>
    {
        weatherServiceStub = <any> {
            searchForCity: () => of(NEVER),
        };

        TestBed.configureTestingModule({
            imports: [
                NgbModule,
                FormsModule,
            ],
            declarations: [ SearchComponent ],
            providers: [
                { provide: WeatherService, useValue: weatherServiceStub },
            ],
        });
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
    };

    describe('searchForCity()', () =>
    {
        let text$ = new Subject<string>();

        beforeEach(() =>
        {
            text$ = new Subject<string>();
            beforeEachFn();
        });

        it('should create', () =>
        {
            expect(component).toBeTruthy();
        });

        it('should trigger search on text input /w length > 2', fakeAsync(() =>
        {
            spyOn(component['weatherService'], 'searchForCity').and.returnValue(NEVER);

            component.searchForCity(text$)
                .subscribe();

            text$.next('test 123');

            tick(600);

            expect(component.isSearchInProgress).toEqual(true);
            expect(component.hasSearchFailed).toEqual(false);
            expect(component['weatherService'].searchForCity).toHaveBeenCalledWith('test 123');
        }));

        it('should trigger search on focus /w text length > 2', fakeAsync(() =>
        {
            spyOn(component['weatherService'], 'searchForCity').and.returnValue(NEVER);

            component.searchForCity(text$)
                .subscribe();

            component.focus$.next('London, London, UK');

            tick(600);

            expect(component.isSearchInProgress).toEqual(true);
            expect(component.hasSearchFailed).toEqual(false);
            expect(component['weatherService'].searchForCity).toHaveBeenCalledWith('London, London, UK');
        }));

        it('should NOT trigger search on focus /w text length <= 2', fakeAsync(() =>
        {
            spyOn(component['weatherService'], 'searchForCity').and.returnValue(NEVER);

            component.searchForCity(text$)
                .subscribe();

            component.focus$.next('te');

            tick(600);

            expect(component.isSearchInProgress).toEqual(false);
            expect(component.hasSearchFailed).toEqual(false);
            expect(component['weatherService'].searchForCity).not.toHaveBeenCalled();
        }));

        it('should NOT trigger search on text input /w length <= 2', fakeAsync(() =>
        {
            spyOn(component['weatherService'], 'searchForCity').and.returnValue(NEVER);

            component.searchForCity(text$)
                .subscribe();

            text$.next('t');

            tick(600);

            expect(component.isSearchInProgress).toEqual(false);
            expect(component.hasSearchFailed).toEqual(false);
            expect(component['weatherService'].searchForCity).not.toHaveBeenCalled();
        }));

        it('should NOT trigger search on before 500ms have passed /w text input length > 2', fakeAsync(() =>
        {
            spyOn(component['weatherService'], 'searchForCity').and.returnValue(NEVER);

            component.searchForCity(text$)
                .subscribe();

            text$.next('test 123');

            tick(200);

            expect(component.isSearchInProgress).toEqual(false);
            expect(component.hasSearchFailed).toEqual(false);
            expect(component['weatherService'].searchForCity).not.toHaveBeenCalled();

            discardPeriodicTasks();
        }));

        it('should handle HTTP search error on focus /w text length > 2', () =>
        {
            const errorResponse: IActionResponse<any> = {
                isSuccessful: false,
                payload: { error: { message: 'something went wrong' } },
            };

            spyOn(component['weatherService'], 'searchForCity').and.returnValue(of(errorResponse));

            const calcFnObj = jasmine.createSpy('calcFn', (param: any) => ({ ...param }));

            component.searchForCity(text$, calcFnObj)
                .subscribe();

            component.focus$.next('London, London, UK');

            expect(component.isSearchInProgress).toEqual(false);
            expect(component.hasSearchFailed).toEqual(true);
            expect(component['weatherService'].searchForCity).toHaveBeenCalledWith('London, London, UK');
            expect(calcFnObj).not.toHaveBeenCalled();
        });

        it('should handle HTTP search success on focus /w text length > 2', () =>
        {
            const response: IActionResponse<any> = {
                isSuccessful: true,
                payload: {
                    results: [
                        { text: 'result 1' },
                    ],
                },
            };

            spyOn(component['weatherService'], 'searchForCity').and.returnValue(of(response));

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const calcFnObj = jasmine.createSpy('calcFn', (param: any) => 'display string').and.returnValue('display string');

            component.searchForCity(text$, <any> calcFnObj)
                .subscribe((evt) =>
                {
                    expect(evt).toEqual([
                        <any> {
                            display: 'display string',
                            value: { text: 'result 1' },
                        },
                    ]);
                });

            component.focus$.next('London, London, UK');

            expect(component.isSearchInProgress).toEqual(true);
            expect(component.hasSearchFailed).toEqual(false);
            expect(component['weatherService'].searchForCity).toHaveBeenCalledWith('London, London, UK');
            expect(calcFnObj).toHaveBeenCalledWith({ text: 'result 1' });
        });

        it('should handle show "Searching..." text in HTML while search is in progress', () =>
        {
            spyOn(component['weatherService'], 'searchForCity').and.returnValue(NEVER);

            component.searchForCity(text$)
                .subscribe();

            component.focus$.next('London, London, UK');

            fixture.detectChanges();

            const element = fixture.nativeElement.querySelector('small');
            expect(element && element.textContent).toEqual('Searching...');
        });
    });
});
