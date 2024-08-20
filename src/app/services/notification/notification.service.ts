import { Injectable, TemplateRef } from '@angular/core';
import { TuiAlertService, TuiAlertContext } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private alertService: TuiAlertService) {}

  /**
   * Show a success notification.
   * @param message The message to display.
   * @param label Optional label for the notification.
   */
  showSuccess(message: string, label = 'Success'): void {
    this.alertService
      .open(message, { label, appearance: 'success' })
      .subscribe();
  }

  /**
   * Show an error notification.
   * @param message The message to display.
   * @param label Optional label for the notification.
   */
  showError(message: string, label = 'Error'): void {
    this.alertService.open(message, { label, appearance: 'error' }).subscribe();
  }

  /**
   * Show a warning notification.
   * @param message The message to display.
   * @param label Optional label for the notification.
   */
  showWarning(message: string, label = 'Warning'): void {
    this.alertService
      .open(message, { label, appearance: 'warning' })
      .subscribe();
  }

  /**
   * Show an information notification.
   * @param message The message to display.
   * @param label Optional label for the notification.
   */
  showInfo(message: string, label = 'Warning'): void {
    this.alertService.open(message, { label, appearance: 'info' }).subscribe();
  }

  /**
   * Show a custom template notification.
   * @param template The template to display.
   * @param label Optional label for the notification.
   * @param appearance The appearance style (success, warning, etc.)
   */
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
