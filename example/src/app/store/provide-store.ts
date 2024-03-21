import { Provider } from '@angular/core';
import { StoreService } from './store.service';

export function provideStore(): Provider {
  return {
    provide: StoreService,
    useFactory: () => new StoreService(),
  };
}
