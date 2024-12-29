import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, resource, ResourceStatus, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

interface Customer {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Component({
  selector: 'app-edit-customer',
  imports: [FormsModule],
  template: `
    <input [(ngModel)]="id" />
    <h1>Title: {{ value()?.email }}</h1> 
    <input value="" #email (change)="setEmail(email.value)" />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class EditCustomerComponent {
    private route = inject(ActivatedRoute);
    private http = inject(HttpClient);
    // private injector = inject(Injector);
    // id = input.required({ transform: numberAttribute });
    id = signal<string | undefined>(undefined);
    // id$ = toObservable(this.id).pipe(map(id => Number(id)), filter(id => !isNaN(id)));
    // fetchCustomer$ = (id: number) => this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${id}`).pipe(
    //   catchError(() => of({} as Customer))
    // )
    // customer = toSignal(this.id$.pipe(switchMap(this.fetchCustomer$)));


    // customer = toSignal(this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${this.id()}`));
    customerRes = resource({
      request: () => ({ id: this.id() }),
      loader: ({ request, abortSignal }) => fetch(
        `https://jsonplaceholder.typicode.com/users/${request.id}`, 
        { signal: abortSignal }
      ).then(res => res.json() as Promise<Customer>),
    })
    value = computed(() => this.customerRes.value())
    isLoading = computed(() => this.customerRes.isLoading());
    error = computed(() => this.customerRes.error())
    status = computed(() => this.customerRes.status());

    resEff = effect(() => {
      console.log('value: ', this.value());
      console.log('isLoading: ', this.isLoading());
      console.log('error: ', this.error());
      console.log('status: ', ResourceStatus[this.status()]);
    });

    setEmail(email: string) {
      if (!email) return;
      this.customerRes.value.update(v => ({ ...v!, email }));
    }

    // customer!: Signal<Customer>;
    // equalityFn = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
    // customer = signal<Customer | undefined>(undefined, { equal: this.equalityFn });
    
    // ngOnInit(): void {
    //   runInInjectionContext(this.injector, () => {
    //     console.log(this.id());
    //     this.customer = toSignal(this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${this.id()}`))   
    //   })
    // }

    // constructor() {
    //   console.log(this.id());
    // }

    // loadComputed = computed(() => {
    //   const id = this.id();
    //   this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${id}`)
    //     .subscribe(customer => this.customer.set(customer))
    // })

    // loadEffect = effect(() => {
    //   // signal listener (track)
    //   const id = this.id();

    //   untracked(() => {
    //     // faça algo
    //     this.http.get<any>(`https://jsonplaceholder.typicode.com/users/${id}`)
    //       .subscribe(customer => this.customer.set(customer))
    //   })
    // })
}
