import { Inject, Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

export interface NotificationMessage {
  message: string;
  label?: string;
  status?: TuiNotification;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(
    @Inject(TuiAlertService)
    private readonly alertService: TuiAlertService
  ) {}

  async error(message: NotificationMessage) {
    await this.alertService
      .open(message.message, {
        label: message.label ? message.label : 'Error',
        status: message.status ? message.status : TuiNotification.Error,
      })
      .toPromise();
  }
  async success(message: NotificationMessage) {
    await this.alertService
      .open(message.message, {
        label: message.label ? message.label : 'Awesome',
        status: message.status ? message.status : TuiNotification.Success,
      })
      .toPromise();
  }
}
