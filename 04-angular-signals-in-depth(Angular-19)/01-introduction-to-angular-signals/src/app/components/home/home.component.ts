import {
  afterNextRender,
  Component,
  computed,
  effect, EffectRef,
  inject,
  Injector,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";

type Counter = {
  value: number;
}

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  counter: number;
  // value can be rewritten
  counterSignal: WritableSignal<number>; // extends signal
  readOnlySignal: Signal<number>;
  counterTypeSignal: WritableSignal<Counter>;
  arraySignal: WritableSignal<number[]>;
  tenXmultiplierSignal: Signal<number>;
  hundredXmultiplierSignal: Signal<number>;
  //cycleSignal: Signal<number>
  injector: Injector;
  effectRef: EffectRef | null;

  constructor() {
    this.effectRef = null;
    this.counter = 0;
    this.counterSignal = signal(0);
    this.readOnlySignal = signal(3.14); //.asReadonly();
    this.counterTypeSignal = signal<Counter>({ value: 42 });
    this.arraySignal = signal<number[]>([1, 2, 3]);

    // we create dependency with counter signal by invoking counterSignal in the computed signal
    // computed signals are read only, we can rewrite them (update)
    this.tenXmultiplierSignal = computed(() => {
      const value = this.counterSignal();
      //this.cycleSignal();
      return value * 10;
    });


    this.hundredXmultiplierSignal = computed(() => {
      const value = this.tenXmultiplierSignal();
      return value * 10;
    })
    // bidirectional dependency: ERROR Error: Detected cycle in computations.
    //this.cycleSignal = computed(() => {
    //  return this.tenXmultiplierSignal();
    //});

    // signal side effect: we want to log every changes on counterSignal
    // ADVANCED: how to clean an existing effect manually
    // note : we use a callback here too
    this.effectRef = effect((onCleanup) => {
      const counter = this.counterSignal()
      const timeOut = setTimeout(() => {
        console.log(`Counter value with delay :  ${counter}`)
      }, 1000);
      onCleanup(() => {
        console.log(">> effectCleanupCalled");
        clearTimeout(timeOut)
      })
    })

    // ADVANCED : effect with Injection Context set
    // ERROR RuntimeError: NG0203: effect() can only be used within an injection context such as a constructor,
    // a factory function, a field initializer, or a function used with `runInInjectionContext`.
    // Find more at https://angular.dev/errors/NG0203
    // when should i clean up this effect
    this.injector = inject(Injector)
    afterNextRender(() => {
      effect(() => {
        console.log(`Counter value :  ${this.tenXmultiplierSignal()}`)
      },
      {
        injector: this.injector
      });
    });

  }

  increment(): void {
    this.counter++;
  }

  signalIncrement(): void {
    // note: we get the current value and add 1 to it before reassign it
    // give angular a way to know when data is changed
    // we must wrap data in signals.
    //this.counterSignal.set(this.counterSignal() +1);
    // best practice : we update value
    this.counterSignal.update(currentValue => currentValue + 1);
    // we can update the signal of object by mutating the value : bad practice
    // this.counterTypeSignal().value++;
    // we'd better copy the object we replace old version
    this.counterTypeSignal.update(currentObject =>({
      ...currentObject, value: currentObject.value + 1
    }));
  }

  appendNumber(): void {
    // bad way: it works but we're mutating array
    //const values = this.arraySignal();
    //const lastValue = values[values.length - 1];
    //values.push(lastValue+1);

    // good way
    this.arraySignal.update(values => (
      [...values, values[values.length - 1] + 1]
    ));
  }

  effectCleanUp(): void {
    console.log(">> effectCleanupCalled");
    this.effectRef?.destroy();
  }
}
