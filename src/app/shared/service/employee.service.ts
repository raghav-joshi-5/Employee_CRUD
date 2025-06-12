import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  BASEURL: string = `${environment.baseurl}`;
  EMP_URL: string = `${this.BASEURL}/employee`;
  constructor(private _http: HttpClient) {}

  private refreshSubject = new Subject<void>();
  refresh$ = this.refreshSubject.asObservable();

  triggerRefresh() {
    this.refreshSubject.next();
  }

  addemployee(data: any): Observable<any> {
    return this._http.post<any>(`${this.EMP_URL}.json`, data);
  }

  getemployee(): Observable<any> {
    return this._http.get<any>(`${this.EMP_URL}.json`);
  }

  deletemployee(id: string): Observable<any> {
    return this._http.delete(`${this.EMP_URL}/${id}.json`);
  }

  updateemployee(id: string, data: any): Observable<any> {
    return this._http.put(`${this.EMP_URL}/${id}.json`, data);
  }
}
