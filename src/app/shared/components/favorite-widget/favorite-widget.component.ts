import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'app-favorite-widget',
    templateUrl: './favorite-widget.component.html',
    styleUrls: [ './favorite-widget.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteWidgetComponent
{
    @Input()
    public isFavorited = false;

    @Output()
    public changed = new EventEmitter<boolean>();

    @HostListener('click')
    public handleClick(): void
    {
        this.isFavorited = !this.isFavorited;

        this.changed.emit(this.isFavorited);
    }
}
