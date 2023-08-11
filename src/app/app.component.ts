import { Component, OnDestroy } from '@angular/core';

import { ReplaySubject } from 'rxjs';

import { ICity } from './model/weather.model';
import { LocalStorageService } from './services/local-storage.service';
import { ToastService } from './services/toast-service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnDestroy
{
    private destroyed$ = new ReplaySubject<void>(1);

    public selectedCity: ICity | null = null;

    public active = 1;

    public favCities: { key: string; value: any }[] = [];

    constructor(
        private readonly storageService: LocalStorageService,
        private readonly toastService: ToastService,
    )
    {
        this.fetchFavCities();
    }

    ngOnDestroy(): void
    {
        this.destroyed$.next();
    }

    public handleNavChange({ nextId }: any): void
    {
        this.selectedCity = null;

        if (nextId === 1)
        {
            this.fetchFavCities();
        }
    }

    public fetchFavCities(): void
    {
        const fetchresult = this.storageService.getAll();

        if (fetchresult.isSuccessful)
        {
            this.favCities = fetchresult.payload.filter((item: any) => !!item.value);
        }
        else
        {
            this.toastService.show('Couldn\'t load weather data... Please refresh the page or try again later',
                { isError: true, classname: 'bg-danger text-light', delay: 15000 });
        }
    }

    public trackByFn(index: number, city: { key: string; value: any }): string
    {
        return city && city.key;
    }
}
