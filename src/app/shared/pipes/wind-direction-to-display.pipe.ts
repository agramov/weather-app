import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'windDirectionToDisplay',
})
export class WindDirectionToDisplayPipe implements PipeTransform 
{

    transform(value: number, ...args: unknown[]): unknown
    {
        const span = 22.5;

        const directionDegreesBase: { [k: string]: number } = {
            'East': 0,
            'North-East': 45,
            'North': 90,
            'North-West': 135,
            'West': 180,
            'South-West': 225,
            'South': 270,
            'South-East': 315,
        };

        const directionDegrees: { min: number; max: number; display: string }[] = Object.keys(directionDegreesBase)
            .map((key: string) => ({
                min: directionDegreesBase[key] - span,
                max: directionDegreesBase[key] + span,
                display: key,
            }));

        const result = directionDegrees
            .find((entry) =>
            {
                return value > entry.min && value < entry.max;
            });

        return result ? result.display : '';
    }

}
