import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable(
    { providedIn: 'root' }
)
export class MobileAppListener {
    public firebaseTokenListener = new Subject<string>();
    public isMobileListener = new Subject<boolean>();
    public firebaseToken = '';
    public isMobile = false;

    constructor() {
    }
    setIsMobile(value: boolean) {
        this.isMobile = value;
        this.isMobileListener.next(value);
    }

    setFirebaseToken(token: string) {
        this.firebaseToken = token;
        this.firebaseTokenListener.next(token);
    }
}