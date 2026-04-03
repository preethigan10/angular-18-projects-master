import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  count = signal(0);

  // i used computed and count if multiple api calls in one page
  show() {
    this.count.set(this.count() + 1);
  }
  hide() {
    this.count.set(this.count() - 1);
  }

  loading = computed(() => this.count() > 0);
}
