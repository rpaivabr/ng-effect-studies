import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, effect, inject, linkedSignal, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-basket',
  imports: [FormsModule],
  template: `
    <h3>Click on a product to add it to the basket</h3>

    <div class="flex gap-4 my-8">
      @for (product of products; track product.id) {
        <button mat-raised-button (click)="selectProduct(product.id)">{{ product.name }}</button>
      }
    </div>

    @if (selectedProduct(); as product) {
      <p>Selected Product: {{ product.name }}</p>
      <p>Want more? Top up the amount</p>
      <div class="flex gap-x-4">
        <input [(ngModel)]="amount" name="amount" type="number" />
        <button mat-raised-button (click)="updateAmount()">Update Amount</button>
      </div>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class BasketComponent {
  private httpClient = inject(HttpClient);

  products: Product[] = [
    { id: 1, name: 'apple', price: 1 },
    { id: 2, name: 'banana', price: 1 },
    { id: 3, name: 'orange', price: 1 },
  ];
  selectedProductId = signal(0);
  selectedProduct = computed(() => this.products.find((p) => p.id === this.selectedProductId()));
  amount = linkedSignal({ 
    source: this.selectedProductId,
    computation: () => 1
  });

  // resetAmount = effect(() => {
  //   if (this.state().selectedProduct()) {
  //     console.log(this.selectedProduct()?.name + " added to basket");
  //     untracked(() => this.amount.set(1));
  //   }
  // }) 
  // state = computed(() => ({
  //   selectedProduct: this.products.find((p) => p.id === this.selectedProductId()),
  //   amount: signal(1),
  // }))

  selectProduct(id: number) {
    this.selectedProductId.set(id);
    console.log('edit change product', { id: this.selectedProductId(), amount: this.amount() })
    // this.amount.set(1);
    // console.log(this.selectedProduct()?.name + " added to basket");
  }


  updateAmount() {
    console.log('edit amount', { id: this.selectedProductId(), amount: this.amount() })
    // this.httpClient.post("/basket", { id: this.selectedProductId(), amount: this.amount() }).subscribe();
  }
}
