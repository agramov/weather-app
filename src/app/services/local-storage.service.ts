import { Injectable } from '@angular/core';

import { IActionResponse } from '../model/app.model';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService
{
    private readonly key = 'favcities';

    public set(key: string = '', value: any): IActionResponse
    {
        try
        {
            let currentValue = localStorage.getItem(this.key);

            let array = [];

            if (currentValue)
            {
                let parsedArray = JSON.parse(currentValue);

                if (Array.isArray(parsedArray))
                {
                    array = parsedArray;
                }
            }

            const entry = array.find(item => item.key === key);

            if (entry)
            {
                entry.value = value;
            }
            else
            {
                array.push({ key, value });
            }

            const stringifiedArr = JSON.stringify(array);

            localStorage.setItem(this.key, stringifiedArr);

            return {
                isSuccessful: true,
                payload: null,
            };
        }
        catch (err)
        {
            return {
                isSuccessful: false,
                payload: err,
            };
        }
    }

    public get(key: string = ''): IActionResponse<string | null | any>
    {
        try
        {
            let currentValue = localStorage.getItem(this.key);

            let array = [];

            if (currentValue)
            {
                let parsedArray = JSON.parse(currentValue);

                if (Array.isArray(parsedArray))
                {
                    array = parsedArray;
                }
            }

            return {
                isSuccessful: true,
                payload: array.find(item => item.key === key),
            };
        }
        catch (err)
        {
            return {
                isSuccessful: false,
                payload: err,
            };
        }
    }

    public getAll(): IActionResponse<string | null | any>
    {
        try
        {
            let currentValue = localStorage.getItem(this.key);

            let array = [];

            if (currentValue)
            {
                let parsedArray = JSON.parse(currentValue);

                if (Array.isArray(parsedArray))
                {
                    array = parsedArray;
                }
            }

            return {
                isSuccessful: true,
                payload: array,
            };
        }
        catch (err)
        {
            return {
                isSuccessful: false,
                payload: err,
            };
        }
    }
}
