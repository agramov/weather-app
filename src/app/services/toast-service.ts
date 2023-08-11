import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService 
{
    public toasts: any[] = [];

    public show(textOrTpl: string | TemplateRef<any>, options: any = {})
    {
        this.toasts.push({ textOrTpl, ...options });
    }

    public remove(toast: string)
    {
        this.toasts = this.toasts.filter((t) => t !== toast);
    }

    public clear()
    {
        this.toasts.splice(0, this.toasts.length);
    }
}
