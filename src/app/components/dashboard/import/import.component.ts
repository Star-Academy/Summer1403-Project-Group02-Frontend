import { AsyncPipe, KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiActiveZone, tuiArrayRemove, TuiObscured } from '@taiga-ui/cdk';
import {
  TuiButton,
  TuiDropdown,
  TuiExpand,
  TuiHint,
  TuiScrollbar,
  TuiSurface,
} from '@taiga-ui/core';
import {
  TuiChevron,
  TuiElasticContainer,
  TuiFade,
  TuiFileLike,
  TuiFiles,
} from '@taiga-ui/kit';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiBlockStatus, TuiCardLarge } from '@taiga-ui/layout';
import { finalize, map, Observable, of, Subject, switchMap, timer } from 'rxjs';
import { file_type } from '../../../models/file';

interface aside_item {
  expanded: boolean;
  title: string;
  value: {};
  dropdown: boolean;
}

@Component({
  selector: 'app-import',
  standalone: true,
  imports: [
    TuiCardLarge,
    TuiSurface,
    TuiButton,
    TuiElasticContainer,
    NgForOf,
    TuiChevron,
    NgIf,
    TuiFiles,
    ReactiveFormsModule,
    AsyncPipe,
    TuiExpand,
    TuiInputModule,
    TuiActiveZone,
    TuiObscured,
    FormsModule,
    TuiFade,
    TuiHint,
    TuiDropdown,
    TuiBlockStatus,
    TuiScrollbar,
    KeyValuePipe,
  ],
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportComponent implements OnInit {
  protected items!: aside_item[];
  protected file_type!: string;
  protected empty_graph!: boolean;
  protected readonly control = new FormControl<TuiFileLike | null>(null);
  protected readonly failedFiles$ = new Subject<TuiFileLike | null>();
  protected readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  protected readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => this.processFile(file))
  );

  ngOnInit() {
    this.empty_graph = true;
    this.file_type = file_type;
    this.items = [];

    this.items.push({
      expanded: false,
      title: 'account.csv',
      value: {
        accountId: '6534454617',
        cardId: '6104335000000190',
        iban: 'IR120778801496000000198',
        accountType: 'Savings',
        branchTelephone: '55638667',
        branchAddress: 'Tehran - Khayam Street - Above Golbandak Intersection',
        branchName: 'Golbandak',
        ownerFirstName: 'Afsar',
        ownerLastName: 'Tabatabaei',
        ownerId: '1227114110',
      },
      dropdown: false,
    });

    this.items.push({
      expanded: false,
      title: 'transaction.csv',
      value: {
        sourceAccount: '6534454617',
        destinationAccount: '6039548046',
        amount: '500,000,000',
        date: '2020/07/13',
        transactionId: '153348811341',
        type: 'Paya',
      },
      dropdown: false,
    });
  }

  protected isEmptyItems() {
    return this.items.length === 0;
  }

  protected removeFile(): void {
    this.control.setValue(null);
  }

  protected processFile(
    file: TuiFileLike | null
  ): Observable<TuiFileLike | null> {
    this.failedFiles$.next(null);

    if (this.control.invalid || !file) {
      return of(null);
    }

    this.loadingFiles$.next(file);

    // call api to upload file here
    return timer(1000).pipe(
      map(() => {
        if (Math.random() > 0.5) {
          this.items.push({
            expanded: false,
            dropdown: false,
            title: 'new file name here',
            value: { as: 'qqwqw', zx: 'zxx' },
          });
          return file;
        }

        this.failedFiles$.next(file);

        return null;
      }),
      finalize(() => this.loadingFiles$.next(null))
    );
  }

  protected onObscured(obscured: boolean, index: number): void {
    if (obscured) {
      this.items[index].dropdown = false;
    }
  }

  protected onActiveZone(active: boolean, index: number): void {
    this.items[index].dropdown = active && this.items[index].dropdown;
  }

  protected remove(index: number): void {
    this.items = tuiArrayRemove(this.items, index);
  }
}
