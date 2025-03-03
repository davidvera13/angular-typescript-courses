import {Injectable, Signal, signal, WritableSignal} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private counterSignal: WritableSignal<number>;
  readonly counter: Signal<number>;

  constructor() {
    this.counterSignal = signal(0);
    this.counter = this.counterSignal.asReadonly();
  }

  increment() {
    if (this.counter() > 10) {
      throw new Error(`Maximum value reached!`);
    }

    this.counterSignal.update(val => val + 1);

  }

}
