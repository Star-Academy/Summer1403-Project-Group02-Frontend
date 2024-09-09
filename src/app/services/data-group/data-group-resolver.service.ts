import { Injectable } from '@angular/core';
import {
  Resolve,
  // ActivatedRouteSnapshot,
  // RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataGroupService, DataGroup } from './data-group.service';

@Injectable({
  providedIn: 'root',
})
export class DataGroupResolver implements Resolve<DataGroup[]> {
  constructor(private dataGroupService: DataGroupService) {}

  // Resolve method to fetch data before navigating to the route
  resolve(): // route: ActivatedRouteSnapshot,
  // state: RouterStateSnapshot
  Observable<DataGroup[]> {
    return this.dataGroupService.getDataGroups();
  }
}
