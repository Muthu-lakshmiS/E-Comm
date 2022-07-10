import { Inject } from '@angular/core';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { MobileAppListener } from './mobile-app-listener';
import { ClientService } from 'src/app/service/client-service.service';
import { DataRef } from 'src/app/models/data-ref';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro';
import { mergeMapTo } from 'rxjs/operators';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Injectable } from '@angular/core';
import { timer } from 'rxjs';


@Injectable({
    providedIn: "root",
})
export class SyncTokenService {
    token: string = '';
    uniqueKey: string = '';
    executed = false;
    constructor(private afMessaging: AngularFireMessaging, @Inject(TuiNotificationsService) private readonly notificationsService: TuiNotificationsService, private _clientService: ClientService, private mobileListener: MobileAppListener) {
        this.afMessaging.requestPermission
            .pipe(mergeMapTo(this.afMessaging.tokenChanges))
            .subscribe(
                (token) => { this.token = token; console.log('Permission granted! Save to the server!', token); },
                (error) => { console.error(error); },
            );
        this.afMessaging.messages
            .subscribe((message) => { console.log(message); });
        this.getVisitorID();
    }

    syncToken(profileRef: DataRef) {
        const source = timer(0, 10000);

        const abc = source.subscribe(async val => {

            if (!this.executed) {
                if (this.mobileListener.isMobile) {
                    //@ts-ignore
                    this.token = await window.flutter_inappwebview.callHandler('checkFirebaseToken', '');
                } else {

                }
                this._clientService.post('notificationToken/add', {
                    profile: profileRef,
                    uniqueDeviceKey: this.uniqueKey ? this.uniqueKey : profileRef._id,
                    token: this.token
                }).then(async data => {
                    await this.notificationsService.show('token syned', { label: 'Whoaa!' }).toPromise();;
                    this.executed = true;
                    abc.unsubscribe();
                });
            }
        });

    }

    public getVisitorID(): void {
        FingerprintJS.load({
            apiKey: 'ukADlOvWwlmXpmog2RBY', region: 'ap'
        })
            .then((fp: any) => fp.get())
            .then((result: any) => {
                this.uniqueKey = result.visitorId;
            });
    }
}