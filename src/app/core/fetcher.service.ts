import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class FetcherService {

  token: string;

  constructor(
    protected http: HttpClient,
    private errorHandler: ErrorHandler
  ) { }

  get<T>(url: string, paramsObject: any = new HttpParams): Observable<any> {
    let params = new HttpParams;
    const headers = this.buildHeaders();

    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      url = `${environment.api}${url}`;
    }

    for (const key of Object.keys(paramsObject)) {
      if (paramsObject[key] !== null) {
        params = params.append(key, paramsObject[key]);
      }
    }

    const options = {
      headers,
      params,
      withCredentials: true,
    };

    return this.http.get<any>(`${url}`, options);
  }

  post<T>(url: string, data: object): Observable<any> {
    return this.http.post<any>(`${environment.api}${url}`, data, {
      headers: this.buildHeaders(),
      withCredentials: true,
    });
  }

  put<T>(url: string, data?: object): Observable<any> {
    return this.http.put<any>(`${environment.api}${url}`, data, {
      headers: this.buildHeaders(),
      withCredentials: true,
    });
  }

  delete<T>(url: string): Observable<any> {
    return this.http.delete<any>(`${environment.api}${url}`, {
      headers: this.buildHeaders(),
      withCredentials: true,
    });
  }

  getJson<T>(mockName: string): Observable<any> {
    return this.http.get<any>(`mock/${mockName}`);
  }

  getFile(url: string) {
    return this.http.get(url, { responseType: 'blob', headers: this.buildHeaders() });
  }

  tryLogin(login: string, pass: string): Observable<any> {
    this.token = 'token';
    return of(true);
    // return this.get('login', {login, pass}).pipe(
    //   map(res => {
    //     if (res) {
    //       this.token = res;
    //       return true;
    //     }
    //     return false;
    //   })
    // );
  }

  private buildHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    if (this.token) {
      headers = headers.set('Authorization', this.token);
    }
    return headers;
  }

  private handleError(error: Error) {
    this.errorHandler.handleError(error);

    return Observable.throw(error);
  }
}
