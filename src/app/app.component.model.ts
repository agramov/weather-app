import { ICitySearchResult } from './model/weather.model';

export const calcCityDisplayFromCitySearchResult = (entry: ICitySearchResult) =>
{
    const cityAdmin2 = entry['admin2'] ? `${ entry['admin2'] }, ` : '';
    const cityAdmin1 = entry['admin1'] ? `${ entry['admin1'] }, ` : '';
    const country = entry.country ? `${ entry.country }` : '';
    const name = cityAdmin2 || cityAdmin1 || country ? `${ entry.name }, ` : `${ entry.name }`;

    return `${ name }${ cityAdmin2 }${ cityAdmin1 }${ country }`;
};
