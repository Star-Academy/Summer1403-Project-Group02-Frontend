import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DataGroup {
  dataGroupId: number;
  name: string;
  createAt: string;
  updateAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataGroupService {
  private apiUrl = 'http://127.0.0.1:8000/data-groups';

  constructor(private http: HttpClient) {}

  getDataGroups(): Observable<DataGroup[]> {
    return this.http.get<DataGroup[]>(this.apiUrl);
  }
}
