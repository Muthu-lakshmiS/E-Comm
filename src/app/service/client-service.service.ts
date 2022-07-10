import { Inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../environment/environment.config';
import { Router } from '@angular/router';
import { TuiNotificationsService } from '@taiga-ui/core';
export enum ReqMethod {
  GET,
  POST,
  PUT,
  DELETE,
  AUTH,
  SEARCH,
}
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private actionUrl: string;
  authToken: string | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService
  ) {
    this.actionUrl = Environment.DEV.api;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }
  search<T>(path: string, query: any): Promise<T> {
    //@ts-ignore
    return this.callApi(ReqMethod.SEARCH, path, undefined, query);
  }

  async get<T>(path: string, id: string): Promise<T> {
    return this.callApi(ReqMethod.GET, path, id);
  }

  checkStatus<T>(): Promise<any> {
    return this.http
      .get(this.actionUrl + `status`, { responseType: 'text' })
      .toPromise();
  }

  async auth<T>(path: string, payload: any): Promise<T> {
    //@ts-ignore
    return this.callApi(ReqMethod.AUTH, path, undefined, payload);
  }

  async post<T>(path: string, payload: any): Promise<T> {
    //@ts-ignore
    return this.callApi(ReqMethod.POST, path, undefined, payload);
  }
  postSync<T>(path: string, payload: any): Observable<T> {
    //@ts-ignore
    return this.callApiSync(ReqMethod.POST, path, undefined, payload);
  }

  async put<T>(path: string, id: string, payload: any): Promise<T> {
    return this.callApi(ReqMethod.PUT, path, id, payload);
  }
  putSync<T>(path: string, id: string, payload: any): Observable<T> {
    return this.callApiSync(ReqMethod.PUT, path, id, payload);
  }

  delete<T>(path: string, id: string): Promise<T> {
    return this.callApi(ReqMethod.DELETE, path, id);
  }

  callApiSync<T>(
    method: ReqMethod,
    path: string,
    id: string,
    payload?: any
  ): Observable<T> {
    let HEADER = {
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + this.authToken,
      },
    };
    let HEADER_UNSECURE = {
      headers: {
        'content-type': 'application/json',
      },
    };
    if (payload instanceof FormData) {
      //@ts-ignore
      delete HEADER.headers['content-type'];
    }
    try {
      switch (method) {
        case ReqMethod.AUTH:
          return this.http.post<T>(
            this.actionUrl + `${path}`,
            JSON.stringify(payload),
            HEADER_UNSECURE
          );
        case ReqMethod.SEARCH:
          return this.http.get<T>(
            this.actionUrl + `${path}` + `?query=` + JSON.stringify(payload),
            HEADER
          );
        case ReqMethod.POST:
          return this.http.post<T>(this.actionUrl + `${path}`, payload, HEADER);
        case ReqMethod.GET:
          return this.http.get<T>(this.actionUrl + `${path}/` + id, HEADER);
        case ReqMethod.PUT:
          return this.http.put<T>(
            this.actionUrl + `${path}/` + id,
            payload,
            HEADER
          );
        case ReqMethod.DELETE:
          return this.http.delete<T>(this.actionUrl + `${path}/` + id, HEADER);
      }
    } catch (e: any) {
      if (e.status == 401) {
        this.notificationsService
          .show('Access not allowed, Please login', {
            label: 'Unauthorised Access',
          })
          .toPromise();
        localStorage.removeItem('auth');
        localStorage.removeItem('team');
        localStorage.removeItem('loggedInProfile');
        localStorage.removeItem('businessProfile');

        this.setAuthToken('');
        this.router.navigate(['login']);
      }
      throw e;
    }
  }

  async callApi<T>(
    method: ReqMethod,
    path: string,
    id: string,
    payload?: any
  ): Promise<T> {
    let HEADER = {
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer ' + this.authToken,
      },
    };
    let HEADER_UNSECURE = {
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      switch (method) {
        case ReqMethod.AUTH:
          //@ts-ignore
          return await this.http
            .post<T>(
              this.actionUrl + `${path}`,
              JSON.stringify(payload),
              HEADER_UNSECURE
            )
            .toPromise();
        case ReqMethod.SEARCH:
          //@ts-ignore
          return this.http
            .get<T>(
              this.actionUrl + `${path}` + `?query=` + JSON.stringify(payload),
              HEADER
            )
            .toPromise();
        case ReqMethod.POST:
          //@ts-ignore
          return await this.http
            .post<T>(
              this.actionUrl + `${path}`,
              JSON.stringify(payload),
              HEADER
            )
            .toPromise();
        case ReqMethod.GET:
          //@ts-ignore
          return await this.http
            .get<T>(this.actionUrl + `${path}/` + id, HEADER)
            .toPromise();
        case ReqMethod.PUT:
          //@ts-ignore
          return await this.http
            .put<T>(this.actionUrl + `${path}/` + id, payload, HEADER)
            .toPromise();
        case ReqMethod.DELETE:
          //@ts-ignore
          return await this.http
            .delete<T>(this.actionUrl + `${path}/` + id, HEADER)
            .toPromise();
      }
    } catch (e: any) {
      if (e.status == 401) {
        this.notificationsService
          .show('Access not allowed, Please login', {
            label: 'Unauthorised Access',
          })
          .toPromise();
        localStorage.removeItem('auth');
        localStorage.removeItem('team');
        localStorage.removeItem('loggedInProfile');
        localStorage.removeItem('businessProfile');
        this.setAuthToken('');
        this.router.navigate(['login']);
      }
      throw e;
    }
  }
}
