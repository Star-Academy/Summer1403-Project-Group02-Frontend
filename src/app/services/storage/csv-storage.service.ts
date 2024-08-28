import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CsvStorageService {
  private dbName = 'CsvFilesDB';
  private storeName = 'csvFiles';

  constructor() {
    this.initDB();
  }

  private initDB(): void {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        const objectStore = db.createObjectStore(this.storeName, {
          keyPath: 'id', // IndexedDB will generate a unique ID
          autoIncrement: true,
        });
        objectStore.createIndex('fileName', 'fileName', { unique: false });
      }
    };

    request.onerror = () => {
      console.error('Failed to open IndexedDB');
    };
  }

  // Store a CSV file's rows in IndexedDB
  storeCsvFileRows(
    fileName: string,
    rows: Record<string, unknown>[]
  ): Observable<void> {
    return from(
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open(this.dbName);

        request.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction([this.storeName], 'readwrite');
          const store = transaction.objectStore(this.storeName);

          rows.forEach((row) => {
            const fileData = { fileName, data: row };
            store.add(fileData); // Use `add` instead of `put`
          });

          transaction.oncomplete = () => {
            resolve();
          };

          transaction.onerror = () => {
            reject('Failed to store file rows in IndexedDB');
          };
        };

        request.onerror = () => {
          reject('Failed to open IndexedDB');
        };
      })
    );
  }

  // Retrieve all rows for a specific CSV file from IndexedDB
  getCsvFileRows(fileName: string): Observable<Record<string, unknown>[]> {
    return from(
      new Promise<Record<string, unknown>[]>((resolve, reject) => {
        const request = indexedDB.open(this.dbName);

        request.onsuccess = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          const transaction = db.transaction([this.storeName], 'readonly');
          const store = transaction.objectStore(this.storeName);
          const index = store.index('fileName');

          const rows: Record<string, unknown>[] = [];
          const cursorRequest = index.openCursor(IDBKeyRange.only(fileName));

          cursorRequest.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>)
              .result;
            if (cursor) {
              rows.push(cursor.value.data);
              cursor.continue();
            } else {
              resolve(rows);
            }
          };

          cursorRequest.onerror = () => {
            reject('Failed to retrieve file rows from IndexedDB');
          };
        };

        request.onerror = () => {
          reject('Failed to open IndexedDB');
        };
      })
    );
  }
}
