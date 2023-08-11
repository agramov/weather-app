import { Pipe, PipeTransform } from '@angular/core';

import * as dayjs from 'dayjs'


// declare var moment: any;

@Pipe({
    name: 'timestampToForamattedTime',
})
export class TimestampToForamattedTimePipe implements PipeTransform 
{

    transform(value: string | number, formatString: string = 'HH:mm DD/MM/YYYY'): string
    {
        return dayjs.unix(Number(value)).format(formatString);
    }

}
