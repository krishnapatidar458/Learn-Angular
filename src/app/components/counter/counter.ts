import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter {
  CounterValue = signal(0);

  increment() {
    this.CounterValue.update(value => value + 1);
  }
  decrement() {
    this.CounterValue.update(value => value - 1);
  }
  reset(){
    this.CounterValue.set(0);
  }
}
