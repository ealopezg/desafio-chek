import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) { 
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    this._storage = await this.storage.create();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  async set(key: string, value: any) {
    if (!this._storage)
      await this.init();
    return this._storage?.set(key, value);
  }

  async get(key: string) {
    if (!this._storage)
      await this.init();
    return this._storage?.get(key);
  }


}
