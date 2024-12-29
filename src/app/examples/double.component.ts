import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-double',
  imports: [AsyncPipe],
  template: `
    <div>Double: {{ double$ | async }}</div>
    <div>Double: {{ double() }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DoubleComponent {
  // effects and computeds

  n$ = new BehaviorSubject(2);
  double$ = this.n$.pipe(map(value => value * 2))
  // double = 0;
  // constructor() { 
  //   this.n$.subscribe(value => this.double = value * 2); 
  // }

  n = signal(2);
  double = computed(() => this.n() * 2);
  // double = 0;
  // constructor() { 
  //   effect(() => this.double = this.n() * 2 ) 
  // }
}
