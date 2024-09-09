import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// Define the original data structure (the expected format)
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
  // API endpoint (replace this with the actual FastAPI endpoint)
  private apiUrl = `${environment.apiBaseUrl}/DataSets`;

  constructor(private http: HttpClient) {}

  // Method to get data groups from the backend and map to the old format
  getDataGroups(): Observable<DataGroup[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        console.log(response);

        // Map the new API response to the old format
        return response.data.map((item: any) => ({
          dataGroupId: item.id, // map `id` to `dataGroupId`
          name: item.name, // map `name` to `name`
          createAt: item.createAt, // map `createAt` to `createAt`
          updateAt: item.updateAt, // map `updateAt` to `updateAt`
        }));
      })
    );
  }
}
