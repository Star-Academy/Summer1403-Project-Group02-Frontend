import { Injectable, TemplateRef } from '@angular/core';
import { TuiAlertService, TuiAlertContext } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private alertService: TuiAlertService) {}

  showSuccess(message: string, label = 'Success'): void {
    this.alertService
      .open(message, { label, appearance: 'success' })
      .subscribe();
  }

  showError(message: string, label = 'Error'): void {
    this.alertService.open(message, { label, appearance: 'error' }).subscribe();
  }

  showWarning(message: string, label = 'Warning'): void {
    this.alertService
      .open(message, { label, appearance: 'warning' })
      .subscribe();
  }

  showInfo(message: string, label = 'info'): void {
    this.alertService.open(message, { label, appearance: 'info' }).subscribe();
  }

  showTemplate(
    template: TemplateRef<TuiAlertContext>,
    label = 'Notification',
    appearance: 'success' | 'warning' | 'error' | 'info' = 'info'
  ): void {
    this.alertService
      .open(template, { label, appearance, autoClose: 3000 })
      .subscribe();
  }
}
