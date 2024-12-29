import { ChangeDetectionStrategy, Component, computed, effect, inject, input, numberAttribute, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-customer',
  imports: [ReactiveFormsModule],
  template: `
    <!-- <h1>Title: {{ state().todo()?.title }}</h1>  -->
    <h1>Title: {{ todo()?.title }}</h1> 
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TodoComponent {
  // reset fetch api
  // route = inject(ActivatedRoute);
  // id = toSignal(this.route.paramMap.pipe(
  //   map(params => params.get('id'))
  // ))
  // state = computed(() => {
  //   const todo = signal<Todo | undefined>(undefined);
  //   fetch(`https://jsonplaceholder.typicode.com/todos/${this.id()}`)
  //     .then(res => res.json())
  //     .then(data => todo.set(data))

  //   return { todo }
  // })

  id = input.required();
  todo = signal<Todo | undefined>(undefined);
  idEffect = effect(() => {
    const id = this.id();
    untracked(() => {
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => res.json())
        .then(data => this.todo.set(data))
    })
  })
}
