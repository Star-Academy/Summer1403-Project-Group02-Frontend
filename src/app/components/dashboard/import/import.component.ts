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
import { finalize, Observable, of, Subject, switchMap } from 'rxjs';
import { file_type } from '../../../models/file';
import { Papa } from 'ngx-papaparse';

interface aside_item {
  expanded: boolean;
  title: string;
  value: Record<string, string>;
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

  constructor(private papa: Papa) {}

  ngOnInit() {
    this.empty_graph = true;
    this.file_type = file_type;
    this.items = [];
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

    return new Observable<TuiFileLike | null>((observer) => {
      const reader = new FileReader();
      reader.readAsText(file as File);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const textContent = event.target!.result as string;
        const csvData = this.papa.parse(textContent, { header: true });
        const firstRow = csvData.data[0];

        // Ensure the file is added only once
        if (!this.items.some((item) => item.title === (file as File).name)) {
          this.items.push({
            expanded: false,
            title: (file as File).name,
            value: firstRow,
            dropdown: false,
          });
        }

        // Emit the file and complete the Observable
        observer.next(file);
        observer.complete();
      };

      reader.onerror = () => {
        this.failedFiles$.next(file);
        observer.error(null);
      };
    }).pipe(
      finalize(() => this.loadingFiles$.next(null)) // Ensure finalize is in the correct place
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
